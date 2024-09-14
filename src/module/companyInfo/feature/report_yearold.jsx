import { Box, Button, FormControl, FormLabel, Input, Switch, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { OnRun } from 'src/api/OnRun';
import PropTypes from 'prop-types';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';

const ReportYaerOld = ({ setLocalData, localData, handleFileRemove }) => (
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

            <Button onClick={() => handleFileRemove('financial_report_yearold')}>حذف فایل</Button>
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
);
ReportYaerOld.propTypes = {
  localData: PropTypes.object,
  setLocalData: PropTypes.func,
  handleFileRemove: PropTypes.func,
};

export default ReportYaerOld;
