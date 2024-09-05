import { FaCheckCircle, FaClock, FaQuestionCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { fetchStatus } from 'src/hook/status';
import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';

const CardStatus = ({ card, openStatusModal, cardSelected }) => {
  const { data, status } = useQuery({
    queryKey: ['shareholder', cardSelected],
    queryFn: () => fetchStatus(cardSelected),
  });
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (status === 'success' && data && data.manager) {
      setFormData(data.manager.map((item) => ({ ...item, lock: item.lock || false })));
    } else if (status === 'error') {
      console.error('Failed to fetch resume data');
    }
  }, [data, status]);

  const getStatusChip = (statusCard) => {
    const iconStyle = { fontSize: '18px' };
    switch (statusCard) {
      case '1':
        return (
          <Chip
            startDecorator={<FaClock style={iconStyle} />}
            label="در انتظار"
            color="warning"
            style={{ borderRadius: '20px', fontWeight: 'bold', margin: '2px', padding: '4px 8px' }}
          />
        );
      case '2':
        return (
          <Chip
            startDecorator={<FaCheckCircle style={iconStyle} />}
            label="تکمیل شده"
            color="success"
            style={{ borderRadius: '20px', fontWeight: 'bold', margin: '2px', padding: '4px 8px' }}
          />
        );
      case '3':
        return (
          <Chip
            startDecorator={<FaQuestionCircle style={iconStyle} />}
            label="نیاز به تکمیل"
            color="default"
            style={{ borderRadius: '20px', fontWeight: 'bold', margin: '2px', padding: '4px 8px' }}
          />
        );
      default:
        return (
          <Chip
            startDecorator={<FaQuestionCircle style={iconStyle} />}
            label="نامشخص"
            color="default"
            style={{ borderRadius: '20px', fontWeight: 'bold', margin: '2px', padding: '4px 8px' }}
          />
        );
    }
  };

  return (
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
      {getStatusChip(formData.status)}
    </div>
  );
};

CardStatus.propTypes = {
  openStatusModal: PropTypes.func,
  card: PropTypes.object,
  cardSelected: PropTypes.number,
};

export default CardStatus;
