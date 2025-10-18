import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../components/services/ApiClient";

export function useFetchData(endpoint, queryKey, id = null) {
      const { fetchGet } = apiClient();
      
      const { data, isLoading, error } = useQuery({
            queryKey: id ? [queryKey, id] : [queryKey],
            queryFn: () => fetchGet(endpoint),
      });

      const responseData = data?.data?.data;

      return {
            data: responseData,
            error,
            isLoading
      };
}