import axios from 'axios';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const access = await getCookie('access');

export const fetchManager = async (id) => {
  const response = await api.get(`/api/manager/admin/${id}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data.data;
};

export const sendManager = async (id, data) => {
  const response = await axios.post(
    `${OnRun}/api/manager/admin/${id}/`,
    (data = { managers: data }),
    {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};
