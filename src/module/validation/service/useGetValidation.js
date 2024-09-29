import  { useQuery } from "@tanstack/react-query"
import { getValidation } from "./api"


const useGetValidation = (cartId) =>{
    const {data,isPending,isError,error, refetch} = useQuery({
        queryKey:['validation' , cartId],
        queryFn: ()=>getValidation(cartId)
    })
    return{
        data,isPending,isError,error, refetch
    }
}

export default useGetValidation