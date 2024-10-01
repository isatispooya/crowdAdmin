import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi =  getCookie('accessApi');  

export const GetDocument = async (id) => {
    
  const response = await api.get(`/api/documentation/${id}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};


export const PostDocument = async (id, data) => {
  const form = new FormData();
  
  data.forEach((element) => {
    if (element.file) {
      form.append('file', element.file); 
    }
    if (element.title) {
      form.append('title', element.title);  
    }
  });

  const response = await api.post(`/api/documentation/${id}/`, form, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
    },
  });

  return response.data;
};
