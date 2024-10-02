import { useQuery } from '@tanstack/react-query';
import { getShareholder } from './api';

const useGetShereholder = (cartId) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['GetShreholder', cartId],
    queryFn: () => getShareholder(cartId),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetShereholder;
