import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const fetchUser = async () => {
  const access = await getCookie('access');

  const response = await api.get(`/api/listuser/admin/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.users;
};
