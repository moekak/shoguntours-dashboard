import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../components/services/ApiClient'
import { useCommonContext } from '../context/CommonContext'
import { useEffect } from 'react'
import { useBookingContext } from '../components/book/context/BookingContext'

export function useFetchData(endpoint, queryKey, id = null) {
    const { fetchGet } = apiClient()
    const { internalServerError } = useCommonContext()
    const {setBookingData} = useBookingContext()

    const { data, isLoading, error } = useQuery({
        queryKey: id ? [queryKey, id] : [queryKey],
        queryFn: () => fetchGet(endpoint),
        retry: 0,
    })

    //  useEffectでエラーを監視
    useEffect(() => {
        if (error) {
            console.log(error)
            internalServerError()
        }
    }, [error])

    const responseData = data?.data?.data ?? data?.data

    useEffect(()=>{
        setBookingData(responseData)
    },[responseData])
    

    return {
        data: responseData,
        error,
        isLoading,
    }
}
