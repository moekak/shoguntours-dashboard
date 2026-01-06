import axios from 'axios'
import { API_ENDPOINTS } from '../../config/config'

export const checkAuth = async (token) => {
    try {
        const response = await axios.get(API_ENDPOINTS.API.AUTH_USER, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        console.log(error)

        return null
    }
}
