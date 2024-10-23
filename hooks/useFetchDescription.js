// useFetchDescription.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchDescription = (surahNumber) => {
  const [description, setDescription] = useState(null);
  const [loadingDescription, setLoadingDescription] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (surahNumber) {
      const fetchDescription = async () => {
        setLoadingDescription(true);
        try {
          const response = await axios.get(`https://api.alquran.cloud/v1/ayah/${surahNumber}/en.asad`);
          setDescription(response.data.data.text);  // Set the description text from API
        } catch (err) {
          setError(err.message);
        } finally {
          setLoadingDescription(false);
        }
      };

      fetchDescription();
    }
  }, [surahNumber]);  // Effect will run every time `surahNumber` changes

  return { description, loadingDescription, error };
};

export default useFetchDescription;
