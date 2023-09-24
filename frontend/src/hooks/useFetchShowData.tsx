import { useState, useEffect } from 'react';

import { axiosClient } from '../Axios/AxiosClientProvider'

function useFetchShowData<T>(url: string) {
    const [data, setData] = useState<T>();

    useEffect(() => {
        axiosClient.get(url)
            .then((results) => {
                setData(results.data);
            })
            .catch((error) => {
                throw error
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);
    return { data, setData };
}

export default useFetchShowData;