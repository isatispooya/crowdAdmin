import React from 'react';
import { Box, Typography, TextField, Grid, Paper, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import moment from 'moment-jalaali';
import useGetPlanDetail from '../../service/plandetail/useGetPlandetail';
import { plan_fields_input, plan_fields_textarea } from '../../object/planFilds';

const PlanDetail = () => {
  const { trace_code } = useParams();
  const { data, isLoading } = useGetPlanDetail(trace_code);
  const planDetails = plan_fields_input();
  const planDetailstextarea = plan_fields_textarea();

  const formatDate = (date) => (date ? moment(date).format('jYYYY/jM/jD') : 'اطلاعات موجود نیست.');

  const isDataAvailable = data && Object.keys(data).length > 0;

  if (isLoading || !isDataAvailable) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1400px',
        padding: 3,
        borderRadius: '16px',
        margin: '0 auto',
        boxShadow: 3,
      }}
    >
      <Paper elevation={2} sx={{ borderRadius: '16px 16px 0 0' }}>
        <div
          style={{
            backgroundColor: '#e0e0e0',
            color: '#333',
            borderRadius: '16px 16px 0 0',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold">
            اطلاعات طرح
          </Typography>
        </div>
      </Paper>
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={3}>
          {planDetails.map((item) => (
            <Grid item xs={12} sm={4} key={item.value}>
              <TextField
                fullWidth
                label={item.label}
                variant="outlined"
                value={
                  item.isDate
                    ? formatDate(data?.[item.value])
                    : data?.[item.value] ?? 'اطلاعات موجود نیست.'
                }
                InputProps={{
                  readOnly: true,
                  sx: {
                    color: data?.[item.value] !== undefined ? 'inherit' : 'darkred',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { 
                      borderColor: 'gray',
                    },
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} mt={1}>
          {planDetailstextarea.map((item) => (
            <Grid item xs={12} key={item.value}>
              <TextField
                fullWidth
                label={item.label}
                variant="outlined"
                value={data?.[item.value] ?? 'اطلاعات موجود نیست.'}
                InputProps={{
                  readOnly: true,
                  sx: {
                    color: data?.[item.value] !== undefined ? 'inherit' : 'darkred',
                  },
                }}
                multiline
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'gray',
                    },
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default PlanDetail;
