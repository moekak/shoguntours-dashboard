import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../config/config";
import axios from "axios";


export function useFetchCreateData(category){
      const {data, isLoading, error} = useQuery({
            queryKey: ["create"], 
            queryFn: () => axios.get(API_ENDPOINTS.API.FETCH_CREATE_DATA),
      })

      const info = data?.data?.data


      return {
            data: info,
            error,
            isLoading
      }
}