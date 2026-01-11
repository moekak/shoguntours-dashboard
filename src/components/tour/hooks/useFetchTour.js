import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../../../config/config';
import { apiClient } from '../../services/ApiClient';

export function useFetchTour() {
    const { fetchGet } = apiClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ['create'],
        queryFn: async () => fetchGet(API_ENDPOINTS.API.GET_TOUR),
        keepPreviousData: false,
    });

    const tours = data?.data;

    return {
        data: tours,
        error,
        isLoading,
    };
}
