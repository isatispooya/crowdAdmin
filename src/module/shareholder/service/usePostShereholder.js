import { useMutation } from '@tanstack/react-query';
import { postShareholder } from './api';
import useGetShereholder from './useGetShareholder';

const usePostShereHolder = (cartId) => {
  const { refetch } = useGetShereholder(cartId);
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ['postShereholder'],
    mutationFn: ({ formData }) => postShareholder({ cartId, formData }),
    onSettled: () => {
      refetch();
    },
  });
  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export default usePostShereHolder;
