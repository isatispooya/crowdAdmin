import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';
import PropTypes from 'prop-types';
import {
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { TbMessagePlus } from 'react-icons/tb';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import SendMessage from './sendMessage';
import CardStatus from './cardStatus';

const CardList = ({ setCardSelected, handleNext, cardSelected }) => {
  const [cards, setCards] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [sendMessageModalOpen, setSendMessageModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const access = getCookie('access');

  const formatNumber = (value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`${OnRun}/api/cart/admin/`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        if (response.data.cart) {
          setCards(response.data.cart);
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    if (access) {
      fetchCards();
    }
  }, [access]);

  const handleCardClick = (id) => {
    setCardSelected(id);
    handleNext();
  };

  const openDeleteModal = (event, id) => {
    event.stopPropagation();
    setSelectedCardId(id);
    setDeleteModalOpen(true);
  };

  const openSendMessageModal = (event, id) => {
    event.stopPropagation();
    setSelectedCardId(id);
    setSendMessageModalOpen(true);
  };

  const openStatusModal = (card) => {
    setSelectedCard(card);
    setStatusModalOpen(true);
  };

  const handleDeleteClick = async () => {
    if (selectedCardId === null) return;
    try {
      await axios.delete(`${OnRun}/api/cart/admin/${selectedCardId}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      setCards((prevCards) => prevCards.filter((card) => card.id !== selectedCardId));
      console.log(`Card with id: ${selectedCardId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting card:', error);
    } finally {
      setDeleteModalOpen(false);
      setSelectedCardId(null);
    }
  };

  const handleModalClose = () => {
    setDeleteModalOpen(false);
    setSelectedCardId(null);
  };

  const handleSendMessageModalClose = () => {
    setSendMessageModalOpen(false);
    setSelectedCardId(null);
  };

  const handleStatusModalClose = () => {
    setStatusModalOpen(false);
  };

  return (
    <div className="p-8 bg-transparent min-h-screen flex justify-center items-start">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-7xl w-full">
        <div className="bg-gray-200 text-white rounded-t-3xl p-6 text-center">
          <h1 className="text-5xl font-bold text-gray-700">لیست کارت‌ها</h1>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {cards.length > 0 ? (
              cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between items-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100 min-w-[280px] max-w-[320px] h-[350px]"
                  tabIndex={0}
                  role="button"
                  aria-label={`View card ${card.company_name}`}
                >
                  <div className="flex flex-col items-center flex-grow space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">{card.company_name}</h2>
                    <div className="flex flex-col justify-center items-center space-y-4">
                      <p className="text-base font-medium text-gray-700">
                        شناسه: {card.nationalid}
                      </p>
                      <p className="text-base font-medium text-gray-700 ">
                        سرمایه: {formatNumber(card.registered_capital)}
                      </p>
                      <p className="text-base font-medium text-gray-700">
                        شماره ثبت: {card.registration_number}
                      </p>
                    </div>
                    <CardStatus
                      cardSelected={selectedCardId}
                      openStatusModal={openStatusModal}
                      card={card}
                    />
                  </div>
                  <div className="flex justify-center gap-4 mt-6">
                    <Tooltip title="مشاهده و ویرایش">
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ textTransform: 'none' }}
                        onClick={() => handleCardClick(card.id)}
                      >
                        مشاهده و ویرایش
                      </Button>
                    </Tooltip>
                    <Tooltip title="حذف کارت">
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ textTransform: 'none' }}
                        onClick={(event) => openDeleteModal(event, card.id)}
                      >
                        حذف
                      </Button>
                    </Tooltip>
                    <TbMessagePlus
                      style={{ fontSize: '28px', cursor: 'pointer' }}
                      onClick={(event) => openSendMessageModal(event, card.id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 text-xl">هیچ کارتی موجود نیست</p>
            )}
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteClick}
      />

      <SendMessage
        cardSelected={selectedCardId}
        handleNext={handleNext}
        open={sendMessageModalOpen}
        onClose={handleSendMessageModalClose}
      />

      <Dialog
        open={statusModalOpen}
        onClose={handleStatusModalClose}
        PaperProps={{
          style: {
            maxWidth: '600px',
            width: '90%',
          },
        }}
      >
        <DialogContent>
          <DialogTitle sx={{ textAlign: 'center' }}>وضعیت کارت</DialogTitle>

          {selectedCard && (
            <FormControl fullWidth>
              <InputLabel id="status-select-label">وضعیت</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={selectedCard.status || ''}
                onChange={(e) => setSelectedCard({ ...selectedCard, status: e.target.value })}
                label="وضعیت"
              >
                <MenuItem value="1">برسی شرکت</MenuItem>
                <MenuItem value="2">برسی مدیران</MenuItem>
                <MenuItem value={'3' || '4' || '5'}>برسی سهامداران</MenuItem>
                <MenuItem>نامشخص</MenuItem>
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStatusModalClose} color="primary">
            بستن
          </Button>
          <Button
            onClick={() => {
              handleStatusModalClose();
            }}
            color="primary"
          >
            اعمال
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CardList.propTypes = {
  setCardSelected: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  cardSelected: PropTypes.number,
};

export default CardList;
