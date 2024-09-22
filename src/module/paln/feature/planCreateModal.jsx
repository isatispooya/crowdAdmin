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
  const [formData, setFormData] = useState({});

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

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, date_range: date }));
  };

  const mutation = useMutation({
    mutationKey: ['create'],
    mutationFn: sendPlanData,
    onSuccess: () => {
      window.location.reload();
    },
  });
  

  const handleSubmit = () => {
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>ایجاد طرح جدید</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField
                value={formData.plan_name}
                label="نام طرح"
                onChange={(e) => {
                  setFormData({ ...formData, plan_name: e.target.value });
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField
                value={formData.company_name}
                label="نام شرکت"
                onChange={(e) => {
                  setFormData({ ...formData, company_name: e.target.value });
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField
                value={formData.symbol}
                label="نماد"
                onChange={(e) => {
                  setFormData({ ...formData, symbol: e.target.value });
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField
                type="number"
                value={formData.funded_amount}
                label="مبلغ تایین شده"
                onChange={(e) => {
                  setFormData({ ...formData, funded_amount: e.target.value });
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <TextField
                value={formData.profit_amount}
                label="میزان سود"
                type="number"
                InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                variant="outlined"
                fullWidth
                onChange={(e) => {
                  setFormData({ ...formData, profit_amount: e.target.value });
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField
                value={formData.total_time}
                label="مدت کلی"
                type="number"
                onChange={(e) => {
                  setFormData({ ...formData, total_time: e.target.value });
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField
                value={formData.buoyancy}
                label="شناوری"
                type="number"
                onChange={(e) => {
                  setFormData({ ...formData, buoyancy: e.target.value });
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <SelectField
                id="payment_period"
                value={formData.payment_period}
                label="دوره پرداخت"
                options={durationOptions}
                onChange={(e) => {
                  setFormData({ ...formData, payment_period: e.target.value });
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <SelectField
                id="status"
                value={formData.plan_status}
                label="وضعیت اجرای طرح"
                options={statusOptions}
                onChange={(e) => {
                  setFormData({ ...formData, plan_status: e.target.value });
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField
                value={formData.activity_area}
                label="حوزه فعالیت"
                onChange={(e) => {
                  setFormData({ ...formData, activity_area: e.target.value });
                }}
              />
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
                value={formData.total_time}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField
                value={formData.farabours_link}
                label="لینک فرابورس"
                onChange={(e) => {
                  setFormData({ ...formData, farabours_link: e.target.value });
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <TextField
                value={formData.applicant_funding_percentage}
                label="درصد تامین متقاضی"
                type="number"
                InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                variant="outlined"
                fullWidth
                onChange={(e) => {
                  setFormData({ ...formData, applicant_funding_percentage: e.target.value });
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <GlobalTextField
                value={formData.nominal_price_certificate}
                type="number"
                label="قیمت اسمی هرگواهی"
                onChange={(e) => {
                  setFormData({ ...formData, nominal_price_certificate: e.target.value });
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Box mb={2}>
              <GlobalTextField
                value={formData.description}
                label="توضیحات"
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <SubmitButton onClick={handleSubmit} disabled={mutation.isLoading} />
      </DialogActions>
    </Dialog>
  );
};

PlanCreateModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default PlanCreateModal;
