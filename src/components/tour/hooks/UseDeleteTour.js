import { useMutation } from "@tanstack/react-query"
import { API_ENDPOINTS} from "../../../config/config";
import axios from "axios";
import { useTourOperatorContext } from "../context/TourOperatorContext";
import { useNavigate } from "react-router";


export function UseDeleteTour(){
      const {setErrors, setErrorFields, setErrorTitle, setIsModalOpen, resetError, setIsSuccess,setSuccessMessage} = useTourOperatorContext()
      const navigate = useNavigate()
      const deleteTour= async(tourId) =>{
            resetError()
            const response = await axios.get(`${API_ENDPOINTS.API.DELETE_TOUR}/${tourId}`, {
                  headers: {
                        'Content-Type': 'multipart/form-data',
                  },
            });
            return response.data
      }

      const {isPending, mutate, error} = useMutation({
            mutationFn: deleteTour,

            onError: (error)=>{
                  console.log(error);
                  // const errorCode = error?.response?.data?.error?.code
                  // const errorMsgs = error?.response?.data?.error?.details
                  // if(errorCode === "INTERNAL_SERVER_ERROR"){
                  //       setErrors(MESSAGES.ERROR.SYSTEM_ERROR)
                  //       setErrorTitle(MESSAGES.ERROR.SYSTEM_ERROR_TITLE)

                  // }else if(errorCode === "VALIDATION_ERROR"){
                  //       setErrorTitle(MESSAGES.ERROR.VALIDATION_ERROR_TITLE)
                  //       setErrorsMessages(errorMsgs)
                  //       setErrors(()=>{
                  //             return Object.entries(errorMsgs).reduce((acc, [title, messages])=>{
                  //                   acc.push(...messages)
                  //                   return acc
                  //             },[])
                  //       })
                  //       setErrorFields(()=>{
                  //             return Object.entries(errorMsgs).reduce((acc, [title, _])=>{
                  //                   acc.add(title)
                  //                   return acc
                  //             },new Set())
                  //       })
                  // }
                  
      
                  window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                  });


            },
            onSuccess: (data)=>{
                  console.log(data);
                  const message = data?.message
                  
                  setIsModalOpen(false)
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