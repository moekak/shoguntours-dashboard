import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../config/config";
import axios from "axios";



export function useFetchBlogs(){
      const {data, isLoading, error} = useQuery({
            queryKey: ["create"], 
            queryFn: () => axios.get(API_ENDPOINTS.API.GET_BLOG),
            keepPreviousData: false, 
      })

      const blogs = data?.data?.data

      return {
            data: blogs,
            error,
            isLoading
      }
}