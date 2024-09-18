import React, { useState } from 'react';
import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';
import SelectField from 'src/components/fild/selectedfiled';
import GlobalTextField from 'src/components/fild/textfiled';
import PropTypes from 'prop-types';
import { useMutation } from '@tanstack/react-query';
import { SubmitButton } from 'src/components/button';
import { sendPlanData } from '../service/planService';

const PlanCreateModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    plan_name: '',
    company_name: '',
    symbol: '',
    funded_amount: '',
    profit_amount: '',
    duration: '',
    refund: '',
    payment_period: '',
    status: '',
    activity_area: '',
    date_range: [],
    link: '',
    applicant_percentage: '',
    nominal_price: '',
    description: '',
  });

  const durationOptions = [
    { value: '1', label: 'ماهانه' },
    { value: '3', label: 'سه ماهه' },
    { value: '6', label: 'شش ماهه' },
    { value: '12', label: 'دوازده ماهه' },
  ];

  const statusOptions = [
    { value: '1', label: 'لغو شده' },
    { value: '2', label: 'در حال اجرا' },
    { value: '3', label: 'تکمیل شده' },
    { value: '4', label: 'در انتظار' },
    { value: '5', label: 'کنسل شده' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, date_range: date }));
  };
  const { mutate } = useMutation({
    mutationFn: sendPlanData,
  });

  const handleSubmit = () => {
    console.log(formData); 
    mutate(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>ایجاد طرح جدید</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField name="plan_name" label="نام طرح" onChange={handleChange} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField name="company_name" label="نام شرکت" onChange={handleChange} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField name="symbol" label="نماد" onChange={handleChange} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField
                name="funded_amount"
                label="مبلغ تایین شده"
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <TextField
                name="profit_amount"
                label="میزان سود"
                type="text"
                InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField name="duration" label="مدت کلی" onChange={handleChange} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField name="refund" label="شناوری" onChange={handleChange} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <SelectField
                id="payment_period"
                name="duration"
                label="دوره پرداخت"
                options={durationOptions}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <SelectField
                id="status"
                name="status"
                label="وضعیت اجرای طرح"
                options={statusOptions}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField name="activity_area" label="حوزه فعالیت" onChange={handleChange} />
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
                style={{ width: '100%', height: '56px' }}
                inputStyle={{ height: '100%', width: '100%' }}
                placeholder="روز های باقی مانده"
                onChange={handleDateChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField name="refund" label="بازگردان" onChange={handleChange} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField name="link" label="لینک فرابورس" onChange={handleChange} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <TextField
                name="applicant_percentage"
                label="درصد تامین متقاضی"
                type="text"
                InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField
                name="nominal_price"
                label="قیمت اسمی هرگواهی"
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Box mb={2}>
              <GlobalTextField name="description" label="توضیحات" onChange={handleChange} />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <SubmitButton onClick={handleSubmit} />
      </DialogActions>
    </Dialog>
  );
};

PlanCreateModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default PlanCreateModal;
