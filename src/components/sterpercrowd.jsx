import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import ContractPage from 'src/module/contract/page';
import useNavigateStep from 'src/hooks/use-navigate-step';
import CardList from './ListCard';
import Fildemnager from './fildemaneger';
import Shareholder from './shareholder';
import Resume from './resume';
import OtherCases from './OtherCases';
import Validation from './validation';
import History from './history';
import FormCompanyInfo from './formCompanyInfo';

const Sterpercrowd = () => {
  const { page, changePage } = useNavigateStep();

  const steps = [
    'انتخاب کارت ',
    'اطلاعات شرکت',
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
            <CardList/>
          </div>
        );
      case 1:
        return <FormCompanyInfo />;
      case 2:
        return <Fildemnager/>;
      case 3:
        return <Resume/>;
      case 4:
        return <Shareholder/>;
      case 5:
        return <Validation/>;
      case 6:
        return <OtherCases/>;
      case 7:
        return <History/>;
      case 8:
        return <ContractPage/>;
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
