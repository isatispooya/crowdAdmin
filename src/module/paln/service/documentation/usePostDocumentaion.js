import  { useMutation } from "@tanstack/react-query"
import useGetDocumentation from "./useGetDocumentation"
import { PostDocument } from "./api"


const usePostDocumentation = (cartId) =>{
    const {refetch} = useGetDocumentation(cartId)
    const {date, mutate, isPending,isError,isSuccess} = useMutation({
        mutationKey:['post other'],
        mutationFn: ({localData})=>PostDocument({cartId, localData}),
        onSettled: ()=>{
            refetch()
        }
    })
    return{
        date, mutate, isPending,isError,isSuccess
    }
}


export default usePostDocumentation