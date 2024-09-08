import axios from 'axios';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

export const fetchValidation = async (id) => {
  try {
    const access = await getCookie('access');

    const response = await api.get(`/api/validation/admin/${id}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('validation', response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching manager data:', error);
    throw new Error('Failed to fetch manager data.');
  }
};

export const sendValidation = async (id, formData) => {
  try {
    const access = await getCookie('access');
    const url = `${OnRun}/api/validation/admin/${id}/`;

    const data = new FormData();

    formData.forEach((item, index) => {
      data.append(`manager[${index}][name]`, item.name || '');
      data.append(`manager[${index}][national_code]`, item.national_code || '');

      if (item.file) {
        data.append(`manager[${index}][file]`, item.file);
      }
    });

    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error sending validation data:', error);
    throw new Error('Failed to send validation data.');
  }
};
