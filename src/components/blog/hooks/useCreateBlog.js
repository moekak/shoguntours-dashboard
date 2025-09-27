import { useMutation } from "@tanstack/react-query"
import { API_ENDPOINTS, MESSAGES } from "../../../config/config";
import axios from "axios";
import { useNavigate } from "react-router";
import { useCommonContext } from "../../../context/CommonContext";
import { apiClient } from "../../services/ApiClient";
import { useBlogOperatorContext } from "../context/BlogOperatorContext";



export function useCreateBlog(){
      const {fetchPostError,resetError} = useCommonContext()
      const {setIsBlogOperationSuccess, setBlogSuccessMessage, resetBlogOperationMessage} = useBlogOperatorContext()
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
                  navigate("/blogs")
                  setIsBlogOperationSuccess(true)
                  setBlogSuccessMessage({title: message?.title, message: message?.message})
                  setTimeout(()=>{
                        resetBlogOperationMessage()
                  }, 5000)

            }
      })


      return {
            mutate,
            isPending,
            error
      }
}