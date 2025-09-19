import { useMutation } from "@tanstack/react-query"
import { API_ENDPOINTS, MESSAGES } from "../../../config/config";
import { useNavigate } from "react-router";
import { useCommonContext } from "../../../context/CommonContext";
import { apiClient } from "../../services/ApiClient";



export function useCreateTour(){
      const {fetchPostError, setSuccessMessage, setIsSuccess, resetError} = useCommonContext()
      const navigate = useNavigate()
      const {fetchPost} = apiClient()
      const createTour= async(data) =>{
            resetError()
            return await fetchPost(API_ENDPOINTS.API.CREATE_TOUR, data)
      }

      const {isPending, mutate, error} = useMutation({
            mutationFn: createTour,

            onError: (error)=>{
                  console.log("エラーだよ");
                  
                  console.log(error);
                  fetchPostError(error)
            },
            onSuccess: (data)=>{
                  console.log("成功");
                  
                  console.log(data);
                  const message = data?.message
                  
                  setIsSuccess(true)
                  setSuccessMessage({title: message?.title, message: message?.message})
                  navigate("/tours")
                  setTimeout(()=>{
                        setIsSuccess(false)
                        setSuccessMessage({})
                  }, 5000)

            }
      })


      return {
            mutate,
            isPending,
            error
      }
}