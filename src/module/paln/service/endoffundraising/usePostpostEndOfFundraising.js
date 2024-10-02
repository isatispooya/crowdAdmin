import { useMutation } from '@tanstack/react-query';
import { postEndOfFundraising } from './api';

const usePostEndOfFundraising = (trace_code) => {
  const { data, mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['PostEndOfFundraising', trace_code],
    mutationFn: ({form}) => postEndOfFundraising({form, trace_code}),
  });
  
  return {
    data,
    mutate,
    isPending,
    isError,
    isSuccess,
  };
};

export default usePostEndOfFundraising;
