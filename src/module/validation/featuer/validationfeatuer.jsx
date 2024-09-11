import { Box, FormControlLabel, Switch } from '@mui/material';
import PropTypes from 'prop-types';
import ValidationFile from './validationfile';
import ValidationInput from './validationInput';

const Validationfeatuer = ({
  index,
  item,
  handleSwitchChange,
  handleTextFieldChange,
  handleFileChange,
  handleRemoveFile,
}) => (
  <Box key={index} sx={{ marginBottom: 3 }}>
    <FormControlLabel
      control={
        <Switch
          checked={item.lock}
          onChange={handleSwitchChange(index)}
          name="lockSwitch"
          color="primary"
        />
      }
    />
    <Box sx={{ display: 'flex' }}>
      <Box>
        <ValidationInput index={index} item={item} handleTextFieldChange={handleTextFieldChange} />
      </Box>
      <Box sx={{ marginLeft: '20px', marginTop: '10px' }}>
        <ValidationFile
          handleFileChange={handleFileChange}
          handleRemoveFile={handleRemoveFile}
          index={index}
          item={item}
        />
      </Box>
    </Box>
  </Box>
);

Validationfeatuer.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
  handleSwitchChange: PropTypes.func,
  handleTextFieldChange: PropTypes.func,
  handleFileChange: PropTypes.func,
  handleRemoveFile: PropTypes.func,
};
export default Validationfeatuer;
