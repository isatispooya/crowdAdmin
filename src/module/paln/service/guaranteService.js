import axios from 'axios';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const access = await getCookie('access');

export const fetchGuarante = async (id) => {
  const response = await api.get(`/api/appendices/admin/${id}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const sendGuarante = async (id, data) => {
  const form = new FormData();
  
  for (let index = 0; index < data.length; index += 1) {
    const element = data[index];
    form.append(`file_${index}`, element.file);
    form.append(`title_${index}`, element.title); 
  }

  const response = await axios.post(`${OnRun}/api/appendices/admin/${id}/`, form, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  return response.data;
};
