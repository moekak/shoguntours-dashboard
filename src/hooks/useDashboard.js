import { useQuery } from '@tanstack/react-query'
import { API_ENDPOINTS } from '../config/config'
import { apiClient } from '../components/services/ApiClient'
export function useDashboard(category){
      const {fetchGet} = apiClient()
      const {data, isLoading, error} = useQuery({
            queryKey: ["blog", category], 
            queryFn: () => fetchGet(`${API_ENDPOINTS.URL.DASHBOARD}`),
            keepPreviousData: false, 
      })

      const tour = data?.data
      return {
            data : tour,
            error,
            isLoading
      }
}