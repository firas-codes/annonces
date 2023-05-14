import { useState, useEffect, useCallback } from 'react';

export const useFetchVilles = (url) => {
    //   const [loading, setLoading] = useState(true);
    const [villes, setVilles] = useState([]);

    const getVilles = useCallback(async () => {
        const response = await fetch(url);
        const villesdata = await response.json();
        setVilles(villesdata.villes);
    }, [url]);

    useEffect(() => {
        getVilles();
    }, [url, getVilles]);
    return { villes };
};