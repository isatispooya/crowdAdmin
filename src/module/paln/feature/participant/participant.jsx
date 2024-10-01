import React from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import moment from 'moment-jalaali';
import useGetParticipant from '../../service/participant/useGetParticipant';

const PlanInvestors = () => {
  const { trace_code } = useParams();
  const { data, isLoading } = useGetParticipant(trace_code);

  const formatNumber = (value) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const columns = [
    { title: 'نام و نام خانوادگی', field: 'name', width: 200 },
    { title: 'مقدار سهم', field: 'amount', align: 'left', width: 150 },
    {
      title: 'مبلغ',
      field: 'value',
      align: 'center',
      width: 100,
      formatter: (cell) => formatNumber(cell.getValue()),
    },
    {
      title: 'تاریخ ایجاد',
      field: 'create_date',
      align: 'center',
      width: 200,
      formatter: (cell) => moment(cell.getValue()).format('jYYYY/jMM/jDD'),
    },
    {
      title: 'وضعیت نام',
      field: 'name_status',
      align: 'center',
      width: 150,
      formatter(cell, row) {
        return row.name_status ? 'فعال' : 'غیر فعال';
      },
    },
    {
      title: 'وضعیت',
      field: 'status',
      align: 'center',
      width: 150,
      formatter(cell, row) {
        return row.status ? 'تایید' : 'غیر تایید';
      },
    },
    { title: 'کاربر', field: 'user', align: 'center', width: 150 },
    {
      title: 'مقدار',
      field: 'value',
      align: 'center',
      width: 150,
      formatter: (cell) => formatNumber(cell.getValue()),
    },
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
            سرمایه گذاران
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

export default PlanInvestors;
