import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const fetchPayment = async () => {
  const access = await getCookie('access');

  const response = await api.get(`/api/transaction/admin/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.transaction;
};
