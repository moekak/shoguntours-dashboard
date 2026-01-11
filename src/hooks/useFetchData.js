import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../components/services/ApiClient';
import { useCommonContext } from '../context/CommonContext';
import { useEffect } from 'react';
import { useBookingContext } from '../components/book/context/BookingContext';

export function useFetchData(endpoint, queryKey, options={}) {
    const { fetchGet } = apiClient();
    const { internalServerError } = useCommonContext();
    const { setBookingData } = useBookingContext();

    const { data, isLoading, error } = useQuery({
        queryKey: options.id ? [queryKey, options.id] : [queryKey],
        queryFn: () => fetchGet(endpoint),
        retry: 0,
    });

     const responseData = data?.data?.data ?? data?.data;


    //  useEffectでエラーを監視
    useEffect(() => {
        if (error) {
            console.log(error);
            internalServerError();
        }
    }, [error]);



    useEffect(() => {
        if (data) {
            console.log(responseData)
            options.onSuccess?.(responseData);
        }
    }, [responseData]);

    return {
        data: responseData,
        error,
        isLoading,
    };
}
