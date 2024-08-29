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
  Typography,
  FormLabel,
  Input,
  Select,
  InputLabel,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getStep1, createCart } from 'src/hook/step1';
import { toast } from 'react-toastify';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { OnRun } from 'src/api/OnRun';
import Label from './label';

const FormCompanyInfo = ({ cardSelected, onFileChange, handleNext }) => {
  const [clicked, setClicked] = useState(false);

  const formatNumber = (value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const mutation = useMutation({ mutationFn: () => createCart(localData, cardSelected) });

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['cartDetail', cardSelected],
    queryFn: () => getStep1(cardSelected),
  });

  console.log('data', data);

  const [localData, setLocalData] = useState(() => data || {});

  useEffect(() => {
    if (isSuccess && data) {
      setLocalData(data.data.cart);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      toast.warning(error);
    }
  }, [isError, error]);

  const handleRangeChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setLocalData({
      ...localData,
      amount_of_request: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClicked(true);
    mutation.mutateAsync(localData, cardSelected);
    handleNext();
  };

  if (isLoading) {
    return <p>loading ....</p>;
  }
  if (isError) {
    return <p>error ....</p>;
  }
  if (!data) {
    return <p>data ....</p>;
  }


  return localData ? (
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
                    checked={localData.Lock_company_name}
                    onChange={(e) =>
                      setLocalData({ ...localData, Lock_company_name: e.target.checked })
                    }
                  />
                </div>
                <TextField
                  name="company_name"
                  label="نام شرکت"
                  variant="outlined"
                  fullWidth
                  value={localData.company_name}
                  onChange={(e) => setLocalData({ ...localData, company_name: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_company_kind"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_company_kind}
                    onChange={(e) =>
                      setLocalData({ ...localData, Lock_company_kind: e.target.checked })
                    }
                  />
                </div>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="company_kind-label">نوع شرکت</InputLabel>
                  <Select
                    inputProps={{ 'aria-label': 'controlled' }}
                    labelId="company_kind-label"
                    name="company_kind"
                    value={localData.company_kind}
                    onChange={(e) => setLocalData({ ...localData, company_kind: e.target.value })}
                    label="نوع شرکت"
                  >
                    <MenuItem value="1">شرکت سهامی سجام</MenuItem>
                    <MenuItem value="2">شرکت با مسولیت محدود</MenuItem>
                    <MenuItem value="3">شرکت تضامنی</MenuItem>
                    <MenuItem value="4">شرکت مختلط(سهامی و غیر سهامی)</MenuItem>
                    <MenuItem value="5">شرکت نسبی</MenuItem>
                    <MenuItem value="6">شرکت تعاونی</MenuItem>
                    <MenuItem value="7">شرکت دانش بنیان</MenuItem>
                    <MenuItem value="8">سهامی خاص</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} mt={2}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="status-label">وضعیت</InputLabel>
                  <Select
                    labelId="status-label"
                    inputProps={{ 'aria-label': 'controlled' }}
                    name="status"
                    value={localData.status}
                    onChange={(e) => setLocalData({ ...localData, status: e.target.value })}
                    label="وضعیت"
                  >
                    <MenuItem value="1">درانتظار</MenuItem>
                    <MenuItem value="2">تکمیل شده</MenuItem>
                    <MenuItem value="3">نیاز به تکمیل</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_nationalid"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_nationalid}
                    onChange={(e) =>
                      setLocalData({ ...localData, Lock_nationalid: e.target.checked })
                    }
                  />
                </div>
                <TextField
                  name="nationalid"
                  label="شماره شناسه"
                  variant="outlined"
                  fullWidth
                  value={localData.nationalid}
                  onChange={(e) => setLocalData({ ...localData, nationalid: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_registration_number"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_registration_number}
                    onChange={(e) =>
                      setLocalData({ ...localData, Lock_registration_number: e.target.checked })
                    }
                  />
                </div>
                <TextField
                  name="registration_number"
                  label="شماره ثبت"
                  variant="outlined"
                  fullWidth
                  value={localData.registration_number}
                  onChange={(e) =>
                    setLocalData({ ...localData, registration_number: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_registered_capital"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_registered_capital}
                    onChange={(e) =>
                      setLocalData({ ...localData, Lock_registered_capital: e.target.checked })
                    }
                  />
                </div>
                <TextField
                  name="registered_capital"
                  label="سرمایه ثبتی (ریال)"
                  variant="outlined"
                  fullWidth
                  value={localData.registered_capital}
                  onChange={(e) =>
                    setLocalData({ ...localData, registered_capital: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_personnel"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_personnel}
                    onChange={(e) =>
                      setLocalData({ ...localData, Lock_personnel: e.target.checked })
                    }
                  />
                </div>
                <TextField
                  name="personnel"
                  label="تعداد کارکنان"
                  variant="outlined"
                  fullWidth
                  value={localData.personnel}
                  onChange={(e) => setLocalData({ ...localData, personnel: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_email"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_email}
                    onChange={(e) => setLocalData({ ...localData, Lock_email: e.target.checked })}
                  />
                </div>
                <TextField
                  name="email"
                  label="ایمیل شرکت"
                  variant="outlined"
                  fullWidth
                  value={localData.email}
                  onChange={(e) => setLocalData({ ...localData, email: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_activity_industry"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_activity_industry}
                    onChange={(e) =>
                      setLocalData({ ...localData, Lock_activity_industry: e.target.checked })
                    }
                  />
                </div>
                <TextField
                  name="activity_industry"
                  label="موضوع فعالیت شرکت"
                  variant="outlined"
                  fullWidth
                  value={localData.activity_industry}
                  onChange={(e) =>
                    setLocalData({ ...localData, activity_industry: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_address"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_address}
                    onChange={(e) => setLocalData({ ...localData, Lock_address: e.target.checked })}
                  />
                </div>
                <TextField
                  name="address"
                  label="آدرس شرکت"
                  variant="outlined"
                  fullWidth
                  value={localData.address}
                  onChange={(e) => setLocalData({ ...localData, address: e.target.value })}
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
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_amount_of_request}
                    onChange={(e) =>
                      setLocalData({ ...localData, Lock_amount_of_request: e.target.checked })
                    }
                  />
                </div>
              </Box>
              <input
                type="range"
                name="amount_of_request"
                min={10000000000}
                max={250000000000}
                step={10000000000}
                value={localData.amount_of_request}
                onChange={handleRangeChange}
                className="w-full"
              />
              <span className="block text-gray-700 text-sm mt-4 text-center">
                {formatNumber(localData.amount_of_request)} ریال
              </span>
            </Box>

            <Box display="flex" justifyContent="center" width="100%" mt={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '100vh',
                  padding: '20px',
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    justifyContent: 'center',
                    maxWidth: '1200px',
                    width: '100%',
                  }}
                >
                  {[
                    { year: 1402, yearText: 'سال 1402' },
                    { year: 1401, yearText: 'سال 1401' },
                    { year: 'this', yearText: 'به روز' },
                  ].map((item) => (
                    <Box
                      key={item.year}
                      sx={{
                        padding: '20px',
                        border: '1px solid #ccc',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        marginBottom: '16px',
                        width: { xs: '100%', sm: '48%' },
                      }}
                    >
                      <Typography variant="h6">
                        گزارشات و مستندات منتهی به {item.yearText}
                      </Typography>

                      {['financial_report', 'audit_report', 'statement', 'alignment_6columns'].map(
                        (reportType) => (
                          <Box key={reportType} sx={{ marginBottom: '16px' }}>
                            <FormControl fullWidth>
                              <FormLabel>
                                {`${
                                  reportType === 'alignment_6columns'
                                    ? 'تراز 6ستونی'
                                    : reportType === 'financial_report'
                                    ? 'صورت مالی'
                                    : reportType === 'audit_report'
                                    ? 'گزارش حسابرسی'
                                    : 'اظهارنامه'
                                }`}
                                <Switch
                                  name={`Lock_${reportType}_${
                                    item.year === 'this' ? 'thisyear' : item.year
                                  }`}
                                  inputProps={{ 'aria-label': 'controlled' }}
                                  className="ml-4"
                                  checked={
                                    localData[
                                      `Lock_${reportType}_${
                                        item.year === 'this' ? 'thisyear' : item.year
                                      }`
                                    ]
                                  }
                                  onChange={(e) =>
                                    setLocalData({
                                      ...localData,
                                      [`Lock_${reportType}_${
                                        item.year === 'this' ? 'thisyear' : item.year
                                      }`]: e.target.checked,
                                    })
                                  }
                                />
                              </FormLabel>

                              {localData[
                                `${reportType}_${item.year === 'this' ? 'thisyear' : item.year}`
                              ] ? (
                                <>
                                  <a
                                    href={`${OnRun}/${
                                      localData[
                                        `${reportType}_${
                                          item.year === 'this' ? 'thisyear' : item.year
                                        }`
                                      ]
                                    }`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      color: '#ef5350',
                                      marginTop: '10px',
                                      fontSize: '13px',
                                      display: 'block',
                                    }}
                                  >
                                    مشاهده فایل بارگذاری شده
                                    <FileCopyOutlinedIcon style={{ fontSize: '16px' }} />
                                  </a>
                                  <Button
                                    sx={{ marginTop: '8px', marginLeft: '10px' }}
                                    onClick={() =>
                                      setLocalData({
                                        ...localData,
                                        [`${reportType}_${
                                          item.year === 'this' ? 'thisyear' : item.year
                                        }`]: null,
                                      })
                                    }
                                  >
                                    حذف فایل
                                  </Button>
                                </>
                              ) : (
                                <Input
                                  name={`${reportType}_${
                                    item.year === 'this' ? 'thisyear' : item.year
                                  }`}
                                  type="file"
                                  id={`file-upload-${item.year}-${reportType}`}
                                  sx={{ marginTop: '8px' }}
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    const fileValue = file ? URL.createObjectURL(file) : '';
                                    setLocalData({
                                      ...localData,
                                      [`${reportType}_${
                                        item.year === 'this' ? 'thisyear' : item.year
                                      }`]: fileValue,
                                    });
                                  }}
                                />
                              )}
                            </FormControl>
                          </Box>
                        )
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            <div className="flex justify-center mt-8">
              <Button
                type="button"
                variant="contained"
                color="primary"
                className="py-2 px-6 rounded-full shadow-lg"
                onClick={handleSubmit}
              >
                ارسال به کاربر
              </Button>
            </div>

            {clicked && <p className="mt-4 text-center text-gray-600">{data.massage}</p>}
          </form>
        </Box>
      </Box>
    </div>
  ) : null;
};

FormCompanyInfo.propTypes = {
  cardSelected: PropTypes.string,
  onFileChange: PropTypes.func.isRequired,
  handleNext: PropTypes.func,
};

export default FormCompanyInfo;
