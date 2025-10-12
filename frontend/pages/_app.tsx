import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useState } from "react";
import "keen-slider/keen-slider.min.css"
import { Provider } from "react-redux";
import { store } from '../reduxToolKit/store'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from "@/context/AuthContext";


export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
         <Toaster position="top-right" reverseOrder={false} />
        </Provider>
    </QueryClientProvider>
    </AuthProvider>
  );
}
