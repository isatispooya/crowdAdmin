import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { postStatus } from 'src/hook/status';

const StatusModal = ({ open, onClose, card, onStatusChange, cardSelected }) => {
  const [status, setStatus] = React.useState(card.status || '');

  const mutation = useMutation({
    mutationKey: ['sendStatus', cardSelected],
    mutationFn: (id) => postStatus(id),
  });

  const handleSave = () => {
    onStatusChange(status); 
    mutation.mutate(cardSelected);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ style: { maxWidth: '50%', width: '50%' } }}>
      <DialogTitle sx={{ textAlign: 'center' }}>وضعیت کارت</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id="status-select-label">وضعیت</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            label="وضعیت"
          >
            <MenuItem value="1">برسی شرکت</MenuItem>
            <MenuItem value="2">برسی مدیران</MenuItem>
            <MenuItem value="3">برسی سهامداران</MenuItem>
            <MenuItem value="4">نامشخص</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          بستن
        </Button>
        <Button onClick={handleSave} color="primary">
          اعمال
        </Button>
      </DialogActions>
    </Dialog>
  );
};

StatusModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  cardSelected: PropTypes.number.isRequired,
};

export default StatusModal;
