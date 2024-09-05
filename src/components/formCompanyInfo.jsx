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
import { Link } from 'react-router-dom';
import Label from './label';

const FormCompanyInfo = ({ cardSelected, onFileChange, handleNext }) => {
  const [clicked, setClicked] = useState(false);

  const formatNumber = (value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const mutation = useMutation({ mutationFn: () => createCart(localData, cardSelected) });

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['cartDetail', cardSelected],
    queryFn: () => getStep1(cardSelected),
  });

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

  const handleFileRemove = (type) => {
    setLocalData((prev) => {
      const updated = { ...prev };
      delete updated[type];
      return updated;
    });
  };

  console.log(localData);

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
            borderRadius: '8px',
            boxShadow: 3,
          }}
        >
          <form style={{ height: '800px', overflowY: 'auto' }} onSubmit={handleSubmit}>
            <div className="bg-gray-200   text-white rounded-t-3xl p-6 text-center mb-8">
              <h1 className="text-5xl font-bold text-gray-700">اطلاعات شرکت</h1>
            </div>
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

              <Grid item xs={12} sm={12}>
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
              <div className="mt-10 ">
                <div className="bg-gray-200 text-white rounded-t-3xl p-6 text-center mb-8">
                  <h1 className="text-5xl font-bold text-gray-700">پیوست اسناد</h1>
                </div>

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
                    <Box
                      sx={{
                        backgroundColor: '#fff',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        padding: '24px',
                        marginBottom: '24px',
                        width: { xs: '100%', sm: '48%' },
                        border: '1px solid #ccc',
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          marginBottom: '16px',
                          textAlign: 'center',
                          color: '#424242',
                          fontWeight: 'bold',
                          borderBottom: '1px solid #e0e0e0',
                          paddingBottom: '16px',
                        }}
                      >
                        گزارشات و مستندات منتهی به سال 1402
                      </Typography>

                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            صورت مالی
                            <Switch
                              name="Lock_financial_report_lastyear"
                              inputProps={{ 'aria-label': 'controlled' }}
                              sx={{ marginLeft: '8px' }}
                              checked={localData.Lock_financial_report_lastyear}
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  Lock_financial_report_lastyear: e.target.checked,
                                })
                              }
                            />
                          </FormLabel>
                          {localData.financial_report_lastyear ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                marginTop: '10px',
                              }}
                            >
                              <Link
                                href={`${OnRun}/${localData.financial_report_lastyear}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: '#ef5350',
                                  display: 'flex',
                                  alignItems: 'center',
                                  '&:hover': {
                                    color: '#d32f2f',
                                  },
                                }}
                              >
                                مشاهده فایل بارگذاری شده
                                <FileCopyOutlinedIcon
                                  sx={{ fontSize: '16px', marginLeft: '4px' }}
                                />
                              </Link>
                              <Button
                                sx={{
                                  color: '#e53935',
                                  '&:hover': {
                                    color: '#c62828',
                                  },
                                }}
                                onClick={() => handleFileRemove('financial_report_lastyear')}
                              >
                                حذف فایل
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="financial_report_lastyear"
                              type="file"
                              id="file-upload-lastyear-financial_report"
                              sx={{
                                marginTop: '8px',
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                const fileValue = file ? URL.createObjectURL(file) : '';
                                setLocalData({
                                  ...localData,
                                  financial_report_lastyear: fileValue,
                                });
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>

                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            گزارش حسابرسی
                            <Switch
                              name="Lock_audit_report_lastyear"
                              inputProps={{ 'aria-label': 'controlled' }}
                              sx={{ marginLeft: '8px' }}
                              checked={localData.Lock_audit_report_lastyear}
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  Lock_audit_report_lastyear: e.target.checked,
                                })
                              }
                            />
                          </FormLabel>
                          {localData.audit_report_lastyear ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                marginTop: '10px',
                              }}
                            >
                              <Link
                                href={`${OnRun}/${localData.audit_report_lastyear}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: '#ef5350',
                                  display: 'flex',
                                  alignItems: 'center',
                                  '&:hover': {
                                    color: '#d32f2f',
                                  },
                                }}
                              >
                                مشاهده فایل بارگذاری شده
                                <FileCopyOutlinedIcon
                                  sx={{ fontSize: '16px', marginLeft: '4px' }}
                                />
                              </Link>
                              <Button
                                sx={{
                                  color: '#e53935',
                                  '&:hover': {
                                    color: '#c62828',
                                  },
                                }}
                                onClick={() =>
                                  setLocalData({
                                    ...localData,
                                    audit_report_lastyear: null,
                                  })
                                }
                              >
                                حذف فایل
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="audit_report_lastyear"
                              type="file"
                              id="file-upload-lastyear-audit_report"
                              sx={{
                                marginTop: '8px',
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                const fileValue = file ? URL.createObjectURL(file) : '';
                                setLocalData({
                                  ...localData,
                                  audit_report_lastyear: fileValue,
                                });
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>

                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            اظهارنامه
                            <Switch
                              name="Lock_statement_lastyear"
                              inputProps={{ 'aria-label': 'controlled' }}
                              sx={{ marginLeft: '8px' }}
                              checked={localData.Lock_statement_lastyear}
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  Lock_statement_lastyear: e.target.checked,
                                })
                              }
                            />
                          </FormLabel>
                          {localData.statement_lastyear ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                marginTop: '10px',
                              }}
                            >
                              <Link
                                href={`${OnRun}/${localData.statement_lastyear}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: '#ef5350',
                                  display: 'flex',
                                  alignItems: 'center',
                                  '&:hover': {
                                    color: '#d32f2f',
                                  },
                                }}
                              >
                                مشاهده فایل بارگذاری شده
                                <FileCopyOutlinedIcon
                                  sx={{ fontSize: '16px', marginLeft: '4px' }}
                                />
                              </Link>
                              <Button
                                sx={{
                                  color: '#e53935',
                                  '&:hover': {
                                    color: '#c62828',
                                  },
                                }}
                                onClick={() =>
                                  setLocalData({
                                    ...localData,
                                    statement_lastyear: null,
                                  })
                                }
                              >
                                حذف فایل
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="statement_lastyear"
                              type="file"
                              id="file-upload-lastyear-statement"
                              sx={{
                                marginTop: '8px',
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                const fileValue = file ? URL.createObjectURL(file) : '';
                                setLocalData({
                                  ...localData,
                                  statement_lastyear: fileValue,
                                });
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        backgroundColor: '#fff',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        padding: '24px',
                        marginBottom: '24px',
                        width: { xs: '100%', sm: '48%' },
                        border: '1px solid #ccc',
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          marginBottom: '16px',
                          textAlign: 'center',
                          color: '#424242',
                          fontWeight: 'bold',
                          borderBottom: '1px solid #e0e0e0',
                          paddingBottom: '16px',
                        }}
                      >
                        گزارشات و مستندات منتهی به سال 1401
                      </Typography>

                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            صورت مالی
                            <Switch
                              name="Lock_financial_report_yearold"
                              inputProps={{ 'aria-label': 'controlled' }}
                              sx={{ marginLeft: '8px' }}
                              checked={localData.Lock_financial_report_yearold}
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  Lock_financial_report_yearold: e.target.checked,
                                })
                              }
                            />
                          </FormLabel>
                          {localData.financial_report_yearold ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                marginTop: '10px',
                              }}
                            >
                              <Link
                                href={`${OnRun}/${localData.financial_report_yearold}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: '#ef5350',
                                  display: 'flex',
                                  alignItems: 'center',
                                  '&:hover': {
                                    color: '#d32f2f',
                                  },
                                }}
                              >
                                مشاهده فایل بارگذاری شده
                                <FileCopyOutlinedIcon
                                  sx={{ fontSize: '16px', marginLeft: '4px' }}
                                />
                              </Link>
                              <Button
                                sx={{
                                  color: '#e53935',
                                  '&:hover': {
                                    color: '#c62828',
                                  },
                                }}
                                onClick={() =>
                                  setLocalData({
                                    ...localData,
                                    financial_report_yearold: null,
                                  })
                                }
                              >
                                حذف فایل
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="financial_report_yearold"
                              type="file"
                              id="file-upload-yearold-financial_report"
                              sx={{
                                marginTop: '8px',
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                const fileValue = file ? URL.createObjectURL(file) : '';
                                setLocalData({
                                  ...localData,
                                  financial_report_yearold: fileValue,
                                });
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>

                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            گزارش حسابرسی
                            <Switch
                              name="Lock_audit_report_yearold"
                              inputProps={{ 'aria-label': 'controlled' }}
                              sx={{ marginLeft: '8px' }}
                              checked={localData.Lock_audit_report_yearold}
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  Lock_audit_report_yearold: e.target.checked,
                                })
                              }
                            />
                          </FormLabel>
                          {localData.audit_report_yearold ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                marginTop: '10px',
                              }}
                            >
                              <Link
                                href={`${OnRun}/${localData.audit_report_yearold}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: '#ef5350',
                                  display: 'flex',
                                  alignItems: 'center',
                                  '&:hover': {
                                    color: '#d32f2f',
                                  },
                                }}
                              >
                                مشاهده فایل بارگذاری شده
                                <FileCopyOutlinedIcon
                                  sx={{ fontSize: '16px', marginLeft: '4px' }}
                                />
                              </Link>
                              <Button
                                sx={{
                                  color: '#e53935',
                                  '&:hover': {
                                    color: '#c62828',
                                  },
                                }}
                                onClick={() =>
                                  setLocalData({
                                    ...localData,
                                    audit_report_yearold: null,
                                  })
                                }
                              >
                                حذف فایل
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="audit_report_yearold"
                              type="file"
                              id="file-upload-yearold-audit_report"
                              sx={{
                                marginTop: '8px',
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                const fileValue = file ? URL.createObjectURL(file) : '';
                                setLocalData({
                                  ...localData,
                                  audit_report_yearold: fileValue,
                                });
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>

                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            اظهار نامه
                            <Switch
                              name="Lock_statement_yearold"
                              inputProps={{ 'aria-label': 'controlled' }}
                              sx={{ marginLeft: '8px' }}
                              checked={localData.Lock_statement_yearold}
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  Lock_statement_yearold: e.target.checked,
                                })
                              }
                            />
                          </FormLabel>
                          {localData.statement_yearold ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                marginTop: '10px',
                              }}
                            >
                              <Link
                                href={`${OnRun}/${localData.statement_yearold}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: '#ef5350',
                                  display: 'flex',
                                  alignItems: 'center',
                                  '&:hover': {
                                    color: '#d32f2f',
                                  },
                                }}
                              >
                                مشاهده فایل بارگذاری شده
                                <FileCopyOutlinedIcon
                                  sx={{ fontSize: '16px', marginLeft: '4px' }}
                                />
                              </Link>
                              <Button
                                sx={{
                                  color: '#e53935',
                                  '&:hover': {
                                    color: '#c62828',
                                  },
                                }}
                                onClick={() =>
                                  setLocalData({
                                    ...localData,
                                    statement_yearold: null,
                                  })
                                }
                              >
                                حذف فایل
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="statement_yearold"
                              type="file"
                              id="file-upload-yearold-statement"
                              sx={{
                                marginTop: '8px',
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                const fileValue = file ? URL.createObjectURL(file) : '';
                                setLocalData({
                                  ...localData,
                                  statement_yearold: fileValue,
                                });
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        backgroundColor: '#fff',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        padding: '24px',
                        marginBottom: '24px',
                        width: { xs: '100%', sm: '48%' },
                        border: '1px solid #ccc',
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          marginBottom: '16px',
                          textAlign: 'center',
                          color: '#424242',
                          fontWeight: 'bold',
                          borderBottom: '1px solid #e0e0e0',
                          paddingBottom: '16px',
                        }}
                      >
                        گزارشات و مستندات به روز
                      </Typography>

                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            تراز 6 ستونی
                            <Switch
                              name="Lock_alignment_6columns_thisyear"
                              inputProps={{ 'aria-label': 'controlled' }}
                              sx={{ marginLeft: '8px' }}
                              checked={localData.Lock_alignment_6columns_thisyear}
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  Lock_alignment_6columns_thisyear: e.target.checked,
                                })
                              }
                            />
                          </FormLabel>
                          {localData.alignment_6columns_thisyear ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                marginTop: '10px',
                              }}
                            >
                              <Link
                                href={`${OnRun}/${localData.alignment_6columns_thisyear}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: '#ef5350',
                                  display: 'flex',
                                  alignItems: 'center',
                                  '&:hover': {
                                    color: '#d32f2f',
                                  },
                                }}
                              >
                                مشاهده فایل بارگذاری شده
                                <FileCopyOutlinedIcon
                                  sx={{ fontSize: '16px', marginLeft: '4px' }}
                                />
                              </Link>
                              <Button
                                sx={{
                                  color: '#e53935',
                                  '&:hover': {
                                    color: '#c62828',
                                  },
                                }}
                                onClick={() =>
                                  setLocalData({
                                    ...localData,
                                    alignment_6columns_thisyear: null,
                                  })
                                }
                              >
                                حذف فایل
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="alignment_6columns_thisyear"
                              type="file"
                              id="file-upload-thisyear-financial_report"
                              sx={{
                                marginTop: '8px',
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                const fileValue = file ? URL.createObjectURL(file) : '';
                                setLocalData({
                                  ...localData,
                                  alignment_6columns_thisyear: fileValue,
                                });
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        padding: '20px',
                        border: '1px solid #ccc',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        marginBottom: '16px',
                        width: { xs: '100%', sm: '48%' },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          marginBottom: '16px',
                          textAlign: 'center',
                          color: '#424242',
                          fontWeight: 'bold',
                          borderBottom: '1px solid #e0e0e0',
                          paddingBottom: '16px',
                        }}
                      >
                        سایر موارد
                      </Typography>

                      {/* Financial Report */}
                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              marginBottom: '8px',
                              display: 'block',
                            }}
                          >
                            وضعیت دعاوی:
                          </FormLabel>
                          {typeof localData.claims_status === 'string' ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                              }}
                            >
                              <Link
                                href={
                                  localData.Lock_claims_status
                                    ? null
                                    : `${OnRun}/${localData.claims_status}`
                                }
                                onClick={(e) => localData.Lock_claims_status && e.preventDefault()}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: localData.Lock_claims_status ? '#9e9e9e' : '#1e88e5',
                                  '&:hover': {
                                    color: localData.Lock_claims_status ? '#9e9e9e' : '#1565c0',
                                  },
                                }}
                              >
                                فایل وضعیت دعاوی
                              </Link>
                              <Button
                                onClick={() => handleFileRemove('claims_status')}
                                disabled={localData.Lock_claims_status}
                                sx={{
                                  color: localData.Lock_claims_status ? '#e0e0e0' : '#e53935',
                                  '&:hover': {
                                    color: localData.Lock_claims_status ? '#e0e0e0' : '#c62828',
                                  },
                                }}
                              >
                                حذف
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="claims_status"
                              type="file"
                              onChange={(e) =>
                                setLocalData({ ...localData, claims_status: e.target.files[0] })
                              }
                              disabled={localData.Lock_claims_status}
                              sx={{
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>

                      {/* Audit Report */}
                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              marginBottom: '8px',
                              display: 'block',
                            }}
                          >
                            :آخرین لیست بیمه کارکنان
                          </FormLabel>
                          {typeof localData.latest_insurance_staf === 'string' ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                              }}
                            >
                              <Link
                                href={
                                  localData.Lock_latest_insurance_staf
                                    ? null
                                    : `${OnRun}/${localData.latest_insurance_staf}`
                                }
                                onClick={(e) =>
                                  localData.Lock_latest_insurance_staf && e.preventDefault()
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: localData.Lock_latest_insurance_staf
                                    ? '#9e9e9e'
                                    : '#1e88e5',
                                  '&:hover': {
                                    color: localData.Lock_latest_insurance_staf
                                      ? '#9e9e9e'
                                      : '#1565c0',
                                  },
                                }}
                              >
                                فایل لیست بیمه کارکنان
                              </Link>
                              <Button
                                onClick={() => handleFileRemove('latest_insurance_staf')}
                                disabled={localData.Lock_latest_insurance_staf}
                                sx={{
                                  color: localData.Lock_latest_insurance_staf
                                    ? '#e0e0e0'
                                    : '#e53935',
                                  '&:hover': {
                                    color: localData.Lock_latest_insurance_staf
                                      ? '#e0e0e0'
                                      : '#c62828',
                                  },
                                }}
                              >
                                حذف
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="latest_insurance_staf"
                              type="file"
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  latest_insurance_staf: e.target.files[0],
                                })
                              }
                              disabled={localData.Lock_latest_insurance_staf}
                              sx={{
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>

                      {/* Statement */}
                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              marginBottom: '8px',
                              display: 'block',
                            }}
                          >
                            لیست دایی ها و بدهی ها:
                          </FormLabel>
                          {typeof localData.assets_and_liabilities === 'string' ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                              }}
                            >
                              <Link
                                href={
                                  localData.Lock_assets_and_liabilities
                                    ? null
                                    : `${OnRun}/${localData.assets_and_liabilities}`
                                }
                                onClick={(e) =>
                                  localData.Lock_assets_and_liabilities && e.preventDefault()
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: localData.Lock_assets_and_liabilities
                                    ? '#9e9e9e'
                                    : '#1e88e5',
                                  '&:hover': {
                                    color: localData.Lock_assets_and_liabilities
                                      ? '#9e9e9e'
                                      : '#1565c0',
                                  },
                                }}
                              >
                                فایل لیست دایی ها و بدهی ها
                              </Link>
                              <Button
                                onClick={() => handleFileRemove('assets_and_liabilities')}
                                disabled={localData.Lock_assets_and_liabilities}
                                sx={{
                                  color: localData.Lock_assets_and_liabilities
                                    ? '#e0e0e0'
                                    : '#e53935',
                                  '&:hover': {
                                    color: localData.Lock_assets_and_liabilities
                                      ? '#e0e0e0'
                                      : '#c62828',
                                  },
                                }}
                              >
                                حذف
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="assets_and_liabilities"
                              type="file"
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  assets_and_liabilities: e.target.files[0],
                                })
                              }
                              disabled={localData.Lock_assets_and_liabilities}
                              sx={{
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>

                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              marginBottom: '8px',
                              display: 'block',
                            }}
                          >
                            اساسنامه:
                          </FormLabel>
                          {typeof localData.statutes === 'string' ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                              }}
                            >
                              <Link
                                href={
                                  localData.Lock_statutes ? null : `${OnRun}/${localData.statutes}`
                                }
                                onClick={(e) => localData.Lock_statutes && e.preventDefault()}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: localData.Lock_statutes ? '#9e9e9e' : '#1e88e5',
                                  '&:hover': {
                                    color: localData.Lock_statutes ? '#9e9e9e' : '#1565c0',
                                  },
                                }}
                              >
                                فایل لیست دایی ها و بدهی ها
                              </Link>
                              <Button
                                onClick={() => handleFileRemove('statutes')}
                                disabled={localData.Lock_statutes}
                                sx={{
                                  color: localData.Lock_statutes ? '#e0e0e0' : '#e53935',
                                  '&:hover': {
                                    color: localData.Lock_statutes ? '#e0e0e0' : '#c62828',
                                  },
                                }}
                              >
                                حذف
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="statutes"
                              type="file"
                              onChange={(e) =>
                                setLocalData({ ...localData, statutes: e.target.files[0] })
                              }
                              disabled={localData.Lock_statutes}
                              sx={{
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>

                      {/* Financial Account Flow */}
                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              marginBottom: '8px',
                              display: 'block',
                            }}
                          >
                            فایل گردش حسابهای بانکی اصلی شرکت:
                          </FormLabel>
                          {typeof localData.bank_account_turnover === 'string' ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                              }}
                            >
                              <Link
                                href={
                                  localData.Lock_bank_account_turnover
                                    ? null
                                    : `${OnRun}/${localData.bank_account_turnover}`
                                }
                                onClick={(e) =>
                                  localData.Lock_bank_account_turnover && e.preventDefault()
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: localData.Lock_bank_account_turnover
                                    ? '#9e9e9e'
                                    : '#1e88e5',
                                  '&:hover': {
                                    color: localData.Lock_bank_account_turnover
                                      ? '#9e9e9e'
                                      : '#1565c0',
                                  },
                                }}
                              >
                                فایل گردش حسابهای بانکی اصلی شرکت
                              </Link>
                              <Button
                                onClick={() => handleFileRemove('bank_account_turnover')}
                                disabled={localData.Lock_bank_account_turnover}
                                sx={{
                                  color: localData.Lock_bank_account_turnover
                                    ? '#e0e0e0'
                                    : '#e53935',
                                  '&:hover': {
                                    color: localData.Lock_bank_account_turnover
                                      ? '#e0e0e0'
                                      : '#c62828',
                                  },
                                }}
                              >
                                حذف
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="bank_account_turnover"
                              type="file"
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  bank_account_turnover: e.target.files[0],
                                })
                              }
                              disabled={localData.Lock_bank_account_turnover}
                              sx={{
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>

                      {/* Last Capital Changes */}
                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              marginBottom: '8px',
                              display: 'block',
                            }}
                          >
                            آگهی آخرین تغییرات سرمایه ای:
                          </FormLabel>
                          {typeof localData.announcement_of_changes_capital === 'string' ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                              }}
                            >
                              <Link
                                href={
                                  localData.Lock_announcement_of_changes_capital
                                    ? null
                                    : `${OnRun}/${localData.announcement_of_changes_capital}`
                                }
                                onClick={(e) =>
                                  localData.Lock_announcement_of_changes_capital &&
                                  e.preventDefault()
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: localData.Lock_announcement_of_changes_capital
                                    ? '#9e9e9e'
                                    : '#1e88e5',
                                  '&:hover': {
                                    color: localData.Lock_announcement_of_changes_capital
                                      ? '#9e9e9e'
                                      : '#1565c0',
                                  },
                                }}
                              >
                                فایل آگهی آخرین تغییرات سرمایه ای
                              </Link>
                              <Button
                                onClick={() => handleFileRemove('announcement_of_changes_capital')}
                                disabled={localData.Lock_announcement_of_changes_capital}
                                sx={{
                                  color: localData.Lock_announcement_of_changes_capital
                                    ? '#e0e0e0'
                                    : '#e53935',
                                  '&:hover': {
                                    color: localData.Lock_announcement_of_changes_capital
                                      ? '#e0e0e0'
                                      : '#c62828',
                                  },
                                }}
                              >
                                حذف
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="announcement_of_changes_capital"
                              type="file"
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  announcement_of_changes_capital: e.target.files[0],
                                })
                              }
                              disabled={localData.Lock_announcement_of_changes_capital}
                              sx={{
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>

                      {/* Last Management Changes */}
                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              marginBottom: '8px',
                              display: 'block',
                            }}
                          >
                            آگهی آخرین تغییرات مدیران:
                          </FormLabel>
                          {typeof localData.announcement_of_changes_managers === 'string' ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                              }}
                            >
                              <Link
                                href={
                                  localData.Lock_announcement_of_changes_managers
                                    ? null
                                    : `${OnRun}/${localData.announcement_of_changes_managers}`
                                }
                                onClick={(e) =>
                                  localData.Lock_announcement_of_changes_managers &&
                                  e.preventDefault()
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: localData.Lock_announcement_of_changes_managers
                                    ? '#9e9e9e'
                                    : '#1e88e5',
                                  '&:hover': {
                                    color: localData.Lock_announcement_of_changes_managers
                                      ? '#9e9e9e'
                                      : '#1565c0',
                                  },
                                }}
                              >
                                فایل آگهی آخرین تغییرات مدیران
                              </Link>
                              <Button
                                onClick={() => handleFileRemove('announcement_of_changes_managers')}
                                disabled={localData.Lock_announcement_of_changes_managers}
                                sx={{
                                  color: localData.Lock_announcement_of_changes_managers
                                    ? '#e0e0e0'
                                    : '#e53935',
                                  '&:hover': {
                                    color: localData.Lock_announcement_of_changes_managers
                                      ? '#e0e0e0'
                                      : '#c62828',
                                  },
                                }}
                              >
                                حذف
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="announcement_of_changes_managers"
                              type="file"
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  announcement_of_changes_managers: e.target.files[0],
                                })
                              }
                              disabled={localData.Lock_announcement_of_changes_managers}
                              sx={{
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </div>
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
