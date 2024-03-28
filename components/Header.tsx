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
            <Link href="/borrowed-items">Borrowed Items</Link>
            <Link href="/approved-items">Approved Items</Link>
          </div>
        </>
      )}
      <div className="fl-ic gap-4">
        {/* BAKAL DIJADIIN 1 PAGE DAN FILTERED */}
        {currentUser?.role === "ADMIN" && (
          <>
            <Link href="/add-good">Add-goods</Link>
            <Link href="/approve-borrow">Approve Borrow</Link>
            <Link href="/approved-borrow">Approved Borrow</Link>
            <Link href="/returned-borrow">Returned Borrow</Link>
          </>
        )}

      </div>
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