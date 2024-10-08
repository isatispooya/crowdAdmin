import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');
export const GetCardPlan = async () => {
  const response = await api.get(`/api/plan/farabours/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  
  return response.data;
};
