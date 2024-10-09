import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import moment from 'moment-jalaali';
import RefreshIcon from '@mui/icons-material/Refresh';
import { motion } from 'framer-motion';
import { useGetPlans } from '../../hooks/getPlans';

const PlanTableFeature = () => {
  const [planData, setPlanData] = useState([]);
  const navigate = useNavigate();

  const { data: plans, isLoading, isError, refetch } = useGetPlans();

  const formatNumber = (value) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    if (!isError && plans && !isLoading) {
      setPlanData(plans);
    }
  }, [plans, isError, isLoading]);

  const handleCardClick = (trace_code) => {
    navigate(`/plan/${trace_code}`);
  };

  const handleLoadClick = () => {
    refetch();
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <ToastContainer />

      <Button
        variant="outlined"
        sx={{ mb: 4 }}
        onClick={handleLoadClick}
        startIcon={
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
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
        {!isLoading &&
          planData.length > 0 &&
          planData.map((plan) => (
            <Grid item xs={12} sm={4} md={3} key={plan.trace_code}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  padding: '20px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                  },
                  borderRadius: '15px',
                }}
                onClick={() => handleCardClick(plan.trace_code)}
              >
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
                    {plan.persian_name || 'بدون نام'}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    مبلغ تعیین شده:{' '}
                    {plan.total_price ? `${formatNumber(plan.total_price)} ریال` : 'نامشخص'}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    تعداد واحدها:{' '}
                    {plan.company_unit_counts ? formatNumber(plan.company_unit_counts) : 'نامشخص'}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    قیمت واحد:{' '}
                    {plan.unit_price ? `${formatNumber(plan.unit_price)} ریال` : 'نامشخص'}
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    صنعت: {plan.industry_group_description || 'نامشخص'}
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    تاریخ:{' '}
                    {plan.creation_date
                      ? moment(plan.creation_date).format('jYYYY/jMM/jDD')
                      : 'نامشخص'}
                  </Typography>
                </CardContent>

                <Button
                  fullWidth
                  onClick={() => handleCardClick(plan.trace_code)}
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
    </Box>
  );
};

export default PlanTableFeature;
