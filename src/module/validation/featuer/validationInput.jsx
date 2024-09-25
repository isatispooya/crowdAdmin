import { Box, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';

const ValidationInput = ({ item, setFormData, index, handleTextFieldChange }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
      gap: 2,
      marginBottom: 2,
    }}
  >
    <TextField
      value={item.name || ''}
      label="نام"
      variant="outlined"
      fullWidth
      onChange={handleTextFieldChange(index, 'name')}
    />
    <TextField
      value={item.national_code || ''}
      label="کد ملی"
      variant="outlined"
      fullWidth
      onChange={handleTextFieldChange(index, 'national_code')}
    />
    <DatePicker
      format="YYYY/MM/DD"
      calendar={persian}
      value={item.date ? new Date(item.date) : null}
      locale={persian_fa}
      calendarPosition="bottom-right"
      style={{ width: '100%', padding: 25 }}
      placeholder="تاریخ"
    />
  </Box>
);

ValidationInput.propTypes = {
  handleTextFieldChange: PropTypes.func,
  index: PropTypes.number,
  item: PropTypes.object,
  setFormData: PropTypes.func,
};

export default ValidationInput;
