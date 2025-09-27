import { useMutation } from "@tanstack/react-query"
import { API_ENDPOINTS} from "../../../config/config";
import { useTourOperatorContext } from "../context/TourOperatorContext";
import { useNavigate } from "react-router";
import { useCommonContext } from "../../../context/CommonContext";
import { apiClient } from "../../services/ApiClient";
import { useToursContext } from "../context/ToursContext";


export function useDeleteTour(){
      const {fetchPostError} = useCommonContext()
      const { setIsModalOpen,setIsTourOperationSuccess,setTourSuccessMessage, resetTourOperationMessage} = useTourOperatorContext()
      const {setTours, setOriginalTours} = useToursContext()
      const navigate = useNavigate()
      const {fetchGet} = apiClient()
      const deleteTour= async(tourId) =>{
            resetTourOperationMessage()
            return await fetchGet(`${API_ENDPOINTS.API.DELETE_TOUR}/${tourId}`)
      }

      const {isPending, mutate, error} = useMutation({
            mutationFn: deleteTour,

            onError: (error)=>{
                  console.log(error);
                  fetchPostError(error)
            },
            onSuccess: (data)=>{

                  const message = data?.message
                  setOriginalTours(data?.data?.tours)
                  setTours(data?.data?.tours)
                  setIsModalOpen(false)
                  setIsTourOperationSuccess(true)
                  setTourSuccessMessage({title: message?.title, message: message?.message})
                  setTimeout(()=>{
                        setIsTourOperationSuccess(false)
                        setTourSuccessMessage({})
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