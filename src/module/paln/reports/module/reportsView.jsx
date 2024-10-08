import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ToastContainer } from 'react-toastify';
import PlanDocumentation from '../../feature/documentation/planDocumentation';
import PlanGuarante from '../../feature/Guarante/planGuarante';
import PlanProgress from '../components/planProgress';
import PlanAudit from '../components/planAudit';

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <ToastContainer />

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>مستندات</Typography>
          <Typography sx={{ color: 'text.secondary' }}>پیوست و مشاهده مستندات </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PlanDocumentation />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}> تضامین</Typography>
          <Typography sx={{ color: 'text.secondary' }}>پیوست و مشاهده تضامین</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PlanGuarante />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>پیشرفت طرح</Typography>
          <Typography sx={{ color: 'text.secondary' }}>مشاهده شرایط و تاریخ های مراحل</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PlanProgress />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>حسابرسی</Typography>
          <Typography sx={{ color: 'text.secondary' }}>مشاهده حسابرسی و وضعیت</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <PlanAudit />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
