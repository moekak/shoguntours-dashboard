import { useMutation } from "@tanstack/react-query"
import { API_ENDPOINTS, MESSAGES } from "../../../config/config";
import axios from "axios";
import { useNavigate } from "react-router";
import { useCommonContext } from "../../../context/CommonContext";
import { apiClient } from "../../services/ApiClient";



export function useCreateBlog(){
      const {fetchPostError,setSuccessMessage, setIsSuccess, resetError} = useCommonContext()
      const navigate = useNavigate()
      const {fetchPost} = apiClient()
      const createBlog= async(data) =>{
            resetError()
            return await fetchPost(API_ENDPOINTS.API.CREATE_BLOG, data)
      }

      const {isPending, mutate, error} = useMutation({
            mutationFn: createBlog,

            onError: (error)=>{
                  console.log(error);
                  fetchPostError(error)
            },
            onSuccess: (data)=>{
                  console.log(data);
                  const message = data?.message
                  
                  setIsSuccess(true)
                  setSuccessMessage({title: message?.title, message: message?.message})
                  navigate("/blogs")
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