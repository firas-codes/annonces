import { useState, useEffect, useCallback } from 'react';

export const useFetchPays = (url) => {
    //   const [loading, setLoading] = useState(true);
      const [pays, setPays] = useState([]);
    
      const getPays = useCallback(async () => {
        const response = await fetch(url);
        const paysdata = await response.json();
        setPays(paysdata.pays);
      }, [url]);
    
      useEffect(() => {
        getPays();
      }, [url, getPays]);
      return { pays };
    };