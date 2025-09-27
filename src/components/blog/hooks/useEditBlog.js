import { useMutation } from "@tanstack/react-query"
import { API_ENDPOINTS, MESSAGES } from "../../../config/config";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useCommonContext } from "../../../context/CommonContext";
import { apiClient } from "../../services/ApiClient";
import { useBlogOperatorContext } from "../context/BlogOperatorContext";



export function useEditBlog(){
      const {fetchPostError,resetError} = useCommonContext()
      const {setIsBlogOperationSuccess, setBlogSuccessMessage, resetBlogOperationMessage} = useBlogOperatorContext()
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