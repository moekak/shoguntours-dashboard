import { useMutation } from "@tanstack/react-query"
import { API_ENDPOINTS} from "../../../config/config";
import { useTourOperatorContext } from "../context/TourOperatorContext";
import { useNavigate } from "react-router";
import { useCommonContext } from "../../../context/CommonContext";
import { apiClient } from "../../services/ApiClient";


export function UseDeleteTour(){
      const {fetchPostError, setSuccessMessage, setIsSuccess, resetError} = useCommonContext()
      const { setIsModalOpen} = useTourOperatorContext()
      const navigate = useNavigate()
      const {fetchGet} = apiClient()
      const deleteTour= async(tourId) =>{
            resetError()
            return await fetchGet(`${API_ENDPOINTS.API.DELETE_TOUR}/${tourId}`)
      }

      const {isPending, mutate, error} = useMutation({
            mutationFn: deleteTour,

            onError: (error)=>{
                  console.log(error);
                  fetchPostError(error)
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