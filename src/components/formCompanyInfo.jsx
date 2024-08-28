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
} from '@mui/material';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getStep1, createCart } from 'src/api/step1';
import { toast } from 'react-toastify';
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
      ...data,
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

  return data ? (
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
                <FormControl fullWidth variant="outlined">
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
                  <TextField
                    select
                    name="company_kind"
                    value={localData.company_kind}
                    onChange={(e) => setLocalData({ ...localData, company_kind: e.target.value })}
                    label="نوع شرکت"
                  >
                    <MenuItem value="سهامی عام">سهامی عام</MenuItem>
                    <MenuItem value="سهامی خاص">سهامی خاص</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} marginTop="38px">
                <FormControl fullWidth variant="outlined">
                  <TextField
                    select
                    name="status"
                    value={localData.status}
                    onChange={(e) => setLocalData({ ...localData, status: e.target.value })}
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
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    justifyContent: 'space-between',
                    maxWidth: '1200px',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      padding: '20px',
                      border: '1px solid #ccc',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px',
                      marginBottom: '16px',
                      width: '48%',
                    }}
                  >
                    <Typography variant="h6">گزارشات و مستندات منتهی به سال 1402</Typography>
                    <Box sx={{ marginBottom: '16px' }}>
                      <FormControl fullWidth>
                        <FormLabel>
                          صورت مالی
                          <Switch
                            name="Lock_financial_report_yearold"
                            inputProps={{ 'aria-label': 'controlled' }}
                            className="ml-4"
                            checked={localData.Lock_financial_report_yearold}
                            onChange={(e) =>
                              setLocalData({
                                ...localData,
                                Lock_financial_report_yearold: e.target.checked,
                              })
                            }
                          />
                        </FormLabel>
                        <Input
                          name="financial_report_yearold"
                          type="file"
                          id="file-upload-9"
                          sx={{ marginTop: '8px' }}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              Lock_financial_report_yearold: e.files.value,
                            })
                          }
                        />
                      </FormControl>
                    </Box>
                    <Box sx={{ marginBottom: '16px' }}>
                      <FormControl fullWidth>
                        <FormLabel>
                          گزارش حسابرسی
                          <Switch
                            name="Lock_audit_report_yearold"
                            inputProps={{ 'aria-label': 'controlled' }}
                            className="ml-4"
                            checked={localData.Lock_audit_report_yearold}
                            onChange={(e) =>
                              setLocalData({
                                ...localData,
                                Lock_audit_report_yearold: e.target.checked,
                              })
                            }
                          />
                        </FormLabel>
                        <Input
                          name="audit_report_yearold"
                          type="file"
                          id="file-upload-10"
                          sx={{ marginTop: '8px' }}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              Lock_audit_report_yearold: e.files.value,
                            })
                          }
                        />
                      </FormControl>
                    </Box>
                    <Box sx={{ marginBottom: '16px' }}>
                      <FormControl fullWidth>
                        <FormLabel>
                          اظهارنامه
                          <Switch
                            name="Lock_statement_yearold"
                            inputProps={{ 'aria-label': 'controlled' }}
                            className="ml-4"
                            checked={localData.Lock_statement_yearold}
                            onChange={(e) =>
                              setLocalData({
                                ...localData,
                                Lock_statement_yearold: e.target.checked,
                              })
                            }
                          />
                        </FormLabel>
                        <Input
                          name="statement_yearold"
                          type="file"
                          id="file-upload-11"
                          sx={{ marginTop: '8px' }}
                          onChange={(e) =>
                            setLocalData({ ...localData, Lock_statement_yearold: e.files.value })
                          }
                        />
                      </FormControl>
                    </Box>
                    <Box sx={{ marginBottom: '16px' }}>
                      <FormControl fullWidth>
                        <FormLabel>
                          تراز 6ستونی
                          <Switch
                            name="Lock_alignment_6columns_yearold"
                            inputProps={{ 'aria-label': 'controlled' }}
                            className="ml-4"
                            checked={localData.Lock_alignment_6columns_yearold}
                            onChange={(e) =>
                              setLocalData({
                                ...localData,
                                Lock_alignment_6columns_yearold: e.target.checked,
                              })
                            }
                          />
                        </FormLabel>
                        <Input
                          name="alignment_6columns_yearold"
                          type="file"
                          id="file-upload-12"
                          sx={{ marginTop: '8px' }}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              Lock_alignment_6columns_yearold: e.files.value,
                            })
                          }
                        />
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
                      width: '48%',
                    }}
                  >
                    <Typography variant="h6">گزارشات و مستندات منتهی به سال 1401</Typography>
                    <Box sx={{ marginBottom: '16px' }}>
                      <FormControl fullWidth>
                        <FormLabel>
                          صورت مالی
                          <Switch
                            name="Lock_financial_report_lastyear"
                            inputProps={{ 'aria-label': 'controlled' }}
                            className="ml-4"
                            checked={localData.Lock_financial_report_lastyear}
                            onChange={(e) =>
                              setLocalData({
                                ...localData,
                                Lock_financial_report_lastyear: e.target.checked,
                              })
                            }
                          />
                        </FormLabel>
                        <Input
                          name="financial_report_lastyear"
                          type="file"
                          id="file-upload-5"
                          sx={{ marginTop: '8px' }}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              Lock_financial_report_lastyear: e.files.value,
                            })
                          }
                        />
                      </FormControl>
                    </Box>
                    <Box sx={{ marginBottom: '16px' }}>
                      <FormControl fullWidth>
                        <FormLabel>
                          گزارش حسابرسی
                          <Switch
                            name="Lock_audit_report_lastyear"
                            inputProps={{ 'aria-label': 'controlled' }}
                            className="ml-4"
                            checked={localData.Lock_audit_report_lastyear}
                            onChange={(e) =>
                              setLocalData({
                                ...localData,
                                Lock_audit_report_lastyear: e.target.checked,
                              })
                            }
                          />
                        </FormLabel>
                        <Input
                          name="audit_report_lastyear"
                          type="file"
                          id="file-upload-6"
                          sx={{ marginTop: '8px' }}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              Lock_audit_report_lastyear: e.files.value,
                            })
                          }
                        />
                      </FormControl>
                    </Box>
                    <Box sx={{ marginBottom: '16px' }}>
                      <FormControl fullWidth>
                        <FormLabel>
                          اظهارنامه
                          <Switch
                            name="Lock_statement_lastyear"
                            inputProps={{ 'aria-label': 'controlled' }}
                            className="ml-4"
                            checked={localData.Lock_statement_lastyear}
                            onChange={(e) =>
                              setLocalData({
                                ...localData,
                                Lock_statement_lastyear: e.target.checked,
                              })
                            }
                          />
                        </FormLabel>
                        <Input
                          name="statement_lastyear"
                          type="file"
                          id="file-upload-7"
                          sx={{ marginTop: '8px' }}
                          onChange={(e) =>
                            setLocalData({ ...localData, Lock_statement_lastyear: e.files.value })
                          }
                        />
                      </FormControl>
                    </Box>
                    <Box sx={{ marginBottom: '16px' }}>
                      <FormControl fullWidth>
                        <FormLabel>
                          تراز 6ستونی
                          <Switch
                            name="Lock_alignment_6columns_lastyear"
                            inputProps={{ 'aria-label': 'controlled' }}
                            className="ml-4"
                            checked={localData.Lock_alignment_6columns_lastyear}
                            onChange={(e) =>
                              setLocalData({
                                ...localData,
                                Lock_alignment_6columns_lastyear: e.target.checked,
                              })
                            }
                          />
                        </FormLabel>
                        <Input
                          name="alignment_6columns_lastyear"
                          type="file"
                          id="file-upload-8"
                          sx={{ marginTop: '8px' }}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              Lock_alignment_6columns_lastyear: e.files.value,
                            })
                          }
                        />
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
                      width: '48%',
                    }}
                  >
                    <Typography variant="h6">گزارشات و مستندات به روز</Typography>
                    <Box sx={{ marginBottom: '16px' }}>
                      <FormControl fullWidth>
                        <FormLabel>
                          تراز 6ستونی
                          <Switch
                            name="Lock_alignment_6columns_thisyear"
                            inputProps={{ 'aria-label': 'controlled' }}
                            className="ml-4"
                            checked={localData.Lock_alignment_6columns_thisyear}
                            onChange={(e) =>
                              setLocalData({
                                ...localData,
                                Lock_alignment_6columns_thisyear: e.target.checked,
                              })
                            }
                          />
                        </FormLabel>
                        <Input
                          name="alignment_6columns_thisyear"
                          type="file"
                          id="file-upload-4"
                          sx={{ marginTop: '8px' }}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              Lock_alignment_6columns_thisyear: e.files.value,
                            })
                          }
                        />
                      </FormControl>
                    </Box>
                  </Box>
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
