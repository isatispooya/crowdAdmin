import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const usePlanDetailGet = (id) => {
  const access = getCookie('access');

  const getPlanDetail = async () => {
    const response = await api.get(`/api/plan/admin/${id}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ['planDetailGet', id],
    queryFn: () => getPlanDetail(id),
  });
  return { data };

};

export default usePlanDetailGet;
