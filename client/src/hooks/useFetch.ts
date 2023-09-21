import { useState } from "react";

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
  //const [url, setUrl] = useState("");
  const [result, setResult] = useState<FetchResult<T>>({
    isLoading: false,
    error: null,
  });

  const fetchData = async (url: string, options: RequestOptions) => {
    setResult({ isLoading: true });
    //setUrl(url);
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
      setResult({ error: error.message.toString(), isLoading: false });
    }
  };

  // useEffect(() => {
  //   if (url) {
  //     setResult({ isLoading: false, error: null });
  //   }
  // }, [url]);

  return { fetchData, ...result };
};

export default useFetch;
