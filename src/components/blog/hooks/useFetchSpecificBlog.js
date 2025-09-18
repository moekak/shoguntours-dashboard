import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../config/config";
import axios from "axios";


export function useFetchSpecificBlog(id){
      const {data, isLoading, error} = useQuery({
            queryKey: ["blog", id], 
            queryFn: () => axios.get(`${API_ENDPOINTS.API.GET_SPECIFIC_BLOG}/${id}`),
            keepPreviousData: false, 
      })

      const blog = data?.data?.data

      console.log(blog);
      
      return {
            data: blog,
            error,
            isLoading
      }
}