import { Box, TextField, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import moment from 'moment-jalaali';
import useGetCard from '../../service/planCard/useGetCard';
import useGetPlanDetail from '../../service/plandetail/useGetPlandetail';

const Company = () => {
  const { trace_code } = useParams();
  const { data, isLoading ,error} = useGetPlanDetail(trace_code);

console.log(data.company);




  const fields = [
    { label: 'نام شرکت', value: (item) => item.name },
    { label: 'شماره ثبت', value: (item) => item.registration_number },
    { label: 'کد اقتصادی', value: (item) => item.economic_id },
    {
      label: 'تاریخ ثبت',
      value: (item) =>
        item.registration_date
          ? moment(item.registration_date).format('jYYYY/jMM/jDD')
          : 'ناموجود',
    },
    { label: 'نوع شرکت', value: (item) => item.company_type_description },
    { label: 'آدرس', value: (item) => item.address },
    { label: 'کد پستی', value: (item) => item.postal_code },
    { label: 'شماره تلفن', value: (item) => item.phone_number },
    { label: 'شماره فکس', value: (item) => item.fax_number },
    { label: 'ایمیل', value: (item) => item.email_address },
  ];

  const renderTextField = (label, value) => (
    <TextField
      label={label}
      value={value || 'اطلاعات موجود نیست'}
      fullWidth
      variant="outlined"
      InputProps={{ readOnly: true }}
      sx={{
        mb: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: 1,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#ccc',
          },
          '&:hover fieldset': {
            borderColor: '#888',
          },
        },
      }}
    />
  );

  return (
    <Box sx={{ p: 3 }}>
      {data.company.length > 0 ? (
        data.company.map((company, index) => (
          <Box
            key={index}
            mb={3}
            sx={{
              p: 2,
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              backgroundColor: '#fafafa',
            }}
          >
            <Grid container spacing={2}>
              {fields.map(({ label, value }, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  {renderTextField(label, value(company))}
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      ) : (
        <p>شرکتی یافت نشد!</p>
      )}
    </Box>
  );
};

export default Company;
