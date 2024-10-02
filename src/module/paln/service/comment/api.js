import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const getComment = async (trace_code) => {
  const response = await api.get(`/api/comment/admin/${trace_code}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const postComment = async (id, data) => {
  const url = `/api/comment/admin/${id}/`;
  const response = await api.patch(
    url,
    {
      status: data.status,
      response: data.response,
    },
    {
      headers: {
        Authorization: `Bearer ${accessApi}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
