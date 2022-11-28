/**
 * NOTE: this file is only needed if you're doing SSR (getServerSideProps)!
 */
import { supabase } from '../../lib/initSupabase'

export const config = {
  runtime: 'experimental-edge',
}

export default function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res)
}
