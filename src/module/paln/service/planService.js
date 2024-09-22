import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const access = await getCookie('access');

export const fetchPlan = async () => {
  const response = await api.get(`/api/plan/admin/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

  


export const sendPlanData = async (data) => {
  const response = await api.post('/api/plan/admin/', data, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};



const deletePlan = async (id) => {
  const url = `/api/plan/admin/${id}/`;

  try {
    const response = await api.delete(url, {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export default deletePlan;
