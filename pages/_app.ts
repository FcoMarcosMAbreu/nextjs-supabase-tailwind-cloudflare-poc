/* import { Auth } from '@supabase/ui'
import { supabase } from '../lib/initSupabase'
import './../style.css'
//import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <main className={'dark'}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    </main>
  )
}

export default MyApp
 */

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import Header from "../components/header";
import { useInitAuth } from "context/auth";

interface Props extends AppProps {
  Component: NextPage & {
    getLayout?: (page: React.ReactNode) => React.ReactNode;
  };
}

function MyApp({ Component, pageProps }: Props) {
  useInitAuth();
  return (
    <>
      <Header />
      {Component.getLayout ? (
        Component.getLayout(<Component {...pageProps} />)
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
