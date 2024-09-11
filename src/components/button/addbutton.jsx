import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

const AddFormButton = ({ onClick }) => (
  <Button
    variant="outlined"
    startIcon={<AddIcon />}
    onClick={onClick}
    sx={{
      width: '40%',
      textTransform: 'none',
    }}
  >
    افزودن فرم جدید
  </Button>
);

AddFormButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddFormButton;
