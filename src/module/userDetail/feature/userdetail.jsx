import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Addresses from './addresses';
import FinancialInfo from './financialInfo';
import JobInfo from './jobInfo';
import PrivatePerson from './privatePerson';
import TradingCodes from './tradingcodes';

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  flexDirection: 'row-reverse',
  padding: theme.spacing(1.5),
  display: 'flex',
  justifyContent: 'center', 
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const sections = [
  { id: 'private', label: 'اطلاعات شخصی', component: <PrivatePerson /> },
  { id: 'address', label: 'اطلاعات آدرس', component: <Addresses /> },
  { id: 'financial', label: 'اطلاعات مالی', component: <FinancialInfo /> },
  { id: 'job', label: 'اطلاعات شغلی', component: <JobInfo /> },
  { id: 'trading', label: 'کدهای معاملاتی', component: <TradingCodes /> },
];

const UserDetail = () => {
  const [expandedPanel, setExpandedPanel] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpandedPanel(newExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: '12px',
        boxShadow: 3,
        width: '90%',
        margin: '0 auto',
        backgroundColor: '#fff',
      }}
    >
      <Box className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-2">
        <Typography variant="h4" className="text-gray-700 font-bold">
          اطلاعات کاربر
        </Typography>
      </Box>
      {sections.map(({ id, label, component }) => (
        <Accordion key={id} expanded={expandedPanel === id} onChange={handleChange(id)}>
          <AccordionSummary aria-controls={`panel-${id}-content`} id={id}>
            <Typography
              sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center', width: '100%' }}
            >
              {label}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{component}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default UserDetail;
