/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-deprecated */
import React, { useState } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator_bootstrap4.min.css';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactDOM from 'react-dom';
import PaymentModal from './usermodal';

const PaymentFeature = () => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleClickOpen = (rowData) => {
    setSelectedRow(rowData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const columns = [
    { title: 'نام', field: 'name', width: 160 },
    { title: 'مبلغ پرداختی', field: 'payment', align: 'left', width: 150 },
    { title: 'وضعیت عملیات', field: 'status', width: 150 },
    { title: 'ایمیل', field: 'email', width: 235 },
    {
      title: 'عملیات',
      field: 'operations',
      width: 150,
      formatter: (cell, formatterParams, onRendered) => {
        const iconButtonContainer = document.createElement('div');
        ReactDOM.render(
          <IconButton onClick={() => handleClickOpen(cell.getRow().getData())}>
            <VisibilityIcon />
          </IconButton>,
          iconButtonContainer
        );
        return iconButtonContainer;
      },
    },
  ];

  const data = [
    { id: 1, name: 'علی رضایی', payment: 25000000, status: 'موفق', email: 'alire.doe@example.com' },
    { id: 2, name: 'رضا امیری', payment: 30000000, status: 'موفق', email: 'reza.smith@example.com' },
    { id: 3, name: 'نیوشا اسدی', payment: 44455000, status: 'ناموفق', email: 'niw.bob@example.com' },
  ];

  return (
    <div>
      <ReactTabulator
        data={data}
        columns={columns}
        layout="fitData"
        options={{ movableRows: true }}
      />

      <PaymentModal selectedRow={selectedRow} handleClose={handleClose} open={open} />
    </div>
  );
};

export default PaymentFeature;
