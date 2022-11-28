import {
  AuthChangeEvent,
  createClient,
  SupabaseClient,
} from "@supabase/supabase-js";

const isServer = typeof window === "undefined";

/**
 * Supabase key. Safe to expose as tree-shaking will remove the secret key in the browser.
 */
const supabaseKey = isServer
  ? process.env.SUPABASE_SERVICE_KEY
  : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Supabase client that can be used both on the server, the edge runtime and in the browser.
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey!
);

export const onAuthStateChange: SupabaseClient["auth"]["onAuthStateChange"] = (
  callback
) => {
  // Until https://github.com/supabase/gotrue-js/issues/313 is resolved
  // Fire the callback once with the user session if authenticated.

  const session = supabase.auth.session();

  if (session) {
    const event: AuthChangeEvent = "SIGNED_IN";
    callback(event, session);
  }
  return supabase.auth.onAuthStateChange(callback);
};
