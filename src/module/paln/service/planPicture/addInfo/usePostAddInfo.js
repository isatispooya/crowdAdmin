import { useMutation } from '@tanstack/react-query';
import { sendAddInfo } from './api';

export const usePostInfo = (trace_code) => {
  const mutation = useMutation({
    mutationFn: (data) => sendAddInfo(trace_code, data),
    onSuccess: (data) => {},
    onError: (error) => {
      console.error('Error posting:', error);
    },
    onMutate: () => {},
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isLoading,
    isError: mutation.isError,
  };
};
