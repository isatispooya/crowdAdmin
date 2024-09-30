import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useGetCard from '../service/planCard/useGetCard';

const PlanTableFeature = () => {
  const [planData, setPlanData] = useState([]);
  const navigate = useNavigate();

  const { data, isPending, isError } = useGetCard();

  useEffect(() => {
    if (!isError && data && !isPending) {
      setPlanData(data);
    }
  }, [data, isError, isPending]);

  const handleCardClick = (id) => {
    navigate(`/plandetail/${id}`);
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <ToastContainer />
      {isPending ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {planData.length > 0 ? (
            planData.map((plan) => (
              <Grid item xs={12} sm={4} md={3} key={plan.id}>
                <Card
                  sx={{
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
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {plan}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      نام طرح:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      مبلغ تعیین شده: {plan.amount}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      سود: {plan.amount_of_shareholders} %
                    </Typography>
                  </CardContent>

                  <Button
                    fullWidth
                    onClick={() => handleCardClick(plan)}
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: 'none' }}
                  >
                    مشاهده
                  </Button>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>هیچ طرحی وجود ندارد</Typography>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default PlanTableFeature;
