//import type { NextPage } from 'next'
import Head from 'next/head'
import Image from '../components/Image'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'
//import { createClient, Session } from "@supabase/supabase-js"
//import { definitions } from "../types/supabase"

//const Home: NextPage = () => {
const Home = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </div>
  )
}

export default Home
