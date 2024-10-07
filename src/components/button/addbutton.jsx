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
      width: '60%',
      py: 1,
      px: 2,
    }}
    >
      افزودن فرم جدید
    </Button>
  );

AddFormButton.propTypes = {
  onClick: PropTypes.func,
};

export default AddFormButton;
