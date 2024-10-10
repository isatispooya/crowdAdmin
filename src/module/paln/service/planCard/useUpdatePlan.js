import { useMutation } from '@tanstack/react-query';
import { updatePlan } from './api';
import useGetCard from './useGetCard';

const useUpdatePlan = () => {
  const { refetch } = useGetCard();

  const {
    mutate,
    isLoading: isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationKey: ['updatePlan'],
    mutationFn: (planData) => updatePlan(planData),
    onSettled: () => {
      refetch();
    },
  });

  return {
    mutate,
    isPending,
    isError,
    isSuccess,
  };
};

export default useUpdatePlan;
