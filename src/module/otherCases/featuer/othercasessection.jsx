import React, { useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Switch } from '@mui/material';
import PropTypes from 'prop-types';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { OnRun } from 'src/api/OnRun';

const MainForm = ({ localData = {}, setLocalData, handleFileRemove, initialData }) => {
  const fields = [
    { label: 'وضعیت دعاوی', key: 'claims_status' },
    { label: 'آخرین لیست بیمه کارکنان', key: 'latest_insurance_staf' },
    { label: 'لیست دارایی‌ها و بدهی‌ها', key: 'assets_and_liabilities' },
    { label: 'اساسنامه', key: 'statutes' },
    { label: 'فایل گردش حساب‌های بانکی اصلی شرکت', key: 'bank_account_turnover' },
    { label: 'آگهی آخرین تغییرات سرمایه‌ای', key: 'announcement_of_changes_capital' },
    { label: 'آگهی آخرین تغییرات مدیران', key: 'announcement_of_changes_managers' },
  ];

  useEffect(() => {
    setLocalData(initialData);
  }, [initialData, setLocalData]);

  const handleSwitchChange = (key) => (e) => {
    const newValue = e.target.checked;
    setLocalData((prevData) => ({
      ...prevData,
      [`lock_${key}`]: newValue,
    }));
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid #ccc',
      }}
    >
      {fields.map(({ label, key }) => (
        <Box key={key} sx={{ marginBottom: '16px' }}>
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
              {label}
              <Switch
                name={`lock_${key}`}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{ marginLeft: '8px' }}
                checked={localData[`lock_${key}`] || false}
                onChange={handleSwitchChange(key)}
              />
            </FormLabel>
            {localData[key] ? (
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
                <a
                  href={`${OnRun}/${localData[key]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '14px',
                    fontWeight: 'medium',
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': {
                      color: '#d32f2f',
                    },
                  }}
                >
                  مشاهده فایل بارگذاری شده
                  <FileCopyOutlinedIcon sx={{ fontSize: '16px', marginLeft: '4px' }} />
                </a>
                <Button onClick={() => handleFileRemove(key)}>حذف فایل</Button>
              </Box>
            ) : (
              <Input
                name={key}
                type="file"
                id={`file-upload-${key}`}
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
                  setLocalData((prevData) => ({ ...prevData, [key]: file }));
                }}
              />
            )}
          </FormControl>
        </Box>
      ))}
    </Box>
  );
};

MainForm.propTypes = {
  localData: PropTypes.object.isRequired,
  setLocalData: PropTypes.func.isRequired,
  handleFileRemove: PropTypes.func.isRequired,
  initialData: PropTypes.object.isRequired,
};

export default MainForm;
