import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const GlobalTextField = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  inputProps = {},
  required = false,
}) => (
  <TextField
    type={type}
    id={id}
    label={label}
    variant="outlined"
    fullWidth
    sx={{ mb: 2 }}
    value={value}
    onChange={onChange}
    inputProps={inputProps}
    required={required}
  />
);

GlobalTextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  inputProps: PropTypes.object,
  required: PropTypes.bool,
};

export default GlobalTextField;
