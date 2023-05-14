import { useState, useEffect, useCallback } from 'react';

export const useFetchCategories = (url) => {
//   const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const getCategories = useCallback(async () => {
    const response = await fetch(url);
    const categories = await response.json();
    setCategories(categories.categories);
  }, [url]);

  useEffect(() => {
    getCategories();
  }, [url, getCategories]);
  return { categories };
};