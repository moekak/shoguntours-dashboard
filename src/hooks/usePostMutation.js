import { mutationOptions, useMutation } from '@tanstack/react-query';
import { useCommonContext } from '../context/CommonContext';
import { apiClient } from '../components/services/ApiClient';

export function usePostMutation(endpoint, options = {}) {
    const { fetchPostError, fetchPostSuccess } = useCommonContext();
    const { fetchPost } = apiClient();
    const postData = async (data) => {
        return await fetchPost(endpoint, data);
    };

    const { isPending, mutate, error, data } = useMutation({
        mutationFn: postData,

        onError: (error) => {
            console.log(error);
            fetchPostError(error, options?.isModal); //共通失敗処理
        },
        onSuccess: (data) => {
            console.log(data);
            fetchPostSuccess(data, options); //共通成功処理
            options?.onSuccess?.(data);
        },
    });

    return {
        mutate,
        isPending,
        error,
        data,
    };
}
