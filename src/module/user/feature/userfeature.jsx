/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-deprecated */
import React, { useState } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator_bootstrap4.min.css';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactDOM from 'react-dom';
import UserModal from './usermodal';

const UserFeature = () => {
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
    { title: 'سن', field: 'age', align: 'left', width: 150 },
    { title: 'جنسیت', field: 'gender', width: 150 },
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
    { id: 1, name: 'علی رضایی', age: 25, gender: 'مرد', email: 'alire.doe@example.com' },
    { id: 2, name: 'رضا امیری', age: 30, gender: 'مرد', email: 'reza.smith@example.com' },
    { id: 3, name: 'نیوشا اسدی', age: 45, gender: 'زن', email: 'niw.bob@example.com' },
  ];

  return (
    <div>
      <ReactTabulator
        data={data}
        columns={columns}
        layout="fitData"
        options={{ movableRows: true }}
      />

      <UserModal selectedRow={selectedRow} handleClose={handleClose} open={open} />
    </div>
  );
};

export default UserFeature;
