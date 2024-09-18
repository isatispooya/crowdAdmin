import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import PlanDetailTab from '../feature/plandetailTab';
import { fetchDetail } from '../service/planDetailService';

const PlanDetailPage = () => {
  const [idRow, setIdRow] = useState();
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['planDetail', id],
    queryFn: () => fetchDetail(id),
  });

  useEffect(() => {
    setIdRow(id);
  }, [id]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        padding: '0 16px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1400px',
          padding: 3,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          marginTop: '40px',
        }}
      >
        <PlanDetailTab planData={data} idRow={idRow} />
      </Box>
    </div>
  );
};

export default PlanDetailPage;
