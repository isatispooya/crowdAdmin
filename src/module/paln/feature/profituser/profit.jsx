import React from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import useGetProfit from './service/useProfitGet';

const ProfitPage = () => {
  const { trace_code } = useParams();
  const { data, isLoading } = useGetProfit(trace_code);
  console.log('داده‌ها', data);

  const formatNumber = (value) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const columns = [
    { title: 'نام و نام خانوادگی', field: 'name', width: 200 },
    {
      title: 'مبلغ',
      field: 'value',
      align: 'center',
      width: 150,
      formatter: (cell) => formatNumber(cell.getValue()),
    },
    { title: 'کاربر', field: 'user', align: 'center', width: 200 },
    { title: 'تعداد گواهی', field: 'amount', align: 'center', width: 150 },
  ];

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Box sx={{ padding: 3 }}>
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
            گزارش سود کاربران
          </Typography>
        </Box>
        {data && data.length > 0 ? (
          <ReactTabulator data={data} columns={columns} layout="fitData" />
        ) : (
          <Box
            sx={{
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              mt: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              اطلاعاتی جهت نمایش وجود ندارد !
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default ProfitPage;
