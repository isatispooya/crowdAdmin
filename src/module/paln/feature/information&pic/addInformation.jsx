import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Switch,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { SubmitButton } from 'src/components/button';
import { useGetAddInfo } from '../../service/planPicture/addInfo/useGetAddInfo';
import { usePostInfo } from '../../service/planPicture/addInfo/usePostAddInfo';

const AddInfo = () => {
  const { trace_code } = useParams();
  const [rateOfReturn, setRateOfReturn] = useState('');
  const [statusShow, setStatusShow] = useState(false);
  const [satusSecond, setSatusSecond] = useState('');

  const { data } = useGetAddInfo(trace_code);
  const { mutate, isPending, isError } = usePostInfo(trace_code);
  
  const handleSelectChange = (event) => {
    setSatusSecond(event.target.value);
    console.log("New satusSecond:", event.target.value); 
  };
  
  useEffect(() => {
    if (data) {
      setRateOfReturn(data.rate_of_return || '');
      setStatusShow(data.status_show || false);
      setSatusSecond(data.satus_second || null);
      console.log("Initial data:", data); 
    }
  }, [data]);
  

  const handleInputChange = (event) => {
    setRateOfReturn(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setStatusShow(event.target.checked);
  };


  const handleSubmit = () => {
    if (rateOfReturn && satusSecond) {
      mutate(
        {
          rate_of_return: rateOfReturn,
          status_show: statusShow,
          satus_second:satusSecond,
        },
        {
          onSuccess: () => {
            toast.success('اطلاعات با موفقیت ثبت شد!');
          },
          onError: () => {
            toast.error('خطا در ثبت اطلاعات!');
          },
        }
      );
    }
    console.log(satusSecond);
    
  };

  return (
    <>
      <ToastContainer />
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

        <FormControl fullWidth variant="outlined" sx={{ marginBottom: '16px' }}>
          <Select value={satusSecond} onChange={handleSelectChange} displayEmpty>
            <MenuItem value="">
              <em>وضعیت طرح را انتخاب کنید</em>
            </MenuItem>
            <MenuItem value="1">شروع شده</MenuItem>
            <MenuItem value="2">جمع آوری</MenuItem>
            <MenuItem value="3">تمدید شده</MenuItem>
            <MenuItem value="4">تکمیل</MenuItem>
            <MenuItem value="5">سررسید ناموفق</MenuItem>
          </Select>
        </FormControl>

        <Box mt={2}>
          <SubmitButton onClick={handleSubmit} disabled={isPending} fullWidth>
            ثبت اطلاعات
          </SubmitButton>
        </Box>

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
