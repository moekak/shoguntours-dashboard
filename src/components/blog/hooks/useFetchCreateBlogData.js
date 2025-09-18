import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../config/config";
import axios from "axios";

export function useFetchCreateBlogData(){
      const {data, isLoading, error} = useQuery({
            queryKey: ["create"], 
            queryFn: () => axios.get(API_ENDPOINTS.API.FETCH_CREATE_BLOG),
            keepPreviousData: false, 
      })

      const categories = data?.data?.data

      return {
            data: categories,
            error,
            isLoading
      }
}