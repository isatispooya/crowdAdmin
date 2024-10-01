import { Box, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SubmitButton } from 'src/components/button';
import { useGetAddInfo } from '../../service/planPicture/addInfo/useGetAddInfo';
import { usePostInfo } from '../../service/planPicture/addInfo/usePostAddInfo';

const AddInfo = () => {
  const { trace_code } = useParams();
  const [rateOfReturn, setRateOfReturn] = useState(''); // State for input value

  // Fetch existing data using useGetAddInfo hook
  const { data } = useGetAddInfo(trace_code);
  const { mutate, isPending, isError } = usePostInfo(trace_code);

  // Set initial value from fetched data
  useEffect(() => {
    if (data && data.rate_of_return) {
      setRateOfReturn(data.rate_of_return); // Set the TextField value to the fetched data
    }
  }, [data]);

  const handleInputChange = (event) => {
    setRateOfReturn(event.target.value);
  };

  const handleSubmit = () => {
    if (rateOfReturn) {
      // Post the updated data to the server
      mutate({ rate_of_return: rateOfReturn });
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#e0e0e0',
          color: '#333',
          borderRadius: '16px 16px 0 0',
          padding: '16px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          افزودن اطلاعات تکمیلی
        </Typography>
      </Box>

      <TextField
      type='number'
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
          marginTop: 7,
        }}
      />

      <Box mt={2}>
        <SubmitButton mt={2} onClick={handleSubmit} disabled={isPending} />
      </Box>

      {isError && <Typography color="error">خطا در ارسال اطلاعات</Typography>}
    </>
  );
};

export default AddInfo;
