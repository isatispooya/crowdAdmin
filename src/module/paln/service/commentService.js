import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const accessApi = getCookie('accessApi');

export const fetchCommit = async (trace_code) => {
  const response = await api.get(`/api/comment/admin/${trace_code}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  console.log(response.data, '123456');
  return response.data;
};

export const sendCommit = async (id, data) => {
  const url = `/api/comment/admin/${id}/`;
  const response = await api.patch(
    url,
    {
      status: data.status,
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
