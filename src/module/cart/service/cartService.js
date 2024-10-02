import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const fetchCards = async () => {
  const response = await api.get(`/api/cart/admin/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteCard = async (cardId) => {
  const response = await api.delete(`/api/cart/admin/${cardId}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const PostFinish = async ({ cartId, data }) => {
  const response = await api.post(`/api/update/finish/admin/${cartId}/`, data, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};



