import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const GetDocument = async (trace_code) => {
  const response = await api.get(`/api/documentation/${trace_code}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};


export const PostDocument = async (trace_code, postData) => {
  const formData = new FormData();

  postData.forEach((element) => {
    if (element.file) {
      formData.append('file', element.file);
    }
    if (element.title) {
      formData.append('title', element.title);
    }
  });

  const response = await api.post(`/api/documentation/${trace_code}/`, formData, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
    },
  });

  return response.data;
};
