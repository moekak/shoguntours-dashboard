import { useMutation } from "@tanstack/react-query"
import { API_ENDPOINTS} from "../../../config/config";
import { useNavigate, useParams } from "react-router";
import { useCommonContext } from "../../../context/CommonContext";
import { apiClient } from "../../services/ApiClient";


export function useEditTour(){
      const {setSuccessMessage,fetchPostError, setIsSuccess, resetError} = useCommonContext()
      const {tourId} = useParams()
      const navigate = useNavigate()
      const {fetchPost} = apiClient()

      const EditTour= async(data) =>{
            resetError()
            return await fetchPost(`${API_ENDPOINTS.API.UPDATE_TOUR}/${tourId}`, data)
      }

      const {isPending, mutate, error} = useMutation({
            mutationFn: EditTour,

            onError: (error)=>{
                  console.log(error);
                  
                  fetchPostError(error)
            },
            onSuccess: (data)=>{
                  console.log(data);
                  const message = data?.message
                  
                  setIsSuccess(true)
                  setSuccessMessage({title: message?.title, message: message?.message})
                  navigate("/tours")
                  setTimeout(()=>{
                        setIsSuccess(false)
                        setSuccessMessage({})
                  }, 5000)
                  
                  // resetTour()
                  // resetError()
                  // setIsSuccess(true)
                  // console.log(data);

                  // window.scrollTo({
                  //       top: 0,
                  //       behavior: 'smooth'
                  // });

            }
      })


      return {
            mutate,
            isPending,
            error
      }
}