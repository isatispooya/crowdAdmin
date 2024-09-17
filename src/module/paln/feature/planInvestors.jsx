import React from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css'; 
import 'react-tabulator/css/tabulator.min.css'; 

const PlanInvestors = () => {
  const columns = [
    { title: 'نام', field: 'name', width: 250 },
    { title: 'مقدار', field: 'amount', align: 'left', width: 200 },
    { title: 'کدملی', field: 'nationalCode', width: 340 },
    { title: 'مبلغ', field: 'cost', align: 'center', width: 250 },
  ];

  const data = [
    { id: 1, name: 'رضا ترابی', amount: 29, nationalCode: '44267785432', cost: 10000000 },
    { id: 2, name: 'محسن میرزایی', amount: 35, nationalCode: '4743985643', cost: 2343555000 },
    { id: 3, name: 'مریم احدی', amount: 22, nationalCode: '5430066923', cost: 1578800 },
    { id: 4, name: 'سمانه زارع', amount: 28, nationalCode: '223311234', cost: 298500 },
  ];

  return (
    <div>
      <ReactTabulator data={data} columns={columns} layout="fitData" />
    </div>
  );
};

export default PlanInvestors;
