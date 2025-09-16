import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../config/config";
import axios from "axios";
import { useToursContext } from "../context/ToursContext";


export function useFetchTour(){
      const {data, isLoading, error} = useQuery({
            queryKey: ["create"], 
            queryFn: () => axios.get(API_ENDPOINTS.API.GET_TOUR),
            keepPreviousData: false, 
      })

      const tours = data?.data?.data

      return {
            data: tours,
            error,
            isLoading
      }
}