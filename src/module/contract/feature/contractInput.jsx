import React from 'react';
import { Grid, Switch } from '@mui/material';
import GlobalTextField from 'src/components/fild/textfiled';
import PropTypes from 'prop-types';

const ContentInput = ({ contractData, setContractData }) => {
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
      lockKey: 'lock_payback_period',
    },
    {
      label: 'دوره تامین مالی',
      key: 'swimming_percentage',
      lockKey: 'lock_swimming_percentage',
    },
    {
      label: 'سود مشارکت اسمی',
      key: 'partnership_interest',
      lockKey: 'lock_partnership_interest',
    },
    {
      label: 'ضمانت نامه',
      key: 'guarantee',
      lockKey: 'lock_guarantee',
    },
  ];

  const handleTextFieldChange = (key) => (event) => {
    setContractData({
      ...contractData,
      [key]: event.target.value,
    });
  };

  const handleLockChange = (lockKey) => (event) => {
    setContractData({
      ...contractData,
      [lockKey]: event.target.checked,
    });
  };
  console.log(contractData, 'textfiels');

  return (
    <Grid container spacing={2}>
      {fielsLabels.map(({ label, key, lockKey }) => (
        <Grid item xs={12} sm={6} key={key}>
          <div dir="ltr" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {lockKey && (
              <Switch
                checked={contractData[lockKey] || false}
                onChange={handleLockChange(lockKey)}
              />
            )}

            <GlobalTextField
              label={label}
              value={contractData[key] || ''}
              onChange={handleTextFieldChange(key)}
              disabled={lockKey && contractData[lockKey]}
            />
          </div>
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
