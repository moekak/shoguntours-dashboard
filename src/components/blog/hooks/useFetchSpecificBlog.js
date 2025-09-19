import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../config/config";
import axios from "axios";
import { apiClient } from "../../services/ApiClient";


export function useFetchSpecificBlog(id){
      const {fetchGet} = apiClient()
      const {data, isLoading, error} = useQuery({
            queryKey: ["blog", id], 
            queryFn: () => fetchGet(`${API_ENDPOINTS.API.GET_SPECIFIC_BLOG}/${id}`),
            keepPreviousData: false, 
      })

      const blog = data?.data

      console.log(blog);
      
      return {
            data: blog,
            error,
            isLoading
      }
}