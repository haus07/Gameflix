import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useState } from "react";
import "keen-slider/keen-slider.min.css"
import { Provider } from "react-redux";
import {store} from '../reduxToolKit/store'


export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
      <Component {...pageProps} />
        </Provider>
    </QueryClientProvider>
  );
}
