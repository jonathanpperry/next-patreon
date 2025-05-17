import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header>
      {/* Left side */}
      <div>
        <Link href="/">
          <h2>Creator Site</h2>
        </Link>
      </div>

      {/* Right side */}
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
