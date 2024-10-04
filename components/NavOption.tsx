"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Role, User } from "@prisma/client"
import Link from "next/link"
import { Button } from "./ui/button"
interface NavOptionProps {
  role: Role;
  notExpiredBorrow: number;
}
const NavOption = (
  { role, notExpiredBorrow }: NavOptionProps
) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" bg-secondaryBg px-4 py-2 rounded-2xl">
        Options
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Feature</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignedIn>
            {role === "ADMIN" && (
              <Link href="/add-good">Create Good</Link>
            )}
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">Sign in</Link>
          </SignedOut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignedIn>
            <Link href="/goods">Goods</Link>
          </SignedIn>
        </DropdownMenuItem>
        <DropdownMenuItem className="relative">
          <SignedIn>
            <Link href="/items" className="relative">
              <span>
                Items
              </span>
              {role === "ADMIN" && notExpiredBorrow !== 0 && (
                <div className="absolute -right-6 -top-1 w-5 h-5 rounded-full bg-red-500 items-center justify-center flex ">
                  <span className=" text-xs text-white ">
                    {notExpiredBorrow ?? 0}
                  </span>

                </div>
              )}
            </Link>
          </SignedIn>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default NavOption