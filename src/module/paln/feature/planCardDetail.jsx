import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import useGetPlanDetail from '../service/plandetail/useGetPlandetail';
import { details } from './plan_detail_config';

const PlanDetail = () => {
  const { id } = useParams();
  const { data } = useGetPlanDetail(id);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1400px',
        padding: 3,
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        margin: '0 auto',
      }}
    >
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
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        {data ? (
          details(data).map((item, index) => (
            <Typography variant="h6" key={index}>
              {item.label}: {item.value}
              {console.log(item.label , "aaaaaaaaaaaaaaaaaaaaaa")}
            </Typography>
          ))
        ) : (
          <Typography>اطلاعاتی موجود نیست.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default PlanDetail;
