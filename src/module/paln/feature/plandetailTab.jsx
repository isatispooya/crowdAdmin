import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PlanDetail from './planDetail';
import PlanUpdate from './planUpdate';
import PlanAddPic from './planAddPic';
import PlanDocumentation from './planDocumentation';
import PlanGuarante from './planGuarante';
import PlanInvestors from './planInvestors';
import PlanComments from './planComments';

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

const PlanDetailTab = ({ planData, idRow }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="مشاهده " {...a11yProps(0)} />
          <Tab label="ویرایش" {...a11yProps(1)} />
          <Tab label="افزودن عکس به طرح" {...a11yProps(2)} />
          <Tab label="افزودن مستندات" {...a11yProps(3)} />
          <Tab label="افزودن تضامین" {...a11yProps(4)} />
          <Tab label="نظرات" {...a11yProps(5)} />
          <Tab label="مشاهده سرمایه گذاران" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PlanDetail planData={planData} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PlanUpdate planData={planData} idRow={idRow} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <PlanAddPic idRow={idRow} planData={planData}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <PlanDocumentation/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <PlanGuarante/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <PlanComments/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <PlanInvestors/>
      </CustomTabPanel>
    </Box>
  );
};

PlanDetailTab.propTypes = {
  planData: PropTypes.object,
  idRow: PropTypes.number,
};

export default PlanDetailTab;
