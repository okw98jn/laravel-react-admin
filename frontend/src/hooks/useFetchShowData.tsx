import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { axiosClient } from '../Axios/AxiosClientProvider'
import { loadingState } from '../Recoil/Admin/loading';

function useFetchShowData<T>(url: string) {
    const [data, setData]           = useState<T>();
    const [isLoading, setIsLoading] = useRecoilState(loadingState);

    useEffect(() => {
        setIsLoading(true);
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
    return { data, setData, isLoading, setIsLoading };
}

export default useFetchShowData;