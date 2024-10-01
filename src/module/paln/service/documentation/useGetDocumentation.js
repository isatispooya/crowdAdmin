import { useQuery } from '@tanstack/react-query';
import { GetDocument } from './api';

const useGetDocumentation = (id) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['documentation'],
    queryFn: () => GetDocument(id),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetDocumentation;
