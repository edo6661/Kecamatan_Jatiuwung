import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { getCurrentUser } from "@/services/user";
import Image from "next/image";
import { Heading } from "./custom-ui/heading";
import HeaderItems from "./HeaderItems";
import NavOption from "./NavOption";
import { getAllBorrowed, getCountAllBorrowedThatExpired } from "@/services/borrow";

const Header = async () => {
  const user = await getCurrentUser();
  const notExpiredBorrow = await getCountAllBorrowedThatExpired();

  console.log(notExpiredBorrow)

  return (
    <>
      <header className=" bg-primaryBg py-4 text-white">
        <nav className="container">
          <div className="flex items-center justify-between">
            <div className="max-w-[320px]">
              <Link href="/" className=" fl-ic gap-4">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={60}
                  height={60}
                />
                <Heading className="text-lg leading-5">
                  Kecamatan Jatiuwung Kota Tangerang
                </Heading>
              </Link>
            </div>
            <HeaderItems />
            <div className="fl-ic gap-4">
              <NavOption
                role={user?.role!}
                notExpiredBorrow={notExpiredBorrow}
              />
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
