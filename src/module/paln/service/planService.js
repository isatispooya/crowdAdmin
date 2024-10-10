import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi =  getCookie('accessApi');

export const fetchPlan = async () => {
  const response = await api.get(`/api/plans/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });  
  const plans = response.data.map((item) => item.plan);

  return plans;
};


