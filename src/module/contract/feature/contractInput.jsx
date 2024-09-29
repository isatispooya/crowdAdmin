import React from 'react';
import { Grid, Switch } from '@mui/material';
import GlobalTextField from 'src/components/fild/textfiled';
import useGetContract from '../services/useGetContract';

const ContentInput = () => {
 
  const fielsLabels = [
    {
      label: 'کارمزد فرابورس',
      key: 'farabourse_fee',
    },
    {
      label: 'کارمزد انتشار',
      key: 'publication_fee',
    },
    {
      label: 'کارمزد ارائه خدمات',
      key: 'service_fee',
    },
    {
      label: 'کارمزد طراحی',
      key: 'design_fee',
    },
    {
      label: 'دوره بازپرداخت',
      key: 'repayment_period',
    },
    {
      label: 'دوره تامین مالی',
      key: 'financing_period',
    },
    {
      label: 'سود مشارکت اسمی',
      key: 'nominal_profit',
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
          <GlobalTextField label={label}  />
        </Grid>
      ))}
    </Grid>
  );
};

export default ContentInput;
