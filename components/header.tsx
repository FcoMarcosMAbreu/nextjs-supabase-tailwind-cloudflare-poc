/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import React from "react";
import Image from "next/image";
import supaLogo from "../public/supabase.webp";

const Header = () => {
  return (
    <header className="h-16 flex items-center container">
      <div className="flex-1">
        <Link
          legacyBehavior={false}
          href="/"
          className="flex items-center gap-3 text-2xl font-semibold"
        >
          Next.js + <Image height={30} src={supaLogo} alt="Supabase logo" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
