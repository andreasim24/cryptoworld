import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoExchangesHeaders = {
  "X-RapidAPI-Host": process.env.REACT_APP_EXCHANGES_RAPIDAPI_HOST,
  "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY
};

const createRequest = url => ({ url, headers: cryptoExchangesHeaders });

export const cryptoExchangesApi = createApi({
  reducerPath: "cryptoExchangesApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_EXCHANGES_URL }),
  endpoints: builder => ({
    getCryptoExchanges: builder.query({
      query: () => createRequest("/exchanges")
    })
  })
});

export const { useGetCryptoExchangesQuery } = cryptoExchangesApi;
