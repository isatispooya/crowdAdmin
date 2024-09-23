import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';

const getManagement = async (id) => {
  const accessApi = getCookie('accessApi');
  const response = await axios.get(`${OnRun}/api/manager/admin/${id}/`, {
    headers: { Authorization: `Bearer ${accessApi}` },
  });

  return response.data.data;
};

export default getManagement;
