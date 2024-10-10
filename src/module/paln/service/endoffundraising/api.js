import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const postEndOfFundraising = async ({ trace_code,form }) => {
  console.log('3',form);
  
  const response = await api.post(`/api/end/fundraising/admin/${trace_code}/`, form, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const getEndOfFundraising = async (trace_code) => {
  const response = await api.get(`/api/end/fundraising/admin/${trace_code}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

