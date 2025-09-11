import { useQuery } from '@tanstack/react-query'
import { API_ENDPOINTS } from '../config/config'
import axios from 'axios'
export function useDashboard(category){
      const {data, isLoading, error} = useQuery({
            queryKey: ["blog", category], 
            queryFn: () => axios.get(`${API_ENDPOINTS.URL.DASHBOARD}`),
            keepPreviousData: false, 
      })

      const tour = data?.data?.data
      return {
            data : tour,
            error,
            isLoading
      }
}