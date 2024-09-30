import { useQuery } from '@tanstack/react-query';
import {GetDetailPlan } from './api';

const useGetPlanDetail = (id) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['planDetail'],
    queryFn: () => GetDetailPlan(id),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetPlanDetail;
