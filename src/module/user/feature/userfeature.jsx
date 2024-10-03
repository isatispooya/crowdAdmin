import React, { useEffect } from 'react';
import { ReactTabulator } from 'react-tabulator';
import { useNavigate } from 'react-router-dom';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator_bootstrap4.min.css';
import useGetUser from '../services/useGetUser';

const UserFeature = () => {
  const navigate = useNavigate();
  const { data } = useGetUser();
  const userPrivatePersons = data?.map((user) => user.private_person || []).flat();

  const columns = [
    {
      title: 'نام و نام خانوادگی',
      field: 'fullName',
      width: 240,
      formatter: (cell) => {
        const { firstName, lastName } = cell.getData();
        return `${firstName || ''} ${lastName || ''}`.trim();
      },
      headerFilter: 'input',
    },
    { title: 'نام پدر', field: 'fatherName', width: 200, headerFilter: 'input' },
    { title: 'کدملی', field: 'uniqueIdentifier', width: 200, headerFilter: 'input' },
    {
      title: 'تاریخ تولد',
      field: 'birthDate',
      headerFilter: 'input',
      width: 200,
      formatter: (cell) => {
        const birthDateValue = cell.getValue();
        if (!birthDateValue) return 'تاریخ نامعتبر';
        const date = new Date(birthDateValue);
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          timeZone: 'Asia/Tehran',
        };
        return new Intl.DateTimeFormat('fa-IR', options).format(date);
      },
    },
    {
      title: 'جنسیت',
      field: 'gender',
      width: 150,
      formatter: (cell) => (cell.getValue() === 'Female' ? 'زن' : 'مرد'),
      headerFilter: 'input',
    },
    { title: 'محل تولد', field: 'placeOfBirth', width: 150, headerFilter: 'input' },
    { title: 'محل صدور', field: 'placeOfIssue', width: 150, headerFilter: 'input' },
  ];

  const handleRowClick = (e, row) => {
    const userId = row.getData().id;
    navigate(`/userDetail/${userId}`);
  };

  useEffect(() => {
    const handleWheel = (event) => {};
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div>
      <ReactTabulator
        data={userPrivatePersons}
        columns={columns}
        layout="fitDataStretch"
        options={{ movableRows: true }}
        events={{
          rowClick: handleRowClick,
        }}
      />
    </div>
  );
};

export default UserFeature;
