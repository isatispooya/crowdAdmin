import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const postEndOfFundraising = async ({form,trace_code}) => {
  const accessApi = getCookie('accessApi');

  const response = await api.post(`/api/end/fundraising/admin/${trace_code}/`, form, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });


  
  
  return response.data;
};
