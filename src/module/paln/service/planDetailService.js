
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const fetchDetail = async (trace_code) => {
  const response = await api.get(`/api/plan/${trace_code}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

// export const UpdatePlan = async (id, data) => {
//   const remainingFromDate = moment(data.remaining_from_to, 'YYYY/MM/DD').format(
//     'YYYY-MM-DDTHH:mm:ss'
//   );
//   const remainingToDate = moment(data.remaining_date_to, 'YYYY/MM/DD').format(
//     'YYYY-MM-DDTHH:mm:ss'
//   );

//   const url = `/api/plan/admin/${id}/`;
//   const formData = new FormData();
//   formData.append('plan_name', data.plan_name || '');
//   formData.append('company_name', data.company_name || '');
//   formData.append('symbol', data.symbol || '');
//   formData.append('funded_amount', data.funded_amount || '');
//   formData.append('profit', data.profit || '');
//   formData.append('total_time', data.total_time || '');
//   formData.append('buoyancy', data.buoyancy || '');
//   formData.append('payment_period', data.payment_period || '');
//   formData.append('plan_status', data.plan_status || '');
//   formData.append('activity_field', data.activity_field || '');
//   formData.append('remaining_days', data.remaining_days || '');
//   formData.append('marketer', data.marketer || '');
//   formData.append('remaining_date_to', remainingToDate);
//   formData.append('remaining_from_to', remainingFromDate);
//   formData.append('farabours_link', data.farabours_link || '');
//   formData.append('applicant_funding_percentage', data.applicant_funding_percentage || '');
//   formData.append('nominal_price_certificate', data.nominal_price_certificate || '');
//   formData.append('description', data.description || '');
//   formData.append('amount_of_shareholders', data.amount_of_shareholders || '');


//   const response = await api.patch(url, formData, {
//     headers: {
//       Authorization: `Bearer ${accessApi}`,
//       'Content-Type': 'multipart/form-data',
//     },
//   });

//   return response.data;
// };
