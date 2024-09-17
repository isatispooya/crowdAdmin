import React from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';

const PlanComments = () => {
  const columns = [
    { title: 'نام', field: 'name', width: 250 },
    { title: 'متن نظر', field: 'comment', width: 340 },
    {
      title: 'وضعیت',
      field: 'status',
      align: 'center',
      width: 220,
      formatter: 'tickCross',
      editor: 'select',
      editorParams: { values: { true: 'انتشار', false: 'عدم انتشار' } },
    },
    {
      title: 'نمایش نام',
      field: 'showName',
      align: 'center',
      width: 220,
      formatter: 'tickCross',
      editor: 'select',
      editorParams: { values: { true: 'نام نمایش داده شود', false: 'نام نمایش داده نشود' } },
    },
  ];

  const data = [
    { id: 1, name: 'رضا ترابی', comment: 'این یک نظر است.', status: true, showName: true },
    { id: 2, name: 'محسن میرزایی', comment: 'این نظر دیگری است.', status: false, showName: true },
    { id: 3, name: 'مریم احدی', comment: 'نظر سوم اینجا است.', status: true, showName: false },
    { id: 4, name: 'سمانه زارع', comment: 'نظر چهارم موجود است.', status: true, showName: true },
  ];

  return (
    <div>
      <ReactTabulator
        data={data}
        columns={columns}
        layout="fitData"
        options={{
          movableColumns: true,
          pagination: 'local',
          paginationSize: 10,
        }}
      />
    </div>
  );
};

export default PlanComments;
