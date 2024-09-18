import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const access = await getCookie('access');

export const fetchPlanInvestors = async (id) => {
  const response = await api.get(`/api/participant/admin/${id}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data.data;
};
