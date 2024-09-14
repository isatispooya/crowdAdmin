import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const sendMessage = async (id, message, sms) => {
  const access = await getCookie('access');
  const url = sms ? `/api/message/admin/${id}/?send_sms=true` : `/api/message/admin/${id}/`;
  const response = await api.post(
    url,
    {
      message,
    },
    {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const fetchUserMessage = async (id) => {
  const access = await getCookie('access')

  const response = await api.get(`/api/message/admin/${id}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
