import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../config/config";
import { apiClient } from "../../services/ApiClient";


export function useFetchSpecificTour(id){
      const {fetchGet} = apiClient()
      const {data, isLoading, error} = useQuery({
            queryKey: ["tour", id], 
            queryFn: () => fetchGet(`${API_ENDPOINTS.API.GET_SPECIFIC_TOUR}/${id}`),
            keepPreviousData: false, 
      })

      const tour = data?.data

      console.log(tour);
      


      return {
            data: tour,
            error,
            isLoading
      }
}