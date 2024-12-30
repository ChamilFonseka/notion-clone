'use client';

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  const { user } = useUser();

  return (
    <header className="flex items-center justify-between p-5">
      {user && (
        <h1 className="text-2xl">
          <Link href='/'>
            {user.firstName}
            {`'s Space`}
          </Link>
        </h1>
      )}

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

    </header>
  );
}
export default Header;