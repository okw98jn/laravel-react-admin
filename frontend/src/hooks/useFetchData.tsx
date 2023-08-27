import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchData<T>(url: string) {
    const [data, setData]           = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError]         = useState(false);

    useEffect(() => {
        axios.get(url)
            .then((results) => {
                setData(results.data);
                setIsLoading(false);
            })
            .catch(() => {
                setError(true);
                setIsLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);
    return { data, isLoading, error };
}

export default useFetchData;