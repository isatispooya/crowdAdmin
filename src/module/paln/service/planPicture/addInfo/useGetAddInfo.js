import { useQuery } from '@tanstack/react-query';
import { getInfo } from './api';

export const useGetAddInfo = (trace_code) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['addInformation', trace_code],
    queryFn: () => getInfo(trace_code),
    enabled: !!trace_code,
    retry: 1,
    staleTime: 10000,
    cacheTime: 300000,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
