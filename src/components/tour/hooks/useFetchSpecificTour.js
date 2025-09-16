import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../config/config";
import axios from "axios";


export function useFetchSpecificTour(id){
      const {data, isLoading, error} = useQuery({
            queryKey: ["tour", id], 
            queryFn: () => axios.get(`${API_ENDPOINTS.API.GET_SPECIFIC_TOUR}/${id}`),
      })

      const tour = data?.data?.data


      return {
            data: tour,
            error,
            isLoading
      }
}