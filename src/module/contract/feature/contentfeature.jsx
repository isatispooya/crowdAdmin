/* eslint-disable arrow-body-style */
import React from 'react';
import { Grid } from '@mui/material';
import { SubmitButton } from 'src/components/button';
import PropTypes from 'prop-types';
import UseCartId from 'src/hooks/card_id';
import ContentInput from './contractInput';
import SwitchContract from './switchInputs';
import UsePostContract from '../services/usePostContract';

const ContractFeature = ({ handelClick, setContractData, contractData }) => {
  const { cartId } = UseCartId();
  const { mutate, isLoading, IsError, isPending, error } = UsePostContract(cartId);


  const postContractData = () => {
    mutate(contractData)
  }
  return (
    <Grid spacing={3}>
      <ContentInput contractData={contractData} setContractData={setContractData} />
      <SwitchContract contractData={contractData} setContractData={setContractData} />
      <SubmitButton contractData={contractData} onClick={postContractData} postContractData={postContractData} />
    </Grid>
  );
};

ContractFeature.propTypes = {
  handelClick: PropTypes.func,
  contractData: PropTypes.object.isRequired,
  setContractData: PropTypes.func.isRequired,
};

export default ContractFeature;
