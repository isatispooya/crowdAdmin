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

  


export const sendPlanData = async (formData) => {
  const data = new FormData();
  
  data.append('plan_name', formData.plan_name );
  data.append('company_name', formData.company_name );
  data.append('funded_amount', formData.funded_amount );
  data.append('profit', formData.profit_amount );
  data.append('total_time', formData.duration );
  data.append('buoyancy', formData.refund );
  data.append('payment_period', formData.payment_period);
  data.append('description', formData.description);
  data.append('plan_status', formData.status );
  data.append('activity_field', formData.activity_area );
  const response = await api.post('/api/plan/admin/', data, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'multipart/form-data',
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
