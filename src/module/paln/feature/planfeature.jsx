import React, { useState } from 'react';
import { Box, Grid, InputAdornment, TextField } from '@mui/material';
import SelectField from 'src/components/fild/selectedfiled';
import GlobalTextField from 'src/components/fild/textfiled';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

const formatNumber = (value) => {
  if (value == null) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PlanFeature = () => {
  const [value, setValue] = useState('');
  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState('');
  const [applicantPercentage, setApplicantPercentage] = useState('');

  const durationOptions = [
    { value: '1', label: 'ماهانه' },
    { value: '2', label: 'سه ماهه' },
    { value: '3', label: 'شش ماهه' },
    { value: '12', label: 'دوازده ماهه' },
  ];

  const statusOptions = [
    { value: 'planned', label: 'لغو شده' },
    { value: 'in_progress', label: 'در حال اجرا' },
    { value: 'completed', label: 'تکمیل شده' },
  ];

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField label="نام طرح" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField label="نام شرکت" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField value={formatNumber(1000000)} label="مبلغ تایین شده" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <TextField
              label="میزان سود"
              value={value}
              onChange={(event) => {
                const inputValue = event.target.value;
                if (/^\d*$/.test(inputValue) && (inputValue === '' || Number(inputValue) <= 100)) {
                  setValue(inputValue);
                }
              }}
              type="text"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              variant="outlined"
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField label="مدت کلی" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField label="شناوری" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <SelectField
              id="duration"
              label="دوره پرداخت"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              options={durationOptions}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <SelectField
              id="status"
              label="وضعیت اجرای طرح"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              options={statusOptions}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField label="حوزه فعالیت" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <DatePicker
              range
              dateSeparator=" تا "
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              style={{ width: '233%', height: '56px' }}
              inputStyle={{ height: '100%', width: '100%' }}
              placeholder="روز های باقی مانده"
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField label="بازگردان" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField label="لینک فرابورس" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <TextField
              label="درصد تامین متقاضی"
              value={applicantPercentage}
              onChange={(event) => {
                const inputValue = event.target.value;
                if (/^\d*$/.test(inputValue) && (inputValue === '' || Number(inputValue) <= 100)) {
                  setApplicantPercentage(inputValue);
                }
              }}
              type="text"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              variant="outlined"
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField label="قیمت اسمی هرگواهی" value={formatNumber(1000000)} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Box mb={2}>
            <GlobalTextField label="توضیحات" />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default PlanFeature;
