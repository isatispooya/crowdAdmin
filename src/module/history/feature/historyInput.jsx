import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import PropTypes from 'prop-types';
import GlobalTextField from 'src/components/fild/textfiled';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { OnRun } from 'src/api/OnRun';

const HistoryInput = ({
  handleTextFieldChange,
  item,
  index,
  handleRemoveFile,
  setFormData,
}) => {
  const handleDateChange = (date) => {
    const jsDate = date && typeof date.toDate === 'function' ? date.toDate() : null;
    const updatedItem = { ...item, date: jsDate ? jsDate.toISOString() : null };

    setFormData((prevData) => {
      const newData = [...prevData];
      newData[index] = updatedItem;
      return newData;
    });
  };

  return (
    <Box sx={{ mb: 3, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <GlobalTextField
            label="نام و نام خانوادگی"
            value={item.name}
            onChange={handleTextFieldChange(index, 'name')}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <GlobalTextField
            label="کد ملی"
            value={item.national_code}
            onChange={handleTextFieldChange(index, 'national_code')}
            inputProps={{ maxLength: 10 }}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#ffffff',
                borderRadius: '4px',
                border: '1px solid #ccc',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <DatePicker
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                }}
                value={item.date ? new Date(item.date) : null}
                onChange={handleDateChange}
                calendar={persian}
                locale={persian_fa}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          {typeof item.file === 'string' && item.file && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#f7f7f7',
                  padding: '10px',
                  borderRadius: '8px',
                  boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <a
                  href={`${OnRun}/${item.file}`}
                  target="_blank"
                  style={{
                    fontSize: '14px',
                    fontWeight: 'medium',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                  }} rel="noreferrer"
                >
                  دریافت فایل سوء پیشینه
                  <FileCopyOutlinedIcon style={{ fontSize: '16px', marginLeft: '8px' }} />
                </a>
                <Button
                  size="small"
                  onClick={handleRemoveFile(index)}
                  sx={{
                    height: 'auto',
                    ml: '10px',
                    '&:hover': {
                      backgroundColor: '#e0e0e0',
                    },
                  }}
                >
                  حذف
                </Button>
              </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

HistoryInput.propTypes = {
  handleTextFieldChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  handleRemoveFile: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default HistoryInput;
