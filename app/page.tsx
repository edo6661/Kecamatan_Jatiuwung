"use client"
import { Heading } from "@/components/custom-ui/heading";
import Image from "next/image";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <Heading>Gedong memek</Heading>
    <SignedIn>
    <UserButton afterSignOutUrl="/"/>
    </SignedIn>
    <SignedOut>
      <Button asChild variant="secondary">
        <Link href="/sign-in">Sign in</Link>
      </Button>
    </SignedOut>    
    </>
  );
}
