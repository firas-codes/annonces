import { useState, useEffect, useCallback } from 'react';

export const useFetchGouvernorats = (url) => {
    //   const [loading, setLoading] = useState(true);
      const [gouvernorats, setGouvernorats] = useState([]);
    
      const getGouvernorats = useCallback(async () => {
        const response = await fetch(url);
        const gouvernoratsdata = await response.json();
        setGouvernorats(gouvernoratsdata.gouvernorats);
      }, [url]);
    
      useEffect(() => {
        getGouvernorats();
      }, [url, getGouvernorats]);
      return { gouvernorats };
    };