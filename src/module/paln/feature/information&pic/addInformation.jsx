import {
  Box,
  Menu,
  MenuItem,
  TextField,
  Typography,
  Button,
  Switch,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SubmitButton } from 'src/components/button';
import { useGetAddInfo } from '../../service/planPicture/addInfo/useGetAddInfo';
import { usePostInfo } from '../../service/planPicture/addInfo/usePostAddInfo';

const AddInfo = () => {
  const { trace_code } = useParams();
  const [rateOfReturn, setRateOfReturn] = useState('');
  const [statusShow, setStatusShow] = useState(false);
  const [statusSecond, setStatusSecond] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const { data } = useGetAddInfo(trace_code);
  const { mutate, isPending, isError } = usePostInfo(trace_code);

  useEffect(() => {
    if (data) {
      setRateOfReturn(data.rate_of_return || '');
      setStatusShow(data.status_show || false);
      setStatusSecond(data.status_second || null);
    }
  }, [data]);

  const handleInputChange = (event) => {
    setRateOfReturn(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setStatusShow(event.target.checked);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value) => {
    setStatusSecond(value);
    handleMenuClose();
  };

  const handleSubmit = () => {
    if (rateOfReturn && statusSecond !== null) {
      mutate({
        rate_of_return: rateOfReturn,
        status_show: statusShow,
        status_second: statusSecond, // This is sent as a string
      });
    }
  };

  return (
    <>
      {/* Header Box */}
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          color: '#333',
          borderRadius: '16px 16px 0 0',
          padding: '24px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          افزودن اطلاعات تکمیلی
        </Typography>
      </Box>

      {/* Input for Rate of Return */}
      <Box sx={{ padding: '24px' }}>
        <TextField
          type="number"
          fullWidth
          label="نرخ بازدهی"
          variant="outlined"
          value={rateOfReturn}
          onChange={handleInputChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'gray',
              },
            },
            marginBottom: '16px',
          }}
        />

        {/* Publication Status Switch */}
        <FormControl component="fieldset" variant="standard" sx={{ marginBottom: '24px' }}>
          <FormLabel component="legend" sx={{ marginBottom: '8px' }}>
            انتشار طرح
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={statusShow} onChange={handleSwitchChange} />}
              label="انتشار و عدم انتشار"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '14px',
                  color: '#555',
                },
              }}
            />
          </FormGroup>
        </FormControl>

        {/* Button for Plan Status */}
        <Button
          onClick={handleMenuClick}
          sx={{
            marginBottom: '16px',
            backgroundColor: '#1976d2',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
            width: '100%',
          }}
          variant="contained"
        >
          وضعیت طرح
        </Button>

        {/* Dropdown Menu for Plan Status */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => handleMenuItemClick('1')}>شروع شده</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('2')}>جمع آوری</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('3')}>تمدید شده</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('4')}>تکمیل</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('5')}>سررسید ناموفق</MenuItem>
        </Menu>

        {/* Submit Button */}
        <Box mt={2}>
          <SubmitButton onClick={handleSubmit} disabled={isPending} fullWidth>
            ثبت اطلاعات
          </SubmitButton>
        </Box>

        {/* Error Message */}
        {isError && (
          <Typography color="error" sx={{ marginTop: '16px', textAlign: 'center' }}>
            خطا در ارسال اطلاعات
          </Typography>
        )}
      </Box>
    </>
  );
};

export default AddInfo;
