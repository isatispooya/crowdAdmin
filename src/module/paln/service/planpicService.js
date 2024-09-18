import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const access = await getCookie('access');

export const sendPic = async (id, data) => {
  const url = `/api/plan/admin/${id}/`;
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
