import axios from 'axios';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const access = getCookie('access');

export const fetchHistory = async (cardSelected) => {
  try {
    const response = await api.get(`/api/history/admin/${cardSelected}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch history data.');
  }
};

export const uploadHistoryFile = async (cardSelected, formData) => {
  try {
    const url = `${OnRun}/api/history/admin/${cardSelected}/`;
    const form = new FormData();
    formData.forEach((item) => {
      if (item.file) {
        form.append(item.national_code, item.file);
      }
    });

    const response = await axios.post(url, form, {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to upload history file.');
  }
};
