import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetch = ( url ) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/${url}`
      );
      setData(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, url);
  return { data, loading, error };
};

export default useFetch;
