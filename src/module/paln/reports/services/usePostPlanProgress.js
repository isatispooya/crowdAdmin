import { useMutation } from '@tanstack/react-query';
import useGetProgress from './useGetPlanProgress';
import { PostProgress } from './get&postProgress';

const usePostProgress = (trace_code) => {
  const { refetch } = useGetProgress(trace_code);
  const { date, mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['postdocument', trace_code],
    mutationFn: (postData) => PostProgress(trace_code, postData),
    onSettled: () => {
      refetch();
    },
  });
  return {
    date,
    mutate,
    isPending,
    isError,
    isSuccess,
  };
};

export default usePostProgress;
