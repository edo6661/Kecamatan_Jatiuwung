import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCurrentUser } from "@/services/user";
import { Heading } from "./custom-ui/heading";
const Header = async () => {
  const currentUser = await getCurrentUser()




  return (
    <div className='container fl-ic justify-between '>
      {currentUser && (
        <>
          <Heading>Welcome, {currentUser.username}</Heading>
          <div className="fl-ic gap-4">
            <Link href="/">Home</Link>
            <Link href="/goods">Goods</Link>
            <Link href="/items">items</Link>
            {currentUser.role === "ADMIN" &&
              <Link href="/add-good">Add-good</Link>
            }
          </div>
        </>
      )}

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <Button asChild variant="secondary">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </SignedOut>
    </div>
  )
}

export default Header