import React, { useState } from 'react'
import axios from 'axios'

import { API_URL } from '../consts/CommonConst'
import { NotFound } from '../Pages/NotFound'

export const axiosClient = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export function AxiosClientProvider({ children }: { children: React.ReactElement }) {
    const [NotFoundError, setNotFoundError] = useState<boolean>(false);

    React.useEffect(() => {
        // リクエスト インターセプター
        const requestInterceptors = axiosClient.interceptors.request.use((config) => {
            if (config.headers !== undefined) {
                //ログ処理等記述
            }
            return config
        })

        // レスポンス インターセプター
        const responseInterceptor = axiosClient.interceptors.response.use(
            (response) => {
                return response
            },
            (error) => {
                switch (error.response?.status) {
                    case 404:
                        setNotFoundError(true);
                        break
                    default:
                        setNotFoundError(true);
                }
                return Promise.reject(error)
            }
        )
        // クリーンアップ
        return () => {
            axiosClient.interceptors.request.eject(requestInterceptors)
            axiosClient.interceptors.response.eject(responseInterceptor)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (NotFoundError) return <NotFound />;
    return (<>{children}</>)
}