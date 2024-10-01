import { useQuery } from '@tanstack/react-query';
import { GetGuarante } from './guaranteService';


const useGetGuarante = (trace_code) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['GetGuarante'],
    queryFn: () => GetGuarante(trace_code),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetGuarante;
