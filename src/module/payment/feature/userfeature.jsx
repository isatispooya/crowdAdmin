/* eslint-disable react/no-deprecated */

import React, { useState } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator_bootstrap4.min.css';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PaymentModal from './usermodal';

const PaymentFeature = ({ data }) => {
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
    { title: 'شناسه', field: 'id', width: 80 },
    {
      title: 'تاریخ تراکنش',
      field: 'transaction_date',
      width: 200,
      formatter: (cell) => new Date(cell.getValue()).toLocaleString(),
    },
    { title: 'مبلغ اعتبار', field: 'credit_amount', align: 'left', width: 150 },
    { title: 'مبلغ بدهی', field: 'debt_amount', width: 150 },
    {
      title: 'وضعیت',
      field: 'status',
      width: 100,
      formatter: (cell) => (cell.getValue() ? 'موفق' : 'ناموفق'),
    },
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

PaymentFeature.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PaymentFeature;
