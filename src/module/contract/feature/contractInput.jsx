import React from 'react';
import { Grid, Switch } from '@mui/material';
import GlobalTextField from 'src/components/fild/textfiled';
import PropTypes from 'prop-types';
import useGetContract from '../services/useGetContract';

const ContentInput = ({contractData , setContractData}) => {
   console.log(contractData , "112345")
 
 
  const fielsLabels = [
    {
      label: 'کارمزد فرابورس',
      key: 'otc_fee',
    },
    {
      label: 'کارمزد انتشار',
      key: 'publication_fee',
    },
    {
      label: 'کارمزد ارائه خدمات',
      key: 'dervice_fee',
    },
    {
      label: 'کارمزد طراحی',
      key: 'design_cost',
    },
    {
      label: 'دوره بازپرداخت',
      key: 'payback_period',
    },
    {
      label: 'دوره تامین مالی',
      key: 'swimming_percentage',
    },
    {
      label: 'سود مشارکت اسمی',
      key: 'partnership_interest',
    },
    {
      label: 'ضمانت نامه',
      key: 'guarantee',
    },
  ];

  return (
    <Grid container spacing={2}>
      {fielsLabels.map(({ label, key }) => (
        <Grid item xs={12} sm={6} key={key}>
          <div dir="ltr">
            <Switch />
            
          </div>
          <GlobalTextField label={label} contractData={contractData} setContractData={setContractData} />
        </Grid>
      ))}
    </Grid>
  );

};
ContentInput.propTypes = {
 
  contractData: PropTypes.object.isRequired,
  setContractData: PropTypes.func.isRequired,
};

export default ContentInput;
