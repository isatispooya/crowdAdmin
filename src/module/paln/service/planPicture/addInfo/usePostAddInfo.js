import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const usePostInfo = (trace_code) => {
  const accessApi = getCookie('accessApi');

  // Define the function that sends the information data
  const sendAddInfo = async (data) => {
    const response = await api.post(`/api/information/plan/admin/${trace_code}/`, data, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  };

  const mutation = useMutation({
    mutationFn: (data) => sendAddInfo(data),
    onSuccess: (data) => {
      console.log('Successfully posted:', data);
    },
    onError: (error) => {
      console.error('Error posting:', error);
    },
    onMutate: () => {
      console.log('Posting...');
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isLoading,
    isError: mutation.isError,
  };
};
