import { Box, FormControlLabel, Switch } from '@mui/material';
import PropTypes from 'prop-types';
import ManagerdocumentsInput from './ManagerdocumentsInput';

const ManagerdocumentsFeatuer = ({
  index,
  item,
  handleSwitchChange,
  handleTextFieldChange,
  formData,
  setFormData
}) => (
    <form className="w-full">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 2,
          padding: 1,
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
          sx={{ marginLeft: 2 }}
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
        <ManagerdocumentsInput
          index={index}
          item={item}
          handleTextFieldChange={handleTextFieldChange}
          formData={formData}
          setFormData={setFormData}
        />
      </Box>
    </form>
  );

ManagerdocumentsFeatuer.propTypes = {
  handleSwitchChange: PropTypes.func,
  handleTextFieldChange: PropTypes.func,
  item: PropTypes.object,
  index: PropTypes.number,
  formData: PropTypes.object,
  setFormData:PropTypes.func
};

export default ManagerdocumentsFeatuer;
