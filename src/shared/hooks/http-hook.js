import { useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const activeHttpRequests = useRef([]);
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      const httpAbortCtrl = new AbortController(); // constructor for manage request in browser js
      activeHttpRequests.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method: method,
          body: body,
          headers: headers,
          signal: httpAbortCtrl.signal, // assign for fetch until manage this request
        });
        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (item) => item !== httpAbortCtrl
        );

        //! response.ok => 200 status
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        return responseData;
      } catch (err) {
        throw err;
      }
    },
    []
  );

  //! find previous request nad abort it
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((item) => item.abort());
    };
  }, []);

  return { sendRequest };
};
