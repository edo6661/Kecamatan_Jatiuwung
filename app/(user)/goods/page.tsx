import { Heading } from "@/components/custom-ui/heading";
import Image from "next/image";

import { getGoods, getGoodsWithPaginationQuery } from "@/services/good";
import GoodActions from "./_components/GoodActions";
import Pagination from "@/components/custom-ui/Pagination";
import SearchGoods from "./_components/SearchGoods";
import { Button } from "@/components/ui/button";
import GoodsCard from "./_components/GoodsCard";
import { getCurrentUser } from "@/services/user";
import { notFound } from "next/navigation";
import { isUserHasBorrowedItem } from "@/services/borrow";


interface GoodsPageProps {
  searchParams: {
    page: number;
    limit: number;
    query: string;
  }
}
export default async function GoodsPage({ searchParams }: GoodsPageProps) {

  const limit = +searchParams.limit || 2;
  const page = +searchParams.page || 1;
  const query = searchParams.query || '';

  const goods = await getGoods()

  const currentUser = await getCurrentUser()
  const userHasBorrowedItem = await isUserHasBorrowedItem()


  if (!currentUser) return notFound()


  return (
    <>
      <section className="container  ">
        <GoodsCard goods={goods} isUserHasBorrowedItem={userHasBorrowedItem!} />

      </section>
    </>
  );
}
