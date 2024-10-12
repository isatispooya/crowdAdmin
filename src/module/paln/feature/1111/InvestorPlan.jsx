import { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Registere from './registered';
import PlanShareholders from './planShareholders';
import ApplicantCompany from './applicantCompany';

const InvestorPlan = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleOpen = (accordionId) => {
    setOpenAccordion((prev) => (prev === accordionId ? null : accordionId));
  };

  const renderComponents = [
    {
      label: 'اطلاعات ثبتی شرکت متقاضی',
      component: <ApplicantCompany /> || 'اطلاعاتی ثبتی شرکت متقاضی',
    },
    {
      label: 'اطلاعات سهام داران بالای 10درصد',
      component: <PlanShareholders /> || 'اطلاعات سهام دارن بالای 10 درصد',
    },
    {
      label: 'اطلاعات مدیر عامل و اعضای هیئت مدیره',
      component: <Registere /> || 'اطلاعات مدیرعامل و اعضای هیئت مدیره',
    },
  ];

  return (
    <div id="accordion-flush" className="shadow-lg rounded-lg items-center  overflow-hidden max-w-7xl mx-auto p-4">
      {renderComponents.map((item, index) => (
        <div key={index} className="mb-4 text-center">
          <button
            type="button"
            className="flex text-center items-center justify-between w-full py-4 px-6 font-semibold rtl:text-right text-gray-900 bg-gray-100 border-b border-gray-300 hover:bg-gray-300 transition-all duration-300"
            onClick={() => handleOpen(index)}
            aria-expanded={openAccordion === index}
          >
            <span>{item.label}</span>
            <RiArrowDropDownLine/>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out bg-white ${
              openAccordion === index ? 'max-h-screen py-4 px-6' : 'max-h-0'
            }`}
          >
            {item.component}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvestorPlan;
