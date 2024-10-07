import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const GlobalTextField = ({
  label,
  value,
  onChange,
  setContractData,
  contractData,
  type = 'text',
  inputProps = {},
  required = false,
  // eslint-disable-next-line arrow-body-style
}) => {
  return (
    <TextField
      type={type}
      contractData={contractData}
      setContractData={setContractData}
      label={label}
      variant="outlined"
      fullWidth
      sx={{ mb: 2 }}
      value={value}
      onChange={onChange}
      inputProps={{
        ...inputProps,
        inputMode: type === 'number' ? 'numeric' : undefined,
        pattern: type === 'number' ? '[0-9]*' : undefined,
      }}
      required={required}
    />
  );
};

GlobalTextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  type: PropTypes.string,
  inputProps: PropTypes.object,
  required: PropTypes.bool,
  contractData: PropTypes.any,
  setContractData: PropTypes.func,
};

export default GlobalTextField;
