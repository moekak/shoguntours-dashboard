import { useMutation } from "@tanstack/react-query"
import { API_ENDPOINTS, MESSAGES } from "../../../config/config";
import axios from "axios";
import { useTourOperatorContext } from "../context/TourOperatorContext";


export function useCreateTour(){
      const {setErrors, setErrorFields, setErrorTitle, resetTour, resetError, setIsSuccess, setErrorsMessages} = useTourOperatorContext()
      const createTour= async(data) =>{
            resetError()
            const response = await axios.post(API_ENDPOINTS.API.CREATE_TOUR, data, {
                  headers: {
                        'Content-Type': 'multipart/form-data',
                  },
            });
            return response.data
      }

      const {isPending, mutate, error} = useMutation({
            mutationFn: createTour,

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
                  resetTour()
                  resetError()
                  setIsSuccess(true)
                  console.log(data);

                  window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                  });

            }
      })


      return {
            mutate,
            isPending,
            error
      }
}