import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const usePostPic = (trace_code) => {
  const accessApi = getCookie('accessApi');

  // Define the function that sends the picture data
  const sendPlanPic = async (data) => {
    const response = await api.post(`/api/send/picture/${trace_code}`, data, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
        'Content-Type': 'application/json', // Ensure correct content type
      },
    });
    console.log(response.data)
    return response.data;
  };

  // Use mutation from react-query to handle the POST request
  const mutation = useMutation({
    mutationFn: (data) => sendPlanPic(data), // Pass the data to the function
    onSuccess: (data) => {
      console.log('Picture successfully posted:', data);
      // Add success handling logic, e.g., showing a success message
    },
    onError: (error) => {
      console.error('Error posting picture:', error);
      // Add error handling logic, e.g., showing an error notification
    },
    onMutate: () => {
      console.log('Posting picture...');
      // Optionally handle optimistic UI updates before mutation succeeds
    },
  });

  // Return the mutate function, isLoading (pending state), and isError
  return {
    mutate: mutation.mutate,
    isPending: mutation.isLoading, // Alias for loading state
    isError: mutation.isError,     // Error state
  };
};
