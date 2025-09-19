import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../config/config";
import axios from "axios";
import { apiClient } from "../../services/ApiClient";



export function useFetchBlogs(){
      const {fetchGet} = apiClient()
      const {data, isLoading, error} = useQuery({
            queryKey: ["create"], 
            queryFn: () => fetchGet(API_ENDPOINTS.API.GET_BLOG),
            keepPreviousData: false, 
      })

      const blogs = data?.data

      return {
            data: blogs,
            error,
            isLoading
      }
}