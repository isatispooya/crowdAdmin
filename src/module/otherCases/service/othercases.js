import axios from 'axios';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const accessApi =  getCookie('accessApi');

export const fetchOtherCases = async (id) => {
  let response;
  if (id) {
    response = await api.get(`/api/addinformation/admin/${id}/`, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
        'Content-Type': 'application/json',
      },
    });
    response = {
      data: 
      {cart:
        {
        announcement_of_changes_capital: null,
        announcement_of_changes_managers: null,
        announcing_account_number: null,
        assets_and_liabilities: null, 
        auditor_representative: null,
        bank_account_turnover: null,
        claims_status: null,
        latest_insurance_staf: null,
        licenses: null,
        lock_announcement_of_changes_capital: false,
        lock_announcement_of_changes_managers: false,
        lock_announcing_account_number: false,
        lock_assets_and_liabilities: false,
        lock_auditor_representative: false,
        lock_bank_account_turnover: false,
        lock_claims_status: false,
        lock_insurance_staf: false,
        lock_licenses: false,
        lock_product_catalog: false,
        lock_statutes: false,
        product_catalog: null,
        statutes: null
      },
    }
    };
  }
  return response?.data?.cart;
};

export const sendOtherCases = async (id, data) => {
  const formData = new FormData();
  formData.append('claims_status', data.claims_status || '');
  formData.append('latest_insurance_staf', data.latest_insurance_staf || '');
  formData.append('bank_account_turnover', data.bank_account_turnover || '');
  formData.append('assets_and_liabilities', data.assets_and_liabilities || '');
  formData.append('statutes', data.statutes || '');
  formData.append('product_catalog', data.product_catalog || '');
  formData.append('bank_account_turnover', data.bank_account_turnover || '');
  formData.append('licenses', data.licenses || '');
  formData.append('product_catalog', data.product_catalog || '');
  formData.append('announcing_account_number', data.announcing_account_number || '');
  formData.append('announcement_of_changes_capital', data.announcement_of_changes_capital || '');
  formData.append('announcement_of_changes_managers', data.announcement_of_changes_managers || '');
  formData.append('lock_claims_status', data.lock_product_catalog);
  formData.append('lock_product_catalog', data.lock_product_catalog);
  formData.append('lock_licenses', data.lock_licenses);
  formData.append('lock_announcing_account_number', data.lock_announcing_account_number );
  formData.append('lock_latest_insurance_staf', data.lock_latest_insurance_staf);
  formData.append('lock_bank_account_turnover', data.lock_bank_account_turnover );
  formData.append('lock_assets_and_liabilities', data.lock_assets_and_liabilities );
  formData.append('lock_statutes', data.lock_statutes );
  formData.append('lock_announcement_of_changes_capital', data.lock_announcement_of_changes_capital );
  formData.append('lock_announcement_of_changes_managers', data.lock_announcement_of_changes_managers );


  console.log("formData",formData.get('lock_claims_status'))
  const response = await axios.post(`${OnRun}/api/addinformation/admin/${id}/`, formData, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
