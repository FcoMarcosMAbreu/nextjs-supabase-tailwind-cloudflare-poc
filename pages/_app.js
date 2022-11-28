import { Auth } from '@supabase/ui'
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
