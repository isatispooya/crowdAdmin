import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

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
  const url = `/api/appendices/admin/${id}/`;
  const formData = new FormData();
  data.forEach((form, index) => {
    form.files.forEach((file) => {
      formData.append(`file_${index}`, file);
    });
  });
  const response = await api.post(url, formData, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
