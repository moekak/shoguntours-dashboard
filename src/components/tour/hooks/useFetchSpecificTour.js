import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../config/config";
import axios from "axios";


export function useFetchSpecificTour(id){
      const {data, isLoading, error} = useQuery({
            queryKey: ["tour", id], 
            queryFn: () => axios.get(`${API_ENDPOINTS.API.GET_SPECIFIC_TOUR}/${id}`),
            keepPreviousData: false, 
      })

      const tour = data?.data?.data

      console.log(tour);
      


      return {
            data: tour,
            error,
            isLoading
      }
}