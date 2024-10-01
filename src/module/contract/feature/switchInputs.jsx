import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  Box,
  Grid,
} from '@mui/material';


const SwitchContract = ({ contractData, setContractData }) => {
  const switchLabels = [
    { label: 'تطابق با ماده ۱۴۱ قانون تجارت', key: 'role_141' },
    { label: 'وضعیت چک‌های برگشتی', key: 'bounced_check' },
    { label: 'وضعیت بدهی‌های جاری غیرمجاز', key: 'non_current_debt' },
    { label: 'سابقه جرائم کیفری', key: 'criminal_record' },
    { label: 'وضعیت ممنوع‌المعامله بودن', key: 'Prohibited' },
    { label: 'واریز ۱۰ درصد سرمایه', key: 'minimum_deposit_10' },
  ];

  
  const handleSwitchChange = (key) => (event) => {
    setContractData({
      ...contractData,
      [key]: event.target.checked,
    });
    console.log('Updated contractData:', { ...contractData, [key]: event.target.checked });
  };
  
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '25vh',
        margin: 10,
      }}
    >
      <Box
        sx={{
          padding: 4,
          backgroundColor: '#fff',
          borderRadius: '16px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          position: 'relative',
        }}
      >
        <FormControlLabel sx={{ position: 'absolute', top: 16, right: 16 }} control={<Switch />} />

        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            <Grid container spacing={2}>
              {switchLabels.map(({ label, key }) => (
                <Grid item xs={12} sm={6} key={key}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={contractData[key] || false}
                        onChange={handleSwitchChange(key)}
                      />
                    }
                    label={label}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>

        </FormControl>
      </Box>
    </Box>
  );
};

SwitchContract.propTypes = {
  contractData: PropTypes.object.isRequired,
  setContractData: PropTypes.func.isRequired,
};

export default SwitchContract;
