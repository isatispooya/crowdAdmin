// feature/ContractFeature.js
import React from 'react';
import { Grid } from '@mui/material';
import { SubmitButton } from 'src/components/button';
import PropTypes from 'prop-types';
import ContentInput from './contractInput';

const ContractFeature = ({ handelClick }) => (
  <Grid container spacing={3}>
    <ContentInput />
    <SubmitButton onClick={handelClick} />
  </Grid>
);

ContractFeature.propTypes = {
  handelClick: PropTypes.func,
};

export default ContractFeature;
