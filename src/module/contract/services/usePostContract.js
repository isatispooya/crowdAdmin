import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const postContract = async ({ cartId, contractData }) => {
  console.log('fggggg', contractData);

  const access = getCookie('access');

  const response = await api.post(
    `/api/setcart/admin/${cartId}/`,
    contractData,
    {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.cart;
};

const UsePostContract = (cartId) => {
  const { mutate, isLoading, IsError, isPending, error } = useMutation({
    mutationKey: ['contract', cartId],
    mutationFn: (contractData) => postContract({ cartId, contractData }),
  });
  return {
    mutate,
    isLoading,
    IsError,
    isPending,
    error,
  };
};

export default UsePostContract;
