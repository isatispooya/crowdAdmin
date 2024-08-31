/* eslint-disable consistent-return */
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const fetchManager = async (id) => {

    const access = await getCookie('access');
    
    const response = await api.get(`/api/manager/admin/${id}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
};
