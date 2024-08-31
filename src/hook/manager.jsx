/* eslint-disable consistent-return */
import axios from 'axios';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

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





export const sendManager = async (id, data) => {
  const access = await getCookie('access');
  const url = `${OnRun}/api/manager/admin/${id}/`;
  const response = await axios.post(
    url,
    data  ,
    {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      }
    }
  );

  return response.data;
};

