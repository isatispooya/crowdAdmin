import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import EndOffUndraisingPage from 'src/module/endoffundraising/page/endoffundraisingPage';
import PlanAddPic from './information&pic/planAddPic';
import PlanGuarante from './Guarante/planGuarante'; 
import PlanInvestors from './participant/participant';
import PlanComments from './planComments';
import PlanDocumentation from './documentation/planDocumentation';
import PlanDetail from './detail/planDetail';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PlanDetailTab = ({ planData, idRow, refetch }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="مشاهده " {...a11yProps(0)} />
          <Tab label="اطلاعات تکمیلی" {...a11yProps(1)} />
          <Tab label="افزودن مستندات" {...a11yProps(2)} />
          <Tab label="افزودن تضامین" {...a11yProps(3)} />
          <Tab label="نظرات" {...a11yProps(4)} />
          <Tab label="سرمایه گذاران" {...a11yProps(5)} />
          <Tab label="پایان جمع آوری وجه" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PlanDetail />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PlanAddPic idRow={idRow} planData={planData} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <PlanDocumentation />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <PlanGuarante idRow={idRow} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <PlanComments idRow={idRow} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <PlanInvestors />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <EndOffUndraisingPage />
      </CustomTabPanel>
    </Box>
  );
};

PlanDetailTab.propTypes = {
  planData: PropTypes.object,
  idRow: PropTypes.number,
  refetch: PropTypes.func,
};

export default PlanDetailTab;
