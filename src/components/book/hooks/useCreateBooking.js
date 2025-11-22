import { useMutation } from "@tanstack/react-query"
import { API_ENDPOINTS, MESSAGES } from "../../../config/config";
import { useNavigate } from "react-router";
import { useCommonContext } from "../../../context/CommonContext";
import { apiClient } from "../../services/ApiClient";


export function useCreateBooking(){
      const {fetchPostError} = useCommonContext()
      const {fetchPost} = apiClient()
      const CreateBooking= async(data) =>{
            return await fetchPost(API_ENDPOINTS.API.CREATE_TOUR_BOOKING, data)
      }

      const {isPending, mutate, error} = useMutation({
            mutationFn: CreateBooking,

            onError: (error)=>{
                  console.log(error);
                  
                  fetchPostError(error)
            },
            onSuccess: (data)=>{
                  console.log(data);


            }
      })


      return {
            mutate,
            isPending,
            error
      }
}