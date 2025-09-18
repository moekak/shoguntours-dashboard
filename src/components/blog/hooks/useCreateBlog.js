import { useMutation } from "@tanstack/react-query"
import { API_ENDPOINTS, MESSAGES } from "../../../config/config";
import axios from "axios";
import { useNavigate } from "react-router";
import { useCommonContext } from "../../../context/CommonContext";



export function useCreateBlog(){
      const {setErrorTitle,setErrorFields, setErrors, setErrorsMessages,setSuccessMessage, setIsSuccess, resetError} = useCommonContext()
      const navigate = useNavigate()
      const createBlog= async(data) =>{
            resetError()
            const response = await axios.post(API_ENDPOINTS.API.CREATE_BLOG, data, {
                  headers: {
                        'Content-Type': 'multipart/form-data',
                  },
            });
            return response.data
      }

      const {isPending, mutate, error} = useMutation({
            mutationFn: createBlog,

            onError: (error)=>{
                  console.log(error);
                  const errorCode = error?.response?.data?.error?.code
                  const errorMsgs = error?.response?.data?.error?.details
                  if(errorCode === "INTERNAL_SERVER_ERROR"){
                        setErrors(MESSAGES.ERROR.SYSTEM_ERROR)
                        setErrorTitle(MESSAGES.ERROR.SYSTEM_ERROR_TITLE)

                  }else if(errorCode === "VALIDATION_ERROR"){
                        setErrorTitle(MESSAGES.ERROR.VALIDATION_ERROR_TITLE)
                        setErrorsMessages(errorMsgs)
                        setErrors(()=>{
                              return Object.entries(errorMsgs).reduce((acc, [title, messages])=>{
                                    acc.push(...messages)
                                    return acc
                              },[])
                        })
                        setErrorFields(()=>{
                              return Object.entries(errorMsgs).reduce((acc, [title, _])=>{
                                    acc.add(title)
                                    return acc
                              },new Set())
                        })
                  }
                  
      
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
                  navigate("/blogs/550e8400-e29b-41d4-a716-446655440000")
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