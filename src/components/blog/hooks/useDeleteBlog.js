import { useMutation } from "@tanstack/react-query"
import { API_ENDPOINTS} from "../../../config/config";
import { useCommonContext } from "../../../context/CommonContext";
import { apiClient } from "../../services/ApiClient";
import { useBlogOperatorContext } from "../context/BlogOperatorContext";
import { useBlogsContext } from "../context/BlogsContext";


export function useDeleteBlog(){
      const {fetchPostError} = useCommonContext()
      const { setIsModalOpen,setIsBlogOperationSuccess,setBlogSuccessMessage, resetBlogOperationMessage} = useBlogOperatorContext()
      const {setBlogs, setOriginalBlogs} = useBlogsContext()
      const {fetchGet} = apiClient()
      const deleteBlog= async(blogId) =>{
            resetBlogOperationMessage()
            console.log(blogId);
            
            return await fetchGet(`${API_ENDPOINTS.API.DELETE_BLOG}/${blogId}`)
      }

      const {isPending, mutate, error} = useMutation({
            mutationFn: deleteBlog,

            onError: (error)=>{
                  console.log(error);
                  fetchPostError(error)
            },
            onSuccess: (data)=>{
                  console.log(data);
                  

                  const message = data?.message
                  setOriginalBlogs(data?.data?.blogs)
                  setBlogs(data?.data?.blogs)
                  setIsModalOpen(false)
                  setIsBlogOperationSuccess(true)
                  setBlogSuccessMessage({title: message?.title, message: message?.message})
                  setTimeout(()=>{
                        setIsBlogOperationSuccess(false)
                        setBlogSuccessMessage({})
                  }, 5000)

                  window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                  })
            }
      })


      return {
            mutate,
            isPending,
            error
      }
}