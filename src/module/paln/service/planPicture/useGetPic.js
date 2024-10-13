import { useQuery } from '@tanstack/react-query';
import { getPic } from './api';

export const useGetPic = (trace_code) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['planPic', trace_code],
    queryFn: () => getPic(trace_code),
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
