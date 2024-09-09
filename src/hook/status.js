import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

export const fetchStatus = async () => {
  const access = await getCookie('access');

  const response = await api.get(`${OnRun}/api/setstatus/admin/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  return response.data;
};

export const postStatus = async (id) => {
  const access = await getCookie('access');
  console.log(id);
  
  const response = await api.post(`${OnRun}/api/setstatus/admin/${id}/`, {}, { // اضافه کردن {} به عنوان بدنه درخواست اگر نیاز است
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
