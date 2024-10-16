import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { GetGuarante } from './api';


const useGetGuarante = () => {

  const { trace_code } = useParams();

  const { data, isPending, isSuccess ,isError, error, refetch } = useQuery({
    queryKey: ['GetGuarante'],
    queryFn: () => GetGuarante(trace_code),
  });
  return {
    data,
    isPending,
    isSuccess,
    isError,
    error,
    refetch,
  };
};

export default useGetGuarante;