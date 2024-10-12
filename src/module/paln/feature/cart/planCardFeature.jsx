import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import moment from 'moment-jalaali';
import RefreshIcon from '@mui/icons-material/Refresh';
import { motion } from 'framer-motion';
import { useGetPlans } from '../../hooks/getPlans';
import useUpdatePlan from '../../service/planCard/useUpdatePlan';

const PlanTableFeature = () => {
  const [planData, setPlanData] = useState([]);
  const navigate = useNavigate();
  const [isRotating, setIsRotating] = useState(false);

  const { data: plans, isLoading, isError } = useGetPlans();
  const { mutate } = useUpdatePlan();

  const handleLoadClick = () => {
    setIsRotating(true);
    mutate(planData);
    setTimeout(() => {
      setIsRotating(false);
    }, 2000);
  };

  const formatNumber = (value) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const getStatusTitle = (status) => {
    switch (status) {
      case '1':
        return 'شروع شده';
      case '2':
        return 'جمع آوری';
      case '3':
        return 'تمدید شده';
      case '4':
        return 'سررسید ناموفق';
      case '5':
        return 'تکمیل';
      default:
        return 'نامشخص';
    }
  };

  useEffect(() => {
    if (!isError && plans && !isLoading) {
      setPlanData(plans);
    }
  }, [plans, isError, isLoading]);

  const handleCardClick = (trace_code) => {
    navigate(`/plan/${trace_code}`);
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <ToastContainer />

      <Button
        variant="outlined"
        sx={{ mb: 4 }}
        onClick={handleLoadClick}
        startIcon={
          <motion.div
            animate={{ rotate: isRotating ? 360 : 0 }}
            transition={{ repeat: isRotating ? Infinity : 0, duration: 0.8 }}
          >
            <RefreshIcon />
          </motion.div>
        }
      >
        بارگذاری
      </Button>

      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      )}

      {!isLoading && planData.length === 0 && <Typography>هیچ طرحی وجود ندارد</Typography>}

      <Grid container spacing={2}>
        <Grid container spacing={2}>
          {!isLoading &&
            planData.length > 0 &&
            planData.map((plan) => (
              <Grid item xs={12} sm={4} md={3} key={plan.plan.trace_code}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    padding: '20px',
                    position: 'relative',
                    boxShadow:
                      plan.information_complete.status_second === '5'
                        ? 'none'
                        : '0 4px 15px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    backgroundColor:
                      plan.information_complete.status_second === '5' ? '#d0d3d4' : 'white',
                    '&:hover': {
                      transform:
                        plan.information_complete.status_second === '5' ? 'none' : 'scale(1.05)',
                      boxShadow:
                        plan.information_complete.status_second === '5'
                          ? 'none'
                          : '0 8px 25px rgba(0, 0, 0, 0.3)',
                    },
                    borderRadius: '15px',
                    opacity: plan.information_complete.status_second === '5' ? 0.8 : 1,
                  }}
                  onClick={() =>
                    plan.information_complete.status_second !== '5' &&
                    handleCardClick(plan.plan.trace_code)
                  }
                >
                  <Typography
                    variant="p"
                    sx={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      color: '#fff',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      padding: '5px',
                      borderRadius: '5px',
                      zIndex: 1,
                    }}
                  >
                    {getStatusTitle(plan.information_complete.status_second)}
                  </Typography>

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {plan.plan.persoan_approved_symbol || 'بدون نام'}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {getStatusTitle(plan.information_complete.status_second)}
                    </Typography>
                    <Typography
                      variant="p"
                      component="div"
                      sx={{ mb: 1, color: '#808b96', fontSize: '17px' }}
                    >
                      {plan.plan.persian_name || 'بدون نام'}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      مبلغ تعیین شده:{' '}
                      {plan.plan.total_price
                        ? `${formatNumber(plan.plan.total_price)} ریال`
                        : 'نامشخص'}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      تعداد واحدها:{' '}
                      {plan.plan.company_unit_counts
                        ? formatNumber(plan.plan.company_unit_counts)
                        : 'نامشخص'}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      قیمت واحد:{' '}
                      {plan.plan.unit_price
                        ? `${formatNumber(plan.plan.unit_price)} ریال`
                        : 'نامشخص'}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      صنعت: {plan.plan.industry_group_description || 'نامشخص'}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      تاریخ:{' '}
                      {plan.creation_date
                        ? moment(plan.plan.creation_date).format('jYYYY/jMM/jDD')
                        : 'نامشخص'}
                    </Typography>
                  </CardContent>

                  <Button
                    fullWidth
                    onClick={() => handleCardClick(plan.plan.trace_code)}
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: 'none', mt: 2 }}
                  >
                    مشاهده
                  </Button>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlanTableFeature;
