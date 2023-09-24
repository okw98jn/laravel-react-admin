import { useState, useEffect } from 'react';

import { axiosClient } from '../Axios/AxiosClientProvider'

function useFetchShowData<T>(url: string) {
    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosClient.get(url)
            .then((results) => {
                setData(results.data);
                setIsLoading(false);
            })
            .catch((error) => {
                throw error
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);
    return { data, setData, isLoading };
}

export default useFetchShowData;