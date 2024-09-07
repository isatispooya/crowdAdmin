import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';
import { FaCheckCircle, FaClock, FaQuestionCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Button, Chip, Tooltip } from '@mui/material';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const CardList = ({ setCardSelected, handleNext }) => {
  const [cards, setCards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
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
    setModalOpen(true);
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
      setModalOpen(false);
      setSelectedCardId(null);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCardId(null);
  };

  const getStatusChip = (status) => {
    const iconStyle = { fontSize: '18px' };
    switch (status) {
      case '1':
        return (
          <Chip
            icon={<FaClock style={iconStyle} />}
            label="بررسی شرکت"
            color="warning"
            variant="outlined"
            style={{ borderRadius: '20px', fontWeight: 'bold', margin: '2px', padding: '4px 8px' }}
          />
        );
      case '2':
        return (
          <Chip
            icon={<FaCheckCircle style={iconStyle} />}
            label="بررسی مدیران"
       color="warning"
            variant="outlined"
            style={{ borderRadius: '20px', fontWeight: 'bold', margin: '2px', padding: '4px 8px' }}
          />
        );
      case '3':
        return (
          <Chip
            icon={<FaQuestionCircle style={iconStyle} />}
            label="بررسی  مدیران"
            color="warning"
            variant="outlined"
            style={{ borderRadius: '20px', fontWeight: 'bold', margin: '2px', padding: '4px 8px' }}
          />
        );
        case '4':
          return (
            <Chip
              icon={<FaQuestionCircle style={iconStyle} />}
              label="بررسی سهامداران"
            color="warning"
            variant="outlined"
              style={{ borderRadius: '20px', fontWeight: 'bold', margin: '2px', padding: '4px 8px' }}
            />
          );
          case '5':
          return (
            <Chip
              icon={<FaQuestionCircle style={iconStyle} />}
              label="بررسی اعتبارسنجی"
            color="warning"
            variant="outlined"
              style={{ borderRadius: '20px', fontWeight: 'bold', margin: '2px', padding: '4px 8px' }}
            />
          );
      default:
        return (
          <Chip
            icon={<FaQuestionCircle style={iconStyle} />}
            label="نامشخص "
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
              className={`bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between items-center max-w-sm cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100 ${
                selectedCardId === card.id ? 'border-4 border-blue-600' : ''
              }`}
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
                <div className="flex items-center">{getStatusChip(card.status)}</div>
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <Tooltip title="مشاهده و ویرایش">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleCardClick(card.id)}
                    style={{ textTransform: 'none', padding: '8px 16px', fontSize: '16px' }}
                  >
                    مشاهده و ویرایش
                  </Button>
                </Tooltip>
                <Tooltip title="حذف کارت">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={(event) => openDeleteModal(event, card.id)}
                    style={{ textTransform: 'none', padding: '8px 16px', fontSize: '16px' }}
                  >
                    حذف
                  </Button>
                </Tooltip>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-xl">هیچ کارتی موجود نیست</p>
        )}
      </div>
      <ConfirmDeleteModal
        open={modalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteClick}
      />
    </div>
  );
};

CardList.propTypes = {
  setCardSelected: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default CardList;
