import { Heading } from "@/components/custom-ui/heading"

import { Payment } from "@/types"
import { getAllBorrowed, getUserApprovedItems } from "@/services/borrow"
import { Item } from "@prisma/client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"


const ItemsPage = async () => {
  const borrows = await getAllBorrowed()

  return (
    <section className="base-container">
      <Heading>
        Items Page
      </Heading>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead >Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Approved</TableHead>
            <TableHead>Returned</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrows.map((borrow) =>
            borrow.item.map((item) =>
              <TableRow key={item.id}>
                <TableCell>{item.good.name}</TableCell>
                <TableCell>
                  <Image
                    src={item.good.imageUrl}
                    alt={item.good.name}
                    width={90}
                    height={90}
                    className=" aspect-square rounded-full"
                  />
                </TableCell>
                <TableCell>{item.qty}</TableCell>
                <TableCell>
                  <Badge variant={
                    borrow.approved ? 'default' : 'destructive'
                  }>
                    {borrow.approved ? 'Approved' : 'Not Approved'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    borrow.isReturned ? 'default' : 'destructive'
                  }>
                    {borrow.isReturned ? 'Approved' : 'Not Approved'}
                  </Badge>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </section>
  )
}

export default ItemsPage  