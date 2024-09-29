import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const getResume = async (cartId) => {
  const response = await api.get(`/api/resume/admin/${cartId}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const postResume = async ({cartId, formData}) => {
  console.log(formData);
  
  const form = new FormData();
  for (let index = 0; index < formData.length; index += 1) {
    const element = formData[index];
    
    if (element.file && typeof element.file !== 'string') {
      form.append(element.national_code, element.file); 
    }
    form.append(`lock_${element.national_code}`, element.lock);
  }
  const response = await api.post(`api/resume/admin/${cartId}/`, form, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};


