/* eslint-disable no-nested-ternary */
import React from 'react';
import { useParams } from 'react-router-dom';
import useGetPlan from '../../service/Investor/useGetInvestor';

const PlanShareholders = () => {
  const { traceCode } = useParams();
  const {  error, data } = useGetPlan(traceCode);


  if (error) {
    return <div className="text-red-500 text-center">خطایی رخ داده است: {error.message}</div>;
  }

  const shareholders = data?.shareholder || [];

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4 text-center">اطلاعات سهامداران</h1>

      <table className="min-w-full text-center text-sm  rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">نام شخص/نام شرکت</th>
            <th scope="col" className="px-6 py-3 hidden sm:table-cell">نام خانوادگی شخص/نام مدیر عامل شرکت</th>
            <th scope="col" className="px-6 py-3">درصد سهام</th>
            <th scope="col" className="px-6 py-3">کدملی</th>
            <th scope="col" className="px-6 py-3">نوع سهام</th>
          </tr>
        </thead>
        <tbody>
          {shareholders.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b text-center dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{item.first_name}</td>
              <td className="px-6 py-4 hidden sm:table-cell">{item.last_name}</td>
              <td className="px-6 py-4">%{item.share_percent}</td>
              <td className="px-6 py-4">{item.national_id}</td>
              <td className="px-6 py-4">
                {item.shareholder_type=== 2 ? 'حقوقی' : item.shareholder_type === 1 ? 'حقیقی' : 'نامشخص'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanShareholders;
