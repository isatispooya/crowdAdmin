import { useMutation }  from "@tanstack/react-query"
import useGetValidation from "./useGetValidation";
import { postValidation } from "./api";




const usePostValidation = (cartId) =>{
    const {refetch} = useGetValidation(cartId)
    const {mutate, isPending,isSuccess,isError,error} = useMutation({
        mutationKey: ['validationPost'],
        mutationFn: ({formData}) => postValidation({cartId, formData}),
        onSettled:()=>{
            refetch()
        }
      });
      return{
        mutate, isPending,isSuccess,isError,error
      }
}

export default usePostValidation