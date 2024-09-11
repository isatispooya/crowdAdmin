import { Box, Button, FormControl, FormLabel, Input, Switch, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { OnRun } from 'src/api/OnRun';
import PropTypes from 'prop-types';

const CompanyFile = ({ setLocalData, localData, handleFileRemove }) => {
  console.log('g');

  return (
    <Box display="flex" justifyContent="center" width="100%" mt={4}>
      <div className="mt-10 ">
        <div className="bg-gray-200 text-white rounded-t-3xl p-6 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">پیوست اسناد</h1>
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
                        <FileCopyOutlinedIcon sx={{ fontSize: '16px', marginLeft: '4px' }} />
                      </Link>
                      <Button onClick={() => handleFileRemove('financial_report_lastyear')}>
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
                        <FileCopyOutlinedIcon sx={{ fontSize: '16px', marginLeft: '4px' }} />
                      </Link>
                      <Button
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
                        <FileCopyOutlinedIcon sx={{ fontSize: '16px', marginLeft: '4px' }} />
                      </Link>
                      <Button
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
                        <FileCopyOutlinedIcon sx={{ fontSize: '16px', marginLeft: '4px' }} />
                      </Link>
                      <Button
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
                        <FileCopyOutlinedIcon sx={{ fontSize: '16px', marginLeft: '4px' }} />
                      </Link>
                      <Button
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
                        <FileCopyOutlinedIcon sx={{ fontSize: '16px', marginLeft: '4px' }} />
                      </Link>
                      <Button
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
                        <FileCopyOutlinedIcon sx={{ fontSize: '16px', marginLeft: '4px' }} />
                      </Link>
                      <Button
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
                لوگو شرکت
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
                    فایل لوگو
                    <Switch
                      name="Lock_logo"
                      inputProps={{ 'aria-label': 'controlled' }}
                      sx={{ marginLeft: '8px' }}
                      checked={localData.Lock_logo}
                      onChange={(e) =>
                        setLocalData({
                          ...localData,
                          Lock_logo: e.target.checked,
                        })
                      }
                    />
                  </FormLabel>
                  {localData.logo ? (
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
                        href={`${OnRun}/${localData.logo}`}
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
                        <FileCopyOutlinedIcon sx={{ fontSize: '16px', marginLeft: '4px' }} />
                      </Link>
                      <Button
                        onClick={() =>
                          setLocalData({
                            ...localData,
                            logo: null,
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
                          logo: fileValue,
                        });
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
  );
};
CompanyFile.propTypes = {
  setLocalData: PropTypes.func,
  localData: PropTypes.object,
  handleFileRemove: PropTypes.func,
};
export default CompanyFile;
