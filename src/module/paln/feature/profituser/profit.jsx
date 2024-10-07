/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { utils, writeFile } from 'xlsx';
import moment from 'moment-jalaali';
import useGetProfit from './service/useProfitGet';

const ProfitPage = () => {
  const { trace_code } = useParams();
  const { data, isLoading } = useGetProfit(trace_code);

  const formatDate = (date) => (date ? moment(date).format('jYYYY/jM/jD') : '—');
  const formatNumber = (value) => (value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '—');
  const roundValue = (value) => (value !== null ? Math.round(value).toLocaleString() : '—');

  const fields = [
    { label: 'نام و نام خانوادگی', key: 'user_name' },
    { label: 'مبلغ', key: 'value', formatter: formatNumber },
    { label: 'کاربر', key: 'user' },
    { label: 'تعداد گواهی', key: 'amount' },
    { label: 'شماره حساب', key: 'account_number' },
    { label: 'مبلغ سود اول', key: 'value1', formatter: roundValue },
    { label: 'مبلغ سود دوم', key: 'value2', formatter: roundValue },
    { label: 'مبلغ سود سوم', key: 'value3', formatter: roundValue },
    { label: 'مبلغ سود چهارم', key: 'value4', formatter: roundValue },
    { label: 'تاریخ سود اول', key: 'date1', formatter: formatDate },
    { label: 'تاریخ سود دوم', key: 'date2', formatter: formatDate },
    { label: 'تاریخ سود سوم', key: 'date3', formatter: formatDate },
    { label: 'تاریخ سود چهارم', key: 'date4', formatter: formatDate }
  ];

  const handleDownloadExcel = () => {
    if (data) {
      const worksheet = utils.json_to_sheet(
        data.map((row) =>
          fields.reduce((acc, field) => {
            acc[field.label] = field.formatter ? field.formatter(row[field.key]) : row[field.key] || '—';
            return acc;
          }, {})
        )
      );
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, 'Report');
      writeFile(workbook, 'data.xlsx');
    }
  };

  const renderedTable = useMemo(() => {
    if (!data || data.length === 0) return null;

    return (
      <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {fields.map((field) => (
                <TableCell key={field.key} align="center">
                  {field.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {fields.map((field) => (
                  <TableCell key={field.key} align="center">
                    {field.formatter ? field.formatter(row[field.key]) : row[field.key] || '—'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }, [data]);

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
          <button
            className="bg-blue-800 text-white py-1 px-2 rounded-sm flex self-start"
            id="download-excel"
            onClick={handleDownloadExcel}
          >
            دانلود فایل اکسل
          </button>

          <Typography variant="h4" fontWeight="bold">
            گزارش سود کاربران
          </Typography>
        </Box>

        {renderedTable || (
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
