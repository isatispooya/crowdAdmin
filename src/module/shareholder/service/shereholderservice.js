import axios from 'axios';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const accessApi = getCookie('accessApi');

export const fetchShareholder = async (id) => {
  const response = await api.get(`/api/shareholder/admin/${id}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const sendShareholder = async (id, data) => {
  const response = await axios.post(
    `${OnRun}/api/shareholder/admin/${id}/`,
    (data = { shareholder: data }),
    {
      headers: {
        Authorization: `Bearer ${accessApi}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};
