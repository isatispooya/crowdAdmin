import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import ContractPage from 'src/module/contract/page/contarctPage';
import useNavigateStep from 'src/hooks/use-navigate-step';
import HistoryPage from 'src/module/history/page/historyPage';
import ManagerPage from 'src/module/managers/page/managerpage';
import ManagerdocumentsPage from 'src/module/Managerdocuments/page/Managerdocuments';
import { ShareholderPage } from 'src/module/shareholder/page';
import { ValidationPage } from 'src/module/validation/page';
import { OtherCasesPage } from 'src/module/otherCases/page';
import CompanyInfoPage from 'src/module/companyInfo/page/companyInfopage';
import CardPage from 'src/module/cart/page/cartPage';

const Sterpercrowd = () => {
  const { page, changePage } = useNavigateStep();

  const steps = [
    'درخواست ها',
    ' اطلاعات درخواست',
    'مدیران',
    'مستندات مدیران',
    'سهامداران',
    'اعتبار سنجی',
    'سایر موارد',
    'سوپیشینه',
    'قرار داد عاملیت',
  ];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <CardPage />
          </div>
        );
      case 1:
        return <CompanyInfoPage />;
      case 2:
        return <ManagerPage />;
      case 3:
        return <ManagerdocumentsPage />;
      case 4:
        return <ShareholderPage />;
      case 5:
        return <ValidationPage />;
      case 6:
        return <OtherCasesPage />;
      case 7:
        return <HistoryPage />;
      case 8:
        return <ContractPage />;
      default:
        return (
          <div className="flex items-center justify-center self-center mt-8 text-lg">
            منتظر بررسی اطلاعات باشید
          </div>
        );
    }
  };
  return (
    <div>
      <Stepper sx={{ marginTop: '40px' }} activeStep={page} alternativeLabel>
        {steps.map((label, index) => (
          <Step
            key={index}
            onClick={() => changePage(index)}
            sx={{
              cursor: 'pointer',
            }}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div style={{ position: 'relative', minHeight: '300px' }}>{renderStepContent(page)}</div>

      <ToastContainer />
    </div>
  );
};

export default Sterpercrowd;
