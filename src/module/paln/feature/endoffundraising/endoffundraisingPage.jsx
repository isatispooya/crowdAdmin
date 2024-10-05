import { Box, TextField, Typography, Paper } from '@mui/material';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SubmitButton } from 'src/components/button';
import usePostEndOfFundraising from '../../service/endoffundraising/usePostpostEndOfFundraising';

const EndOffUndraisingPage = () => {
  const [form, setForm] = useState([]);
  const { trace_code } = useParams();
  const { mutate, data: dataMut } = usePostEndOfFundraising(form, trace_code);

  useEffect(() => {
    if (dataMut) {
      setForm(dataMut);
    }
  }, [dataMut]);

  useEffect(() => {
    mutate([]);
  }, [mutate]);

  const handleChange = (id, field, value) => {
    setForm((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSend = () => {
    mutate();
    console.log(form);
  };
  console.log(form);

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 16px' }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1400px',
          padding: 3,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-700">پایان جمع آوری وجه</h1>
        </div>
        <Box sx={{ maxWidth: 800, margin: '20px auto', padding: 3 }}>
          <Paper elevation={3} sx={{ padding: 3, marginBottom: 2 }}>
            {form &&
              form.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 2,
                  }}
                >
                  <Typography sx={{ fontWeight: 'bold', marginRight: 2 }}>مبلغ چک:</Typography>
                  <TextField
                    label="مبلغ"
                    value={item.amount}
                    variant="outlined"
                    onChange={(e) => handleChange(item.id, 'amount', e.target.value)}
                    sx={{ flexGrow: 1, minWidth: '150px', marginLeft: 3 }}
                  />
                  <Typography sx={{ fontWeight: 'bold', marginRight: 2 }}>نوع چک:</Typography>
                  <TextField
                    label="نوع"
                    value={item.type}
                    variant="outlined"
                    onChange={(e) => handleChange(item.id, 'type', e.target.value)}
                    sx={{ flexGrow: 1, minWidth: '150px', marginLeft: 3 }}
                  />
                  <Typography sx={{ fontWeight: 'bold', marginLeft: 3 }}>تاریخ چک:</Typography>
                  <Box sx={{ minWidth: '150px', marginLeft: 3 }}>
                    <DatePicker
                      value={item.date}
                      onChange={(date) => handleChange(item.id, 'date', date)}
                      format="YYYY/MM/DD"
                      calendar={persian}
                      locale={persian_fa}
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
              ))}
          </Paper>
        </Box>
        <SubmitButton onClick={handleSend} />
      </Box>
    </div>
  );
};

export default EndOffUndraisingPage;
