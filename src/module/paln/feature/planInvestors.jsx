import React from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { fetchPlanInvestors } from '../service/detailplan/PlanInvestorsService';

const PlanInvestors = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ['planDocument', id],
    queryFn: () => fetchPlanInvestors(id),
  });

  const formatNumber = (value) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const columns = [
    {
      title: 'نام و نام خانوادگی',
      field: 'fullName',
      width: 450,
      formatter: (cell) => {
        const { firstName, lastName } = cell.getData();
        return firstName && lastName ? `${firstName.trim()} ${lastName.trim()}` : '';
      },
    },
    { title: 'مقدار', field: 'amount', align: 'left', width: 450 },
    { title: 'مبلغ', field: 'total_amount', align: 'center', width: 300, formatter: (cell) => formatNumber(cell.getValue()) },
  ];

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
        <ReactTabulator data={data} columns={columns} layout="fitData" />
      </Box>
    </div>
  );
};

export default PlanInvestors;
