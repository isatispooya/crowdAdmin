import axios from 'axios';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

// بارگذاری توکن دسترسی به صورت داخلی در هر درخواست
export const fetchDocument = async (id) => {
  const access = await getCookie('access');  // گرفتن توکن در داخل تابع
  const response = await api.get(`/api/documentation/admin/${id}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const sendDocument = async (id, data) => {
  const access = await getCookie('access');  // گرفتن توکن در داخل تابع
  const form = new FormData();
  
  data.forEach((element) => {
    if (element.file) {
      form.append('file', element.file);  // کلید فایل بدون اندیس
    }
    if (element.title) {
      form.append('title', element.title);  // کلید عنوان بدون اندیس
    }
  });

  const response = await axios.post(`${OnRun}/api/documentation/admin/${id}/`, form, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  return response.data;
};
