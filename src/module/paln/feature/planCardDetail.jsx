import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import useGetPlanDetail from '../service/plandetail/useGetPlandetail';

const PlanDetail = () => {
  const { id } = useParams();
  const { data } = useGetPlanDetail(id);
  console.log(data.length);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1400px',
        padding: 3,
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          backgroundColor: '#e0e0e0',
          color: '#333',
          borderRadius: '16px 16px 0 0',
          padding: '16px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          اطلاعات طرح
        </Typography>
      </div>
      <Box
        sx={{
          padding: 2,
          textAlign: 'center',
        }}
      >
      
        {data ? (
          <>
          <Typography variant="h6">تاریخ ایجاد: {data['Creation Date']}</Typography>
          <Typography variant="h6">نام فارسی: {data['Persian Name']}</Typography>
          <Typography variant="h6">نام فارسی پیشنهادی: {data['Persian Suggested Symbol']}</Typography>



            <Typography variant="h6">تاریخ شروع پروژه: {data['Persian Project Start Date']}</Typography>
            <Typography variant="h6">تاریخ پایان پروژه: {data['Persian Project End Date']}</Typography>
            <Typography variant="h6">وضعیت پروژه: {data['Project Status Description']}</Typography>
            <Typography variant="h6">حداقل قیمت حقیقی: {data['Real Person Minimum Availabe Price']}</Typography>
            <Typography variant="h6">حداکثر قیمت حقوقی: {data['Legal Person Maximum Availabe Price']}</Typography>
            <Typography variant="h6">تعداد کل واحدها: {data['Total Units']}</Typography>
            <Typography variant="h6">قیمت واحد: {data['Unit Price']}</Typography>
            <Typography variant="h6">نوع جمع‌آوری سرمایه: {data['Crowd Funding Type Description']}</Typography>
            <Typography variant="h6">توضیحات تسویه: {data['Settlement Description']}</Typography>
            <Typography variant="h6">تاریخ ایجاد: {data['Persian Creation Date']}</Typography>
            <Typography variant="h6">تاریخ شروع تأسیس: {data['Persian Suggested Underwiring Start Date']}</Typography>
            <Typography variant="h6">تاریخ پایان تأسیس: {data['Persian Suggested Underwriting End Date']}</Typography>
            <Typography variant="h6">تعداد تأمین‌کنندگان مالی: {data['Number of Finance Provider']}</Typography>
            <Typography variant="h6">توضیحات صنعت: {data['Industry Group Description']}</Typography>
            <Typography variant="h6">تعداد سهام‌داران بزرگ: {data['List Of Project Big Share Holders']?.length || 0}</Typography>
            <Typography variant="h6">تعداد اعضای هیئت مدیره: {data['List Of Project Board Members']?.length || 0}</Typography>
            <Typography variant="h6">تاریخ شروع تأمین مالی: {data['Approved Underwriting Start Date']}</Typography>
            <Typography variant="h6">تاریخ پایان تأمین مالی: {data['Approved Underwriting End Date']}</Typography>
            <Typography variant="h6">نوع تأمین مالی: {data['Crowd Funding Type ID']}</Typography>
            <Typography variant="h6">حداقل قیمت قانونی: {data['Legal Person Minimum Availabe Price']}</Typography>
            <Typography variant="h6">حداکثر قیمت واقعی: {data['Real Person Maximum Available Price']}</Typography>
            <Typography variant="h6">کل قیمت: {data['Total Price']}</Typography>
            <Typography variant="h6">مدت زمان تأمین مالی: {data['Underwriting Duration']}</Typography>
            <Typography variant="h6">شماره پیگیری: {data['Trace Code']}</Typography>
            <Typography variant="h6"> تعداد واحدهای شرکت: {data['Trace Code']}</Typography>

          </>
        ) : (
          <Typography>اطلاعاتی موجود نیست.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default PlanDetail;
