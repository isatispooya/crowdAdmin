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
  
  data.forEach((element, index) => {
    if (element.file) {
      form.append('file', element.file);  // کلید فایل بدون اندیس
    }
    if (element.title) {
      form.append('title', element.title);  // کلید عنوان بدون اندیس
    }
  });

  const response = await axios.post(`${OnRun}/api/appendices/admin/${id}/`, form, {
    headers: {
      Authorization: `Bearer ${access}`,
      // 'Content-Type' را حذف کنید تا به صورت خودکار تنظیم شود
    },
  });

  return response.data;
};
