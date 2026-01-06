import { useMutation } from '@tanstack/react-query'
import { API_ENDPOINTS, MESSAGES } from '../../../config/config'
import { useNavigate } from 'react-router'
import { useCommonContext } from '../../../context/CommonContext'
import { apiClient } from '../../services/ApiClient'
import { useTourOperatorContext } from '../context/TourOperatorContext'

export function useCreateTour() {
    const { fetchPostError } = useCommonContext()
    const {
        setIsTourOperationSuccess,
        setTourSuccessMessage,
        resetTourOperationMessage,
    } = useTourOperatorContext()
    const { fetchPost } = apiClient()
    const navigate = useNavigate()
    const createTour = async (data) => {
        resetTourOperationMessage()
        return await fetchPost(API_ENDPOINTS.API.CREATE_TOUR, data)
    }

    const { isPending, mutate, error } = useMutation({
        mutationFn: createTour,

        onError: (error) => {
            fetchPostError(error)
        },
        onSuccess: (data) => {
            const message = data?.message
            navigate('/tours')
            setIsTourOperationSuccess(true)
            setTourSuccessMessage({
                title: message?.title,
                message: message?.message,
            })
            setTimeout(() => {
                resetTourOperationMessage()
            }, 5000)
        },
    })

    return {
        mutate,
        isPending,
        error,
    }
}
