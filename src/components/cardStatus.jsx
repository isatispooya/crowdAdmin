// CardStatus.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { fetchStatus } from 'src/hook/status';
import { FaCheckCircle, FaClock, FaQuestionCircle } from 'react-icons/fa';
import Chip from '@mui/material/Chip';
import StatusModal from './statusModel';

const CardStatus = ({ card, cardSelected }) => {
  console.log('jdhkjfshdkjkjshk',cardSelected);
  
  const { data, isSuccess } = useQuery({
    queryKey: ['shareholder', cardSelected],
    queryFn: () => fetchStatus(cardSelected),
  });

  const [formData, setFormData] = useState({});
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  useEffect(() => {
    if (isSuccess && data) {
      setFormData(data.manager || {});
    }
  }, [data, isSuccess]);

  const handleOpenStatusModal = () => setStatusModalOpen(true);
  const handleCloseStatusModal = () => setStatusModalOpen(false);

  const handleStatusChange = (newStatus) => {
    console.log('New Status:', newStatus);
  };

  const getStatusChip = (status) => {
    const iconStyle = { fontSize: '18px' };
    const chipStyles = {
      borderRadius: '20px',
      fontWeight: 'bold',
      margin: '2px',
      padding: '4px 8px',
    };

    switch (status) {
      case '1':
        return (
          <Chip
            icon={<FaClock style={iconStyle} />}
            label="بررسی شرکت"
            color="warning"
            variant="outlined"
            style={chipStyles}
          />
        );
      case '2':
        return (
          <Chip
            icon={<FaCheckCircle style={iconStyle} />}
            label="بررسی مدیران"
            color="success"
            variant="outlined"
            style={chipStyles}
          />
        );
      case '3':
      case '4':
      case '5':
        return (
          <Chip
            icon={<FaQuestionCircle style={iconStyle} />}
            label="بررسی سهامداران"
            color="info"
            variant="outlined"
            style={chipStyles}
          />
        );
      default:
        return (
          <Chip
            icon={<FaQuestionCircle style={iconStyle} />}
            label="نامشخص"
            color="default"
            variant="outlined"
            style={chipStyles}
          />
        );
    }
  };

  return (
    <>
      <div
        className="flex items-center"
        role="button"
        tabIndex={0}
        onClick={handleOpenStatusModal}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleOpenStatusModal();
          }
        }}
      >
        {getStatusChip(formData.status)}
      </div>

      <StatusModal
        open={statusModalOpen}
        onClose={handleCloseStatusModal}
        card={card}
        onStatusChange={handleStatusChange}
        cardSelected={cardSelected}
      />
    </>
  );
};

CardStatus.propTypes = {
  card: PropTypes.object.isRequired,
  cardSelected: PropTypes.number,
};

export default CardStatus;
