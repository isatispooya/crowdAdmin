import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';
import { FaCheckCircle, FaClock, FaQuestionCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  Button,
  Chip,
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

  const getStatusChip = (status) => {
    const iconStyle = { fontSize: '18px' };
    switch (status) {
      case 'waiting':
        return (
          <Chip
            icon={<FaClock style={iconStyle} />}
            label="در انتظار"
            color="warning"
            variant="outlined"
            style={{ borderRadius: '20px', fontWeight: 'bold', margin: '2px', padding: '4px 8px' }}
          />
        );
      case 'okay':
        return (
          <Chip
            icon={<FaCheckCircle style={iconStyle} />}
            label="تکمیل شده"
            color="success"
            variant="outlined"
            style={{ borderRadius: '20px', fontWeight: 'bold', margin: '2px', padding: '4px 8px' }}
          />
        );
      case 'editing':
        return (
          <Chip
            icon={<FaQuestionCircle style={iconStyle} />}
            label="نیاز به تکمیل"
            color="default"
            variant="outlined"
            style={{ borderRadius: '20px', fontWeight: 'bold', margin: '2px', padding: '4px 8px' }}
          />
        );
      default:
        return (
          <Chip
            icon={<FaQuestionCircle style={iconStyle} />}
            label="نامشخص"
            color="default"
            variant="outlined"
            style={{ borderRadius: '20px', fontWeight: 'bold', margin: '2px', padding: '4px 8px' }}
          />
        );
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-12 text-center">لیست کارت‌ها</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div
              key={card.id}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between items-center max-w-sm cursor-pointer transition-transform transform hover:shadow-2xl hover:bg-gray-100"
              tabIndex={0}
              role="button"
              aria-label={`View card ${card.company_name}`}
            >
              <div className="flex flex-col items-center flex-grow space-y-4">
                <div className="flex justify-center items-center">
                  <h2 className="text-2xl font-bold text-gray-800">{card.company_name}</h2>
                </div>
                <div className="flex flex-col justify-center items-center space-y-2">
                  <p className="text-base font-medium text-gray-700">شناسه: {card.nationalid}</p>
                  <p className="text-base font-medium text-gray-700">
                    سرمایه: {formatNumber(card.registered_capital)}
                  </p>
                  <p className="text-base font-medium text-gray-700">
                    شماره ثبت: {card.registration_number}
                  </p>
                </div>
                <div
                  className="flex items-center"
                  role="button"
                  tabIndex={0}
                  onClick={() => openStatusModal(card)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      openStatusModal(card);
                    }
                  }}
                >
                  {getStatusChip(card.status)}
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <Tooltip title="مشاهده و ویرایش">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleCardClick(card.id)}
                    style={{ textTransform: 'none' }}
                  >
                    مشاهده و ویرایش
                  </Button>
                </Tooltip>
                <Tooltip title="حذف کارت">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={(event) => openDeleteModal(event, card.id)}
                    style={{ textTransform: 'none' }}
                  >
                    حذف
                  </Button>
                </Tooltip>
                <TbMessagePlus
                  style={{ fontSize: '30px' }}
                  onClick={(event) => openSendMessageModal(event, card.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-xl">هیچ کارتی موجود نیست</p>
        )}
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
          <DialogTitle>وضعیت کارت</DialogTitle>

          {selectedCard && (
            <div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">وضعیت</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="status">
                  <MenuItem value="1">تکمیل شده</MenuItem>
                  <MenuItem value="2">نیاز به تکمیل</MenuItem>
                  <MenuItem value="3">نامشخص</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStatusModalClose} color="primary">
            بستن
          </Button>
          <Button
            value={cards.status}
            onClick={handleStatusModalClose}
            onChange={(e) => setCards({ ...cards, status: e.target.value })}
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
