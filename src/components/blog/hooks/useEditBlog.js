import { useMutation } from "@tanstack/react-query"
import { API_ENDPOINTS, MESSAGES } from "../../../config/config";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useCommonContext } from "../../../context/CommonContext";
import { apiClient } from "../../services/ApiClient";



export function useEditBlog(){
      const {fetchPostError, setSuccessMessage, setIsSuccess, resetError} = useCommonContext()
      const navigate = useNavigate()
      const {fetchPost} = apiClient()
      const {blogId} = useParams()
      const updateBlog= async(data) =>{
            resetError()
            return await fetchPost(`${API_ENDPOINTS.API.UPDATE_BLOG}/${blogId}`, data)
      }

      const {isPending, mutate, error} = useMutation({
            mutationFn: updateBlog,

            onError: (error)=>{
                  console.log(error);
                  fetchPostError(error)
                  
      
                  window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                  });


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