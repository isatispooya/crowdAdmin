import React from 'react';
import { Grid } from '@mui/material';
import { SubmitButton } from 'src/components/button';
import PropTypes from 'prop-types';
import ContentInput from './contractInput';

const ContractFeature = ({ handelClick, setContractData, contractData }) => {
  return (
    <Grid container spacing={3}>
      <ContentInput contractData={contractData} setContractData={setContractData} />

      <SubmitButton contractData={contractData} onClick={handelClick} />
    </Grid>
  );
};

ContractFeature.propTypes = {
  handelClick: PropTypes.func,
  contractData: PropTypes.object.isRequired,
  setContractData: PropTypes.func.isRequired,
};

export default ContractFeature;
