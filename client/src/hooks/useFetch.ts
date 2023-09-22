import { useState } from "react";
import { useNavigate } from "react-router-dom";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type Credentials = "include" | "same-origin" | "omit";

interface RequestOptions {
  method: HttpMethod;
  body?: any;
  headers?: HeadersInit;
  credentials?: Credentials;
}

interface FetchResult<T> {
  data?: T;
  error?: Error | unknown | null;
  isLoading: boolean;
}

const useFetch = <T>() => {
  const [result, setResult] = useState<FetchResult<T>>({
    isLoading: false,
    error: null,
  });

  const navigate = useNavigate();
  const fetchData = async (url: string, options: RequestOptions) => {
    setResult({ isLoading: true });
    try {
      const response = await fetch(url, {
        method: options.method ? options.method : "GET",
        body: options.body ? JSON.stringify(options.body) : undefined,
        headers: options.headers || { "Content-Type": "application/json" },
        credentials: options.credentials ? options.credentials : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setResult({ data, isLoading: false });

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      if (error.message === "Failed to fetch") {
        navigate("/404");
      }
      setResult({ error: error.message.toString(), isLoading: false });
    }
  };

  return { fetchData, ...result };
};

export default useFetch;
