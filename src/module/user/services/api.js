import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const getUser = async () => {
  const accessApi =  getCookie('accessApi');

  const response = await api.get(`/api/listuser/admin/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.users;
};
