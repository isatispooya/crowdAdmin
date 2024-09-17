import axios from 'axios';
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

export const fetchDetail = async (id) => {
  const response = await api.get(`/api/plan/admin/${id}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  console.log('5555555555555555', response.data);

  return response.data;
};




export const sendPlanData = async (formData) => {
  const data = new FormData();
  data.append('plan_name', formData.plan_name || '');
  data.append('company_name', formData.company_name || '');
  data.append('funded_amount', formData.funded_amount || '');
  data.append('profit', formData.profit_amount || '');
  data.append('total_time', formData.duration || '');
  data.append('buoyancy', formData.refund || '');
  data.append('payment_period', formData.duration || '');
  data.append('description', formData.description || '');
  data.append('plan_status', formData.status || '');
  data.append('activity_field', formData.activity_area || '');
  data.append('remaining_days', formData.date_range || ''); 
  data.append('marketer', 'بازارگردان'); // مقدار ثابت
  data.append('symbol', formData.symbol || '');
  data.append('farabours_link', formData.link || '');
  data.append('applicant_funding_percentage', formData.applicant_percentage || '');
  data.append('nominal_price_certificate', formData.nominal_price || '');

  const response = await api.post('/api/plan/admin/', data, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};







export const UpdatePlan = async (id, data) => {
  const url = `/api/plan/admin/${id}/`;
  const formData = new FormData();
  formData.append('plan_name', data.plan_name || '');
  formData.append('company_name', data.company_name || '');
  formData.append('symbol', data.symbol || '');
  formData.append('funded_amount', data.funded_amount || '');
  formData.append('profit', data.profit || '');
  formData.append('total_time', data.total_time || '');
  formData.append('buoyancy', data.buoyancy || '');
  formData.append('payment_period', data.payment_period || '');
  formData.append('plan_status', data.plan_status || '');
  formData.append('activity_field', data.activity_field || '');
  formData.append('remaining_days', data.remaining_days || '');
  formData.append('marketer', data.marketer || '');
  formData.append('farabours_link', data.farabours_link || '');
  formData.append('applicant_funding_percentage', data.applicant_funding_percentage || '');
  formData.append('nominal_price_certificate', data.nominal_price_certificate || '');
  formData.append('description', data.description || '');

  const response = await api.patch(url, formData, {
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
