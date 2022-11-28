// <root>/middleware.ts
import { supabase } from "lib/supabase";
import { NextRequest, NextResponse } from "next/server";

const middleware = async (request: NextRequest) => {
  // Get the cookie from the request
  const access_token = request.cookies.get(process.env.SUPABASE_COOKIE_KEY!);

  // If the cookie is not set, redirect to the login page
  if (!access_token) {
    return NextResponse.redirect("/login");
  }

  // If the cookie is set, make sure the JWT is valid
  const { data: user, error } = await supabase.auth.api.getUser(access_token);

  // If the JWT is not valid, redirect to the login page
  if (error || !user) {
    // Here we MUST wipe the access token as well. Otherwise the user will be stuck in a redirect loop.

    return NextResponse.redirect("/login", {
      headers: {
        "Set-Cookie": `${process.env.SUPABASE_COOKIE_KEY}=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure`, // Manually delete the cookie.
      },
    });
  }

  // If the JWT is valid, pass the request to the API route or page
  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"], // This is the path we want to protect
};
