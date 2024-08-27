/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  Grid,
  Switch,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';
import Label from './label';
import AttachmentForm from './AttachmentForm';

const FormCompanyInfo = ({ cardSelected }) => {
  const [formData, setFormData] = useState();

  const [switchStates, setSwitchStates] = useState({
    amount_of_request: false,
  });

  const access = getCookie('access');

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    getdata();
  };

  useEffect(() => {
    if (cardSelected) {
      axios
        .get(`${OnRun}/api/cart/detail/admin/${cardSelected}/`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        .then((response) => {
          setFormData(response.data.cart);
        });
    }
  }, [cardSelected, access]);

  const getdata = () => {
    if (cardSelected) {
      axios
        .get(`${OnRun}/api/cart/admin/${cardSelected}/`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        .then((response) => {
          console.log(response);
        });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = (event) => {
    setSwitchStates({
      ...switchStates,
      [event.target.name]: event.target.checked,
    });
  };

  const handleRangeChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setFormData({
      ...formData,
      amount_of_request: value,
    });
  };

  const formatNumber = (value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const handleSubmit = (event) => {
    console.log('hh');
  };

  return formData ? (
    <div dir="rtl">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          p: 3,
        }}
      >
        <Box
          p={3}
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          sx={{
            backgroundColor: 'white',
            width: '100%',
            maxWidth: '1200px',
            overflowY: 'hidden',
            borderRadius: '8px',
            boxShadow: 3,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_company_name"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="mr-4"
                    value={formData.Lock_company_name}
                  />
                </div>

                <TextField
                  name="company_name"
                  label="نام شرکت"
                  variant="outlined"
                  fullWidth
                  value={formData.company_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <div dir="ltr">
                    <Switch
                      name="Lock_company_kind"
                      inputProps={{ 'aria-label': 'controlled' }}
                      className="ml-4"
                      value={formData.Lock_company_kind}
                    />
                  </div>
                  <TextField
                    select
                    name="company_kind"
                    value={formData.company_kind}
                    onChange={handleChange}
                    label="نوع شرکت"
                  >
                    <MenuItem value="سهامی عام">سهامی عام</MenuItem>
                    <MenuItem value="سهامی خاص">سهامی خاص</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <div dir="ltr">
                    <Switch
                      name="amount_of_request"
                      inputProps={{ 'aria-label': 'controlled' }}
                      className="ml-4"
                      value={formData.status}
                    />
                  </div>

                  <TextField
                    select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    label="وضعیت"
                  >
                    <MenuItem value="waiting">درانتظار</MenuItem>
                    <MenuItem value="ok">مشخص شده</MenuItem>
                    <MenuItem value="editing">نامشخص</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_nationalid"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    value={formData.Lock_nationalid}
                  />
                </div>

                <TextField
                  name="nationalid"
                  label="شماره شناسه"
                  variant="outlined"
                  fullWidth
                  value={formData.nationalid}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_registration_number"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    value={formData.Lock_registration_number}
                  />
                </div>

                <TextField
                  name="registration_number"
                  label="شماره ثبت"
                  variant="outlined"
                  fullWidth
                  value={formData.registration_number}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_registered_capital"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    value={formData.Lock_registered_capital}
                  />
                </div>

                <TextField
                  name="registered_capital"
                  label="سرمایه ثبتی (ریال)"
                  variant="outlined"
                  fullWidth
                  value={formData.registered_capital}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_personnel"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    value={formData.Lock_personnel}
                  />
                </div>

                <TextField
                  name="personnel"
                  label="تعداد کارکنان"
                  variant="outlined"
                  fullWidth
                  value={formData.personnel}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_email"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    value={formData.Lock_email}
                  />
                </div>

                <TextField
                  name="email"
                  label="ایمیل شرکت"
                  variant="outlined"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_activity_industry"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    value={formData.Lock_activity_industry}
                  />
                </div>
                <TextField
                  name="activity_industry"
                  label="موضوع فعالیت شرکت"
                  variant="outlined"
                  fullWidth
                  value={formData.activity_industry}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_address"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    value={formData.Lock_address}
                  />
                </div>

                <TextField
                  name="address"
                  label="آدرس شرکت"
                  variant="outlined"
                  fullWidth
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Box
              mt={8}
              width="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box display="flex" alignItems="center" mb={2}>
                <Label className="block text-gray-700 text-sm font-medium">
                  میزان منابع درخواستی (ریال):
                </Label>
                <div dir="ltr">
                  <Switch
                    name="Lock_amount_of_request"
                    checked={switchStates.amount_of_request}
                    onChange={handleSwitchChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    value={formData.Lock_amount_of_request}
                  />
                </div>
              </Box>
              <input
                type="range"
                name="amount_of_request"
                min={10000000000}
                max={250000000000}
                step={10000000000}
                value={formData.amount_of_request}
                onChange={handleRangeChange}
                className="w-full"
              />
              <span className="block text-gray-700 text-sm mt-4 text-center">
                {formatNumber(formData.amount_of_request)} ریال
              </span>
            </Box>

            <Box display="flex" justifyContent="center" width="100%" mt={4}>
              <AttachmentForm formData={formData} />
            </Box>

            <div className="flex justify-center mt-8">
              <Button
                type="button"
                variant="contained"
                color="primary"
                className="py-2 px-6 rounded-full shadow-lg"
                onClick={handleClick}
              >
                درخواست بررسی اولیه
              </Button>
            </div>
            {clicked && <p className="mt-4 text-center text-gray-600">{formData.massage}</p>}
          </form>
        </Box>
      </Box>
    </div>
  ) : null;
};

FormCompanyInfo.propTypes = {
  cardSelected: PropTypes.string,
};

export default FormCompanyInfo;
