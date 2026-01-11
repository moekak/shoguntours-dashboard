import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../../../config/config';
import { apiClient } from '../../services/ApiClient';

export function useFetchCreateData() {
    const { fetchGet } = apiClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ['create'],
        queryFn: () => fetchGet(API_ENDPOINTS.API.FETCH_CREATE_DATA),
    });

    const info = data?.data;

    return {
        data: info,
        error,
        isLoading,
    };
}
