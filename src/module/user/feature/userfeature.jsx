/* eslint-disable react/no-deprecated */

import React, { useState } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator_bootstrap4.min.css';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import UserModal from './usermodal';

const UserFeature = ({ data }) => {
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
    {
      title: 'نام و نام خانوادگی',
      field: 'fullName',
      width: 250,
      formatter: (cell) => {
        const { firstName, lastName } = cell.getData();
        return firstName && lastName ? `${firstName} ${lastName}` : '';
      },
    },
    { title: 'کدملی', field: 'uniqueIdentifier', width: 160 },
    { title: 'تاریخ تولد', field: 'birthDate', width: 160 },
    { title: 'جنسیت', field: 'gender', width: 150 },
    { title: 'محل تولد', field: 'placeOfBirth', width: 160 },
    { title: 'محل صدور', field: 'placeOfIssue', width: 160 },
    {
      title: 'عملیات',
      field: 'operations',
      width: 150,
      formatter: (cell) => {
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

      <UserModal selectedRow={selectedRow} handleClose={handleClose} open={open} />
    </div>
  );
};

UserFeature.propTypes = {
  data: PropTypes.array.isRequired,
};

export default UserFeature;
