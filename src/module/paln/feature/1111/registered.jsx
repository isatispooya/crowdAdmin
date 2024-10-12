import React from 'react';
import { useParams } from 'react-router-dom';
import useGetPlan from '../../service/Investor/useGetInvestor';

const Registere = () => {
  const { traceCode } = useParams();
  const {  error, data } = useGetPlan(traceCode);
  console.log(data);
  


  if (error) {
    return <div className="text-red-500 text-center">خطایی رخ داده است: {error.message}</div>;
  }

  const boardMembers = data?.board_member || [];

  return (
    <div className="max-w-7xl mx-auto p-2 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4 text-center">اطلاعات اعضای هیئت مدیره</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-2">نام</th>
              <th scope="col" className="px-4 py-2 hidden sm:table-cell">نام خانوادگی</th>
              <th scope="col" className="px-4 py-2">نام شرکت</th>
              <th scope="col" className="px-4 py-2">کدملی</th>
              <th scope="col" className="px-4 py-2 hidden sm:table-cell">نماینده</th>
              <th scope="col" className="px-4 py-2 hidden sm:table-cell">سمت</th>
              <th scope="col" className="px-4 py-2">شماره موبایل</th>
              <th scope="col" className="px-4 py-2 hidden sm:table-cell">ایمیل</th>
            </tr>
          </thead>
          <tbody>
            {boardMembers.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-4 py-2">{item.first_name}</td>
                <td className="px-4 py-2 hidden sm:table-cell">{item.last_name}</td>
                <td className="px-4 py-2">{item.company_name}</td>
                <td className="px-4 py-2">{item.national_id}</td>
                <td className="px-4 py-2 hidden sm:table-cell">
                  {item.is_agent_from_company ? 'نماینده شرکت' : 'شخصی'}
                </td>
                <td className="px-4 py-2 hidden sm:table-cell">{item.organization_post_description}</td>
                <td className="px-4 py-2">{item.mobile_number}</td>
                <td className="px-4 py-2 hidden sm:table-cell">{item.email_address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Registere;
