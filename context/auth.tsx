// /context/auth.tsx
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { onAuthStateChange } from "../lib/supabase";
import { proxy, useSnapshot } from "valtio";
import { useEffect } from "react";
import { useRouter } from "next/router";

export interface AuthStore {
  user: null | Session["user"];
  session: null | Session;
  loaded: boolean;
}

export const authStore = proxy<AuthStore>({
  user: null,
  session: null,
  loaded: false,
});

const setAuthCookie = (event: AuthChangeEvent, session: Session | null) => {
  return fetch("/api/auth", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify({ event, session }),
  });
};

export const useInitAuth = () => {
  const router = useRouter();
  useEffect(() => {
    const { data: subscription } = onAuthStateChange((event, session) => {
      authStore.user = session?.user ?? null;
      authStore.session = session ?? null;
      authStore.loaded = true;

      // Send the JWT access token to the server.
      setAuthCookie(
        authStore.session ? event : "SIGNED_OUT", // Sign the user out if the session is null (ignore other events)
        authStore.session
      ).then((res) => {
        if (!res.ok) return;

        // If the user is signed in and we are on the login page, redirect to the dashboard.
        if (authStore.user && router.pathname === "/login") {
          router.push("/dashboard");
        }
      });
    });

    return () => {
      subscription.subscription?.unsubscribe();
      /* subscription?.removeAllChannels(); */
    };

    // We are getting the latest pathname state regardless here as we are using object notion for the router. Disable eslint for this line.

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// State hooks
export const useSession = () => useSnapshot(authStore).session;
export const useUser = () => useSnapshot(authStore).user;
export const useAuthLoaded = () => useSnapshot(authStore).loaded;