import { Box, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const ValidationInput = ({ item, index, handleTextFieldChange }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
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
  </Box>
);

ValidationInput.propTypes = {
  handleTextFieldChange: PropTypes.func,
  index: PropTypes.number,
  item: PropTypes.object,
};
export default ValidationInput;
