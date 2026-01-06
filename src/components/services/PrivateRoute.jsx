import { useEffect, useState } from 'react'
import { checkAuth } from './AuthService'
import PageLoading from '../common/PageLoading'
import { Navigate } from 'react-router'

const PrivateRoute = ({ children, redirectTo = '/signin' }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const token = localStorage.getItem('token')

    useEffect(() => {
        checkAuth(token)
            .then((user) => {
                setIsAuthenticated(!!user)
                console.log('認証結果:', user)
            })
            .catch((error) => {
                console.error('認証エラー:', error)
                setIsAuthenticated(false)
            })
    }, [token]) // 依存配列を追加

    if (isAuthenticated === null) {
        return <PageLoading /> // ローディング表示
    }

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} />
    }

    return children
}

export default PrivateRoute
