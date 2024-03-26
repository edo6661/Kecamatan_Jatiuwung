"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ImageLogo = () => {
  const pathName = usePathname();

  const rootPathname =
    pathName.includes("/sign-in") || pathName.includes("/sign-up");

  return (
    <div
      className={`bg-white rounded-full p-2 hovered shadow-muted-foreground dark:shadow-white shadow-sm `}
    >
      <Link href="/" className="outline-none">
        <Image src="https://i.pinimg.com/236x/49/89/70/498970d2f45988eae9d6a2eb59bc450f.jpg" alt="logo" height="120" width="120" className="w-full h-full rounded-full" />
      </Link>
    </div>
  );
};

export default ImageLogo;
