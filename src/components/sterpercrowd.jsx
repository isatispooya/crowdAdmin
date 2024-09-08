import React, { useState } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import CardList from './ListCard';
import Fildemnager from './fildemaneger';
import Shareholder from './shareholder';
import Resume from './resume';
import OtherCases from './OtherCases';
import Validation from './validation';
import History from './history';
import FormCompanyInfo from './formCompanyInfo';

const Sterpercrowd = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [cardSelected, setCardSelected] = useState(null);

  const steps = [
    'انتخاب کارت ',
    'ویرایش و مشاهده کارت',
    'مدیران',
    'مستندات مدیران',
    'سهامداران',
    'اعتبار سنجی',
    'سایر موارد',
    'سوپیشینه',
  ];

  const handleNext = () => {
    if (activeStep === 1) {
      const checkedContracts = JSON.parse(localStorage.getItem('checkedContracts')) || {};
      const allChecked = Object.values(checkedContracts).every(Boolean);

      if (!allChecked) {
        toast.error('لطفاً همه قراردادها را مطالعه کنید.');
        return;
      }
    }

    if (activeStep === steps.length - 1) {
      alert('اتمام');
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };


  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <CardList
              setCardSelected={setCardSelected}
              cardSelected={cardSelected}
              handleNext={handleNext}
            />
          </div>
        );
      case 1:
        return <FormCompanyInfo handleNext={handleNext} cardSelected={cardSelected} />;
      case 2:
        return <Fildemnager handleNext={handleNext} cardSelected={cardSelected} />;
      case 3:
        return <Resume handleNext={handleNext} cardSelected={cardSelected} />;
      case 4:
        return <Shareholder handleNext={handleNext} cardSelected={cardSelected} />;
      case 5:
        return <Validation cardSelected={cardSelected} handleNext={handleNext} />;
      case 6:
        return <OtherCases cardSelected={cardSelected} handleNext={handleNext} />;
      case 7:
        return <History cardSelected={cardSelected} handleNext={handleNext}/>;
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
      <Stepper
        sx={{ marginTop: '40px' }}
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((label, index) => (
          <Step
            key={index}
            onClick={() => handleStepClick(index)}
            sx={{
              cursor: 'pointer',
            }}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div style={{ position: 'relative', minHeight: '300px' }}>
        {renderStepContent(activeStep)}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Sterpercrowd;
