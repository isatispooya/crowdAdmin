import  { useMutation } from "@tanstack/react-query"
import { postOtherCases } from "./api"


const usePostOther = () =>{
    const {date, mutate, isPending,isError,isSuccess} = useMutation({
        mutationKey:['post other'],
        mutationFn: ({cartId, localData})=>postOtherCases({cartId, localData})
    })
    return{
        date, mutate, isPending,isError,isSuccess
    }
}


export default usePostOther