import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const SubmitButton = ({ onClick  }) => (
  <Button
    type="button"
    variant="contained"
    color="primary"
    sx={{
      width: '100%',
      py: 1,
      px: 2,
    }}
    onClick={onClick}
  >
    تایید
  </Button>
);

SubmitButton.propTypes = {
  onClick: PropTypes.func,
  
};

export default SubmitButton;
