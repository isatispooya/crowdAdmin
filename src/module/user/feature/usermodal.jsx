import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import PropTypes from 'prop-types';

const UserModal = ({ selectedRow, handleClose, open }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    fullWidth
    maxWidth="sm"
    PaperProps={{ sx: { borderRadius: '12px', padding: 2 } }}
  >
    <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>
      <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-2">
        <h1 className="text-2xl font-bold text-gray-700">اطلاعات کاربر</h1>
      </div>
    </DialogTitle>

    <DialogContent>
      {selectedRow && (
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
            {selectedRow.name}
          </Typography>
          <Box sx={{ marginTop: 2, fontSize: '1.1rem' }}>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>سن:</strong> {selectedRow.age}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>جنسیت:</strong> {selectedRow.gender}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>ایمیل:</strong> {selectedRow.email}
            </Typography>
          </Box>
        </Box>
      )}
    </DialogContent>
    <DialogActions sx={{ justifyContent: 'center' }}>
      <Button onClick={handleClose} variant="contained" color="primary">
        بستن
      </Button>
    </DialogActions>
  </Dialog>
);

UserModal.propTypes = {
  selectedRow: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default UserModal;
