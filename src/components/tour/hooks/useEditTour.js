import { useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../../../config/config';
import { useNavigate, useParams } from 'react-router';
import { useCommonContext } from '../../../context/CommonContext';
import { apiClient } from '../../services/ApiClient';
import { useTourOperatorContext } from '../context/TourOperatorContext';

export function useEditTour() {
    const { fetchPostError } = useCommonContext();
    const {
        setIsTourOperationSuccess,
        setTourSuccessMessage,
        resetTourOperationMessage,
    } = useTourOperatorContext();
    const { tourId } = useParams();
    const { fetchPost } = apiClient();
    const navigate = useNavigate();

    const EditTour = async (data) => {
        console.log('222222');

        resetTourOperationMessage();
        setTourSuccessMessage({});
        return await fetchPost(
            `${API_ENDPOINTS.API.UPDATE_TOUR}/${tourId}`,
            data
        );
    };

    const { isPending, mutate, error } = useMutation({
        mutationFn: EditTour,

        onError: (error) => {
            console.log(error);
            fetchPostError(error);
        },
        onSuccess: (data) => {
            console.log(data);

            const message = data?.message;
            navigate('/tours');
            setIsTourOperationSuccess(true);
            setTourSuccessMessage({
                title: message?.title,
                message: message?.message,
            });
            setTimeout(() => {
                resetTourOperationMessage();
            }, 5000);
        },
    });

    return {
        mutate,
        isPending,
        error,
    };
}
