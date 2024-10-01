import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';


const accessApi =  getCookie('accessApi');


export const getComments = async(trac_code) =>{
    const response = await api.get(`/api/comment/admin/${trac_code}/`, {
        headers: {
          Authorization: `Bearer ${accessApi}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
}


export const postComment = async({trac_code,data}) =>{
    const response = await api.patch(
        `/api/comment/admin/${trac_code}/`,
        data,
        {
            headers: {
              Authorization: `Bearer ${accessApi}`,
              'Content-Type': 'application/json',
            },
          }
    )
    return response.data;
}
