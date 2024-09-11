import { Box, FormControlLabel, Switch } from '@mui/material';
import PropTypes from 'prop-types';
import HistoryInput from './historyInput';

const HistoryFeature = ({
  handleFileChange,
  handleRemoveFile,
  handleSwitchChange,
  handleTextFieldChange,
  item,
  index,
}) => (
  <form key={index} className="w-full">
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={item.lock}
            onChange={handleSwitchChange(index)}
            name="customSwitch"
            color="primary"
          />
        }
      />
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
        gap: 2,
        marginBottom: 4,
      }}
    >
      <HistoryInput
        handleTextFieldChange={handleTextFieldChange}
        item={item}
        index={index}
        handleRemoveFile={handleRemoveFile}
        handleFileChange={handleFileChange}
      />
    </Box>
  </form>
);
HistoryFeature.propTypes = {
  handleFileChange: PropTypes.func,
  handleRemoveFile: PropTypes.func,
  handleSwitchChange: PropTypes.func,
  handleTextFieldChange: PropTypes.func,
  item: PropTypes.object,
  index: PropTypes.number,
};

export default HistoryFeature;
