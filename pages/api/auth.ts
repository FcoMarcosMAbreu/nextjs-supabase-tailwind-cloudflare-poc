/**
 * NOTE: this file is only needed if you're doing SSR (getServerSideProps)!
 */
/* import { supabase } from '../../lib/initSupabase'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res)
} */

// /pages/api/auth.ts
import { NextRequest } from "next/server";

const cookieKey = process.env.SUPABASE_COOKIE_KEY!;

// This is an edge API route, thus we are using modern Request and Response objects
// instead of the express syntax.
const handler = async (request: NextRequest) => {
  const { method } = request;
  const body = await request.json();

  if (method !== "post" || !body)
    return new Response("Bad Request", { status: 400 });

  const {
    event, // This is the event type, either "SIGNED_IN" or "SIGNED_OUT" (from supabase-js)
    session,
  } = body;

  // Validate request body
  if (!event) return new Response("Bad Request", { status: 400 });

  switch (event) {
    case "SIGNED_IN":
      // Here we need the session thus we must validate if it exists
      if (!session) return new Response("Bad Request", { status: 400 });

      // We are using the NextResponse object to gain access to the cookie methods
      const response = new NextResponse(null, {
        status: 200,
        statusText: "OK",
      });

      // Set the JWT cookie
      response.cookies.set(cookieKey, session.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 3600,
      });

      return response; // Return the response to the user
    case "SIGNED_OUT":
      // Delete the JWT cookie
      return new Response("OK", {
        status: 200,
        statusText: "OK",
        headers: {
          "Set-Cookie": `${cookieKey}=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure`, // Manually delete the cookie.
        },
      });
    default:
      return new Response("Bad Request", { status: 400 });
  }
};

export default handler;

export const config = {
  runtime: "experimental-edge",
};
