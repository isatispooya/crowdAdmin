import { useMutation } from '@tanstack/react-query';
import { fetchCards, PostFinish } from './cartService';

const usePatchFinish = (cartId) => {
  const { refetch } = fetchCards(cartId);
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ['cardFinish'],
    mutationFn: ({ formData }) => PostFinish({ cartId, formData }),
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

export default usePatchFinish;
