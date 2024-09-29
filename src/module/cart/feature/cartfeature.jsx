import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import { TbMessagePlus } from 'react-icons/tb';

const CardFeature = ({
  card,
  handleCardClick,
  handleClick,
  openDeleteModal,
  setSendMessageModalOpen,
  handleModalOpen,
}) => {
  const formatNumber = (value) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  console.log('hgg',card)

  return (
    <Box>
      <Box
        key={card.id}
        className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 flex flex-col justify-between items-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100 min-w-[240px] max-w-[320px] h-auto"
        onClick={() => handleCardClick(card.id)}
      >
        <div className="flex flex-col items-center space-y-4 sm:space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{card.company_name}</h2>
          <div className="flex flex-col items-center space-y-2 sm:space-y-3">
            <p className="text-sm sm:text-base font-medium text-gray-700">
              شناسه: {card.nationalid}
            </p>
            <p className="text-sm sm:text-base font-medium text-gray-700">
              سرمایه: {formatNumber(card.registered_capital)}
            </p>
            <p className="text-sm sm:text-base font-medium text-gray-700">
              شماره ثبت: {card.registration_number}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-4">
          <Button
            onClick={() => handleClick(card.id)}
            variant="contained"
            color="primary"
            style={{ textTransform: 'none' }}
          >
            مشاهده و ویرایش
          </Button>
          <Button
            onClick={() => openDeleteModal()}
            variant="outlined"
            color="error"
            style={{ textTransform: 'none' }}
          >
            حذف
          </Button>
          <TbMessagePlus
            style={{ fontSize: '24px', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              handleModalOpen(setSendMessageModalOpen, card.id);
            }}
          />
        </div>
      </Box>
    </Box>
  );
};

CardFeature.propTypes = {
  card: PropTypes.object.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func,
  handleModalOpen: PropTypes.func,
  setSendMessageModalOpen: PropTypes.func,
};

export default CardFeature;
