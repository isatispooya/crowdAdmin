/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment-jalaali';

// داده نمونه برای تست
const sampleData = [
  {
    company: [
      {
        id: 1,
        national_id: 14012629425,
        name: "آتیه سازان کویر یزدان",
        company_type_description: "شركت سهامي خاص",
        registration_date: "2023-10-09T00:00:00",
        registration_number: "23463",
        economic_id: "14012629425",
        address: "استان يزد، شهرستان يزد، بخش مركزي، دهستان فجر، ...",
        postal_code: "8914160043",
        phone_number: "03535236644",
        fax_number: "03535262637",
        email_address: "info@isatispooya.com",
      },
    ],
  },
];

// تابع اصلی کامپوننت
const ApplicantCompany = () => {
  const { traceCode } = useParams(); // دریافت traceCode از پارامتر URL

  // شبیه‌سازی گرفتن داده بر اساس traceCode (در حالت واقعی از هوک fetch استفاده کنید)
  const data = sampleData.find((item) =>
    item.company.some((comp) => comp.id.toString() === traceCode)
  );

  if (!data) {
    return <div className="text-center">اطلاعاتی یافت نشد.</div>;
  }

  const company = data.company[0];

  // تبدیل تاریخ به شمسی
  const registrationDateShamsi = moment(
    company.registration_date,
    'YYYY-MM-DD'
  ).format('jYYYY/jMM/jDD');

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        اطلاعات شرکت متقاضی
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        <InfoBox title="نام شرکت" value={company.name} />
        <InfoBox title="نوع شرکت" value={company.company_type_description} />
        <InfoBox title="شماره ثبت" value={company.registration_number} />
        <InfoBox title="کد ملی" value={company.national_id} />
        <InfoBox title="کد اقتصادی" value={company.economic_id} />
        <InfoBox title="تاریخ ثبت" value={registrationDateShamsi} />
        <InfoBox title="کد پستی" value={company.postal_code} />
        <InfoBox title="تلفن" value={company.phone_number} />
        <InfoBox title="فکس" value={company.fax_number} />
        <InfoBox title="نشانی" value={company.address} />
        <InfoBox title="ایمیل" value={company.email_address} />
      </div>
    </div>
  );
};

// کامپوننت InfoBox برای نمایش اطلاعات هر بخش
const InfoBox = ({ title, value }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow">
    <h2 className="font-semibold text-gray-700 mb-2">{title}</h2>
    <p className="text-gray-600">{value || 'ناموجود'}</p>
  </div>
);

export default ApplicantCompany;
