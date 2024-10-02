import { useQuery } from '@tanstack/react-query';
import { getComment } from './api';

const useGetComment = (trace_code) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['getComment'],
    queryFn: () => getComment(trace_code),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetComment;
