import { useState, useEffect } from 'react';
import { Box, TextField, Typography, Paper, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useFetchDocumentation } from '../hooks/useDocumentation';

const EndOffUndraisingFeature = () => {
  const { id } = useParams();
  const { data: formData, isLoading, error, postDate, updateData } = useFetchDocumentation(id);
  const [jalaliDate, setJalaliDate] = useState(null);

  useEffect(() => {
    if (formData?.data?.length > 0) {
      const jalaliDate1 = formData.data[0].date_jalali;

      setJalaliDate(jalaliDate1);
    }
  }, [formData]);

  const handleChange = (newDate) => {
    setJalaliDate(newDate);
  };

  const handleUpdate = async () => {
    try {
      await postDate(jalaliDate);
      await updateData(formData);
      console.log('تاریخ با موفقیت بروزرسانی شد');
    } catch (err) {
      console.error('خطا در بروزرسانی تاریخ:', err);
    }
  };

  if (isLoading) {
    return <Typography>در حال بارگذاری...</Typography>;
  }

  if (error) {
    return <Typography>خطایی رخ داده است</Typography>;
  }
  console.log(jalaliDate, 'جلیل');

  return (
    <Box sx={{ maxWidth: 800, margin: '20px auto', padding: 3 }}>
      {formData?.data?.map((item, index) => (
        <Paper key={index} elevation={3} sx={{ padding: 3, marginBottom: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 2,
              flexDirection: 'row',
            }}
          >
            <Typography sx={{ fontWeight: 'bold', marginRight: 2 }}>مبلغ چک:</Typography>
            <TextField
              label="مبلغ"
              value={item.amount || ''}
              sx={{ flexGrow: 1, minWidth: '150px', marginLeft: 3 }}
              variant="outlined"
            />

            <Typography sx={{ fontWeight: 'bold', marginLeft: 3 }}>تاریخ چک:</Typography>
            <Box sx={{ minWidth: '150px', marginLeft: 3 }}>
              <DatePicker
                format="YYYY/MM/DD"
                calendar={persian}
                locale={persian_fa}
                value={jalaliDate}
                onChange={handleChange}
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '10px',
                  borderRadius: '5px',
                  borderColor: '#ccc',
                }}
              />
            </Box>
          </Box>
        </Paper>
      ))}

      <Button variant="contained" color="primary" onClick={handleUpdate}>
        بروزرسانی
      </Button>
    </Box>
  );
};

export default EndOffUndraisingFeature;
