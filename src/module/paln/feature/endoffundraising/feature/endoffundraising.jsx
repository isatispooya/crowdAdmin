import { Box, TextField, Typography, Paper, Grid } from '@mui/material';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SubmitButton } from 'src/components/button';
import usePostEndOfFundraising from '../../../service/endoffundraising/usePostpostEndOfFundraising';
import { convertToEnglishDigits } from '../utils/convertToEN';
import useGetEndOfFundraising from '../../../service/endoffundraising/useGetEndOfFundraising';



const EndOffUndraisingPage = () => {
  const [form, setForm] = useState([]);
  const { trace_code } = useParams();

  const { mutate, data: dataMut } = usePostEndOfFundraising(form, trace_code);
  const { data } = useGetEndOfFundraising(trace_code);

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  useEffect(() => {
    if (dataMut) {
      setForm(dataMut);
    }
  }, [dataMut]);

  const handleChange = (id, field, value) => {
    setForm((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Handle form submission
  const handleSend = () => {
    mutate(form);
  };

  return (
    <div className="flex justify-center items-center p-4">
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px',
          p: 3,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box className="bg-gray-100 text-center py-4 rounded-t-lg">
          <Typography variant="h5" component="h1" className="text-gray-700 font-bold">
            پایان جمع آوری وجه
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          {form &&
            form.map((item) => (
              <Paper
                key={item.id}
                elevation={3}
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: '12px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      مبلغ چک:
                    </Typography>
                    <TextField
                      fullWidth
                      label="مبلغ"
                      value={item.amount}
                      variant="outlined"
                      onChange={(e) => handleChange(item.id, 'amount', parseFloat(e.target.value))} // Parse to number
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      اصل و سود:
                    </Typography>
                    <TextField
                      fullWidth
                      disabled
                      label="نوع"
                      value={item.type}
                      variant="outlined"
                      onChange={(e) => handleChange(item.id, 'type', e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      تاریخ چک:
                    </Typography>
                    <DatePicker
                      value={item.date}
                      onChange={(date) => {
                        if (date && date.format) {
                          const formattedDate = convertToEnglishDigits(date.format('YYYY-MM-DD'));
                          handleChange(item.id, 'date', formattedDate);
                        } else {
                          console.error('Invalid date object');
                        }
                      }}
                      format="YYYY/MM/DD"
                      calendar={persian}
                      locale={persian_fa}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        borderColor: '#ccc',
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      تاریخ سود:
                    </Typography>
                    <DatePicker
                      value={item.date_capitalization}
                      onChange={(date) => {
                        const formattedDate = convertToEnglishDigits(date.format('YYYY-MM-DD'));
                        handleChange(item.id, 'date_capitalization', formattedDate);
                      }}
                      format="YYYY/MM/DD"
                      calendar={persian}
                      locale={persian_fa}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        borderColor: '#ccc',
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
        </Box>
        <SubmitButton onClick={handleSend} sx={{ mt: 3 }} />
      </Box>
    </div>
  );
};




export default EndOffUndraisingPage;