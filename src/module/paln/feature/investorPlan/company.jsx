import { Box, TextField, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import moment from 'moment-jalaali';
import useGetCard from '../../service/planCard/useGetCard';

const Company = () => {
  const { userId } = useParams();
  const { data, isLoading, error } = useGetCard(userId);

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطایی رخ داده است!</p>;

  const companyInfo = data?.company?.[0] || {};

  console.log();
  

  const fields = [
    { label: 'نام شرکت', value: companyInfo.name },
    { label: 'شماره ثبت', value: companyInfo.registration_number },
    { label: 'کد اقتصادی', value: companyInfo.economic_id },
    { label: 'تاریخ ثبت', value: moment(companyInfo.registration_date).format('jYYYY/jMM/jDD') },
    { label: 'نوع شرکت', value: companyInfo.company_type_description },
    { label: 'آدرس', value: companyInfo.address },
    { label: 'کد پستی', value: companyInfo.postal_code },
    { label: 'شماره تلفن', value: companyInfo.phone_number },
    { label: 'شماره فکس', value: companyInfo.fax_number },
    { label: 'ایمیل', value: companyInfo.email_address },
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
      <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1, backgroundColor: '#fafafa' }}>
        <Grid container spacing={2}>
          {fields.map(({ label, value }, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              {renderTextField(label, value)}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Company;
