import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const getInfo = async (trace_code) => {
  const response = await api.get(`/api/information/plan/admin/${trace_code}/`);
  return response.data;
};

export const sendAddInfo = async (trace_code, data) => {
  const response = await api.post(`/api/information/plan/admin/${trace_code}/`, data, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
