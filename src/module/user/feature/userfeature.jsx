/* eslint-disable react/no-deprecated */
import React, { useState } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator_bootstrap4.min.css';
import UserModal from './usermodal';
import useGetUser from '../services/useGetUser';

const UserFeature = () => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { data } = useGetUser();

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
      width: 240,
      formatter: (cell) => {
        const { firstName, lastName } = cell.getData();
        return firstName && lastName ? `${firstName} ${lastName}` : '';
      },
      headerFilter: 'input',
    },
    { title: 'کدملی', field: 'uniqueIdentifier', width: 200, headerFilter: 'input' },
    {
      title: 'تاریخ تولد',
      field: 'birthDate',
      headerFilter: 'input',
      width: 200,
      formatter: (cell) => {
        const date = new Date(cell.getValue());
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZone: 'Asia/Tehran',
        };

        return new Intl.DateTimeFormat('fa-IR', options).format(date);
      },
    },
    {
      title: 'جنسیت',
      field: 'gender',
      width: 150,
      formatter: (cell) => {
        console.log(data);

        return cell.getValue() === 'Female' ? 'زن' : 'مرد';
      },
      headerFilter: 'input',
    },
    { title: 'محل تولد', field: 'placeOfBirth', width: 150, headerFilter: 'input' },
    { title: 'محل صدور', field: 'placeOfIssue', width: 150, headerFilter: 'input' },
  ];

  return (
    <div>
      <ReactTabulator
        data={data}
        columns={columns}
        layout="fitDataStretch"
        options={{ movableRows: true }}
        events={{
          rowClick: (e, row) => {
            handleClickOpen(row.getData());
          },
        }}
      />
ّ
      <UserModal selectedRow={selectedRow} handleClose={handleClose} open={open} />
    </div>
  );
};

export default UserFeature;
