import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const access = getCookie('access');

export const fetchCards = async () => {
  const response = await api.get(`/api/cart/admin/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteCard = async (cardId) => {
  const response = await api.delete(`/api/cart/admin/${cardId}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
