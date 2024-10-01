import { useMutation } from '@tanstack/react-query';
import useGetGuarante from './useGetGuarante';
import { PostGuarante } from './guaranteService';

const usePostGuarante = (trace_code) => {
  const { refetch } = useGetGuarante(trace_code);
  const { date, mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['PostGuarante',trace_code],
    mutationFn: (postData) => PostGuarante(trace_code, postData),
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

export default usePostGuarante;





