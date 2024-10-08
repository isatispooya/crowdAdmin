import React, { useState, useEffect } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, Switch, FormControlLabel } from '@mui/material';
import moment from 'moment-jalaali';
import useGetParticipant from '../../service/participant/useGetParticipant';
import usePostParticipant from '../../service/participant/usePostParticipant';

const PlanInvestors = () => {
  const { trace_code } = useParams();
  const { data, isLoading, refetch } = useGetParticipant(trace_code);
  
  const { mutate } = usePostParticipant(trace_code);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [statusSwitch, setStatusSwitch] = useState(false);
  const [localData, setLocalData] = useState([]); 

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  const formatNumber = (value) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleStatusClick = (row) => {
    setSelectedRow(row);
    setStatusSwitch(row.status);
    setOpenDialog(true);
  };

  const handleConfirm = () => {
    if (selectedRow) {
      const updatedRow = {
        ...selectedRow,
        status: statusSwitch,
      };

      const updatedData = localData.map(row => 
        row.id === updatedRow.id ? updatedRow : row
      );
      
      setLocalData(updatedData);

      mutate({
        status: statusSwitch,
        id: updatedRow.id,
      }, {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          console.error('خطا در به‌روزرسانی وضعیت:', error);
        }
      });
    }
    setOpenDialog(false);
  };

  const columns = [
    { title: 'نام و نام خانوادگی', field: 'fulname', width: 200 },
    { title: 'مقدار سهم', field: 'amount', hozAlign: 'left', width: 150 },
    {
      title: 'مبلغ',
      field: 'value',
      hozAlign: 'center',
      width: 100,
      formatter: (cell) => formatNumber(cell.getValue()),
    },
    {
      title: 'تاریخ ایجاد',
      field: 'create_date',
      hozAlign: 'center',
      width: 200,
      formatter: (cell) => moment(cell.getValue()).format('jYYYY/jMM/jDD'),
    },
    {
      title: 'وضعیت نام',
      field: 'name_status',
      hozAlign: 'center',
      width: 150,
      formatter: (row) => (row.getData().name_status ? 'فعال' : 'غیر فعال'),
    },
    {
      title: 'وضعیت',
      field: 'status',
      hozAlign: 'center',
      width: 150,
      formatter: (row) => (row.getData().status ? 'تایید' : 'غیر تایید'),
      cellClick: (e, cell) => handleStatusClick(cell.getData()),
    },
    { title: 'کاربر', field: 'user', hozAlign: 'center', width: 150 },
    {
      title: 'مقدار',
      field: 'value',
      hozAlign: 'center',
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
        {localData && localData.length > 0 ? (
          <ReactTabulator data={localData} columns={columns} layout="fitData" />
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

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>تغییر وضعیت</DialogTitle>
          <DialogContent>
            <FormControlLabel
              control={
                <Switch
                  checked={statusSwitch}
                  onChange={(e) => setStatusSwitch(e.target.checked)}
                />
              }
              label={statusSwitch ? 'تایید' : 'غیر تایید'}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirm} color="primary">
              تایید
            </Button>
            <Button onClick={() => setOpenDialog(false)} color="secondary">
              لغو
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default PlanInvestors;
