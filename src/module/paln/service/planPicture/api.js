import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const getPic = async (trace_code) => {
  const response = await api.get(`/api/send/picture/${trace_code}/`);
  return response.data;
};

export const sendPlanPic = async (trace_code, data) => {
  const response = await api.post(`/api/send/picture/${trace_code}/`, data, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
