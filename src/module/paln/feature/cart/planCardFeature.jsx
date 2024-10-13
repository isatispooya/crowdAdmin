/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import moment from 'moment-jalaali';
import RefreshIcon from '@mui/icons-material/Refresh';
import { motion } from 'framer-motion';
import useUpdatePlan from '../../service/planCard/useUpdatePlan';
import ProgressLineChart from './progressLBar';
import useGetCard from '../../service/planCard/useGetCard';

const PlanTableFeature = () => {
  const [planData, setPlanData] = useState([]);
  const navigate = useNavigate();
  const [isRotating, setIsRotating] = useState(false);

  const { data: plans, isLoading, isError } = useGetCard();
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

  const statusColors = {
    1: '#2786ff',
    2: '#0dab3a',
    3: '#ff9800',
    4: '#ff6780',
    5: '#9e9e9e',
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
        return 'تکمیل شده';
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
  console.log(plans)

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <ToastContainer />

      <Button
        variant="outlined"
        sx={{ mb: 4, borderColor: '#1976d2', color: '#1976d2' }}
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
          <CircularProgress color="primary" />
        </Box>
      )}

      {!isLoading && planData.length === 0 && (
        <Typography variant="h6" color="textSecondary" align="center">
          هیچ طرحی وجود ندارد
        </Typography>
      )}

      <Grid container spacing={2}>
  {!isLoading &&
    planData.length > 0 &&
    planData.map((plan) => (
      <Grid item xs={12} sm={6} md={4} key={plan.plan?.trace_code}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            padding: '16px',
            transition: 'transform 0.3s, box-shadow 0.3s',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
            },
            borderRadius: '12px',
            backgroundColor:
              plan.information_complete?.status_second === '5' ? '#e0e0e0' : 'white',
            opacity: plan.information_complete?.status_second === '5' ? 0.7 : 1,
            position: 'relative',
          }}
          onClick={() =>
            plan.information_complete?.status_second !== '5' &&
            handleCardClick(plan.plan?.trace_code)
          }
        >
          <Typography
            variant="subtitle2"
            sx={{
              position: 'absolute',
              top: '95px',
              right: '-30px',
              backgroundColor:
                statusColors[plan.information_complete?.status_second] || 'rgba(0, 0, 0, 0.7)',
              color: '#fff',
              padding: '6px 55px',
              borderRadius: '4px',
              zIndex: 1,
              fontWeight: 'bold',
              transform: 'rotate(-45deg)',
              transformOrigin: 'top right',
            }}
          >
            {getStatusTitle(plan.information_complete?.status_second)}
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
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#2c3e50' }}>
              {plan.plan?.persoan_approved_symbol || 'بدون نام'}
            </Typography>

            <Typography variant="body1" sx={{ mb: 1, color: '#7f8c8d', fontStyle: 'italic' }}>
              {plan.plan?.persian_name || 'بدون نام'}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#34495e' }}>
              نام شرکت: <strong>{plan.company?.name || 'بدون نام'}</strong>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#34495e' }}>
              مبلغ تعیین شده:{' '}
              <strong>
                {plan.plan?.total_price
                  ? `${formatNumber(plan.plan.total_price)} ریال`
                  : 'نامشخص'}
              </strong>
            </Typography>

            <Typography variant="body2" sx={{ mb: 1, color: '#34495e' }}>
              تعداد واحدها:{' '}
              <strong>
                {plan.plan?.company_unit_counts
                  ? formatNumber(plan.plan.company_unit_counts)
                  : 'نامشخص'}
              </strong>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#34495e' }}>
              قیمت واحد:{' '}
              <strong>
                {plan.plan?.unit_price
                  ? `${formatNumber(plan.plan.unit_price)} ریال`
                  : 'نامشخص'}
              </strong>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#34495e' }}>
              صنعت: <strong>{plan.plan?.industry_group_description || 'نامشخص'}</strong>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#34495e' }}>
              تاریخ:{' '}
              <strong>
                {plan.creation_date
                  ? moment(plan.plan?.creation_date).format('jYYYY/jMM/jDD')
                  : 'نامشخص'}
              </strong>
            </Typography>
            <ProgressLineChart
              label="تامین شده"
              progress={formatNumber(
                Math.round(
                  (plan.information_complete?.amount_collected_now / plan.plan?.total_price) * 100
                )
              )}
            />
          </CardContent>

          <Button
            fullWidth
            onClick={() => handleCardClick(plan.plan?.trace_code)}
            variant="contained"
            color="primary"
            sx={{ textTransform: 'none', mt: 2, fontWeight: 'bold' }}
          >
            مشاهده
          </Button>
        </Card>
      </Grid>
    ))}
</Grid>

    </Box>
  );
};

export default PlanTableFeature;
