import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const GetParticipant = async (trace_code) => {
    const response = await api.get(`/api/participant/user/${trace_code}/`, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data); 
    return response.data;
  };
  