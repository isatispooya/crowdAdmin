import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi =  getCookie('accessApi');

export const fetchCommit = async (id) => {
  const response = await api.get(`/api/comment/admin/${id}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const sendCommit = async (id, data) => {
  const url = `/api/comment/admin/${id}/`;
  const response = await api.patch(
    url,
    {
      known: data.known,
      status: data.status,
      comment: data.comment,
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
