import axios from 'axios';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const accessApi = getCookie('accessApi');

export const grtOtherCases = async (id) => {
  const response = await api.get(`/api/addinformation/admin/${id}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const postOtherCases = async (id, data) => {
  const formData = new FormData();
  if (data.claims_status && typeof data.claims_status !== 'string') {
    formData.append('claims_status', data.claims_status);
  }

  if (data.latest_insurance_staf && typeof data.latest_insurance_staf !== 'string') {
    formData.append('latest_insurance_staf', data.latest_insurance_staf);
  }

  if (data.bank_account_turnover && typeof data.bank_account_turnover !== 'string') {
    formData.append('bank_account_turnover', data.bank_account_turnover);
  }

  if (data.assets_and_liabilities && typeof data.assets_and_liabilities !== 'string') {
    formData.append('assets_and_liabilities', data.assets_and_liabilities);
  }
  if (data.statutes && typeof data.statutes !== 'string') {
    formData.append('statutes', data.statutes);
  }

  if (
    data.announcement_of_changes_capital &&
    typeof data.announcement_of_changes_capital !== 'string'
  ) {
    formData.append('announcement_of_changes_capital', data.announcement_of_changes_capital);
  }

  if (
    data.announcement_of_changes_managers &&
    typeof data.announcement_of_changes_managers !== 'string'
  ) {
    formData.append('announcement_of_changes_managers', data.announcement_of_changes_managers);
  }
  formData.append('Lock_claims_status', data.claims_status || '');
  formData.append('Lock_latest_insurance_staf', data.latest_insurance_staf || '');
  formData.append('Lock_bank_account_turnover', data.bank_account_turnover || '');
  formData.append('Lock_assets_and_liabilities', data.assets_and_liabilities || '');
  formData.append('Lock_statutes', data.statutes || '');
  formData.append(
    'Lock_announcement_of_changes_capital',
    data.announcement_of_changes_capital || ''
  );
  formData.append(
    'Lock_announcement_of_changes_managers',
    data.announcement_of_changes_managers || ''
  );

  const response = await axios.post(`${OnRun}/api/addinformation/admin/${id}/`, formData, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
