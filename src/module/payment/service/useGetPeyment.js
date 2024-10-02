import { useQuery } from '@tanstack/react-query';
import { getPayment } from './api';

const useGetPayment = () => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['getPayment'],
    queryFn: () => getPayment(),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetPayment;
