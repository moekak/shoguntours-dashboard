import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../config/config";
import axios from "axios";
import { apiClient } from "../../services/ApiClient";

export function useFetchCreateBlogData(){
      const {fetchGet} = apiClient()
      const {data, isLoading, error} = useQuery({
            queryKey: ["create"], 
            queryFn: () => fetchGet(API_ENDPOINTS.API.FETCH_CREATE_BLOG),
            keepPreviousData: false, 
      })

      const categories = data?.data

      return {
            data: categories,
            error,
            isLoading
      }
}