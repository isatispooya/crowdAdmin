import { useMutation } from '@tanstack/react-query';
import { sendPlanPic } from './api';

export const usePostPic = (trace_code) => {
  const mutation = useMutation({
    mutationFn: (data) => sendPlanPic(trace_code,data),
    onSuccess: (data) => {},
    onError: (error) => {
      console.error('Error posting picture:', error);
    },
    onMutate: () => {},
  });
  return {
    mutate: mutation.mutate,
    isPending: mutation.isLoading,
    isError: mutation.isError,
  };
};
