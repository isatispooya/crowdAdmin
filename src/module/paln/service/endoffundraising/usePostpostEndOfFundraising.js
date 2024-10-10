import { useMutation } from '@tanstack/react-query';
import { postEndOfFundraising } from './api';

const usePostEndOfFundraising = (trace_code,form) => {
  console.log('2',form);
  
  const { data, mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['PostEndOfFundraising', trace_code],
    mutationFn: () => postEndOfFundraising({ trace_code,form }),
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
