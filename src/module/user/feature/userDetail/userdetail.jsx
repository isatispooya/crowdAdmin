import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

const Userdetail = ({ selectedRow, handleClose }) => {
  console.log(selectedRow);

  return (
    <Box sx={{ padding: 2, borderRadius: '12px', boxShadow: 3 }}>
      <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-2">
        <h1 className="text-2xl font-bold text-gray-700">اطلاعات کاربر</h1>
      </div>
      {selectedRow ? (
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
            {`${selectedRow.firstName} ${selectedRow.lastName}`}
          </Typography>
          <Box sx={{ marginTop: 2, fontSize: '1.1rem' }}>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>جنسیت:</strong> {selectedRow.gender === 'Female' ? 'زن' : 'مرد'}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>کدملی:</strong> {selectedRow.uniqueIdentifier}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>تاریخ تولد:</strong>{' '}
              {new Date(selectedRow.birthDate).toLocaleDateString('fa-IR')}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>محل تولد:</strong> {selectedRow.placeOfBirth}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>محل صدور:</strong> {selectedRow.placeOfIssue}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>نام پدر:</strong> {selectedRow.fatherName}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>شماره سریال:</strong> {selectedRow.serial}
            </Typography>
          </Box>
        </Box>
      ) : null}
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Button onClick={handleClose} variant="contained" color="primary">
          بستن
        </Button>
      </Box>
    </Box>
  );
};

Userdetail.propTypes = {
  selectedRow: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
};

export default Userdetail;
