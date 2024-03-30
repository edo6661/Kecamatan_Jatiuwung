"use client"
import { Heading } from "@/components/custom-ui/heading"

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
import { useTransition } from "react"
import { toast } from "sonner"
import { Good, User } from "@prisma/client"
import AlertDialog from "@/components/custom-ui/AlertDialog"
import { deleteGoodWithId } from "@/actions/good"
import DialogGood from "./DialogGood"

interface GoodsAdminProps {
  goods: Good[]
  currentUser: User
}
const GoodsAdmin = (
  { goods, currentUser }: GoodsAdminProps
) => {
  const [isPending, startTransition] = useTransition()

  const tableHeads = ["Name", "Image", "Quantity", "Edit", "Delete"]
  return goods.length > 0 ? (
    (

      <Table>
        <TableCaption>A list of your recent Goods.</TableCaption>
        <TableHeader>
          <TableRow>
            {tableHeads.map((head) => (
              <TableHead key={head}>{head}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {goods.map((good) => {

            const handleDelete = () => {
              startTransition(() => {
                deleteGoodWithId(good.id)
                  .then(() => {
                    toast.success("Good Deleted Successfully")
                  })
                  .catch((err) => {
                    toast.error("Error Delete Good")
                    console.error(err)
                  })
              })
            }

            return (
              <TableRow key={good.id}>
                <TableCell>{good.name}</TableCell>
                <TableCell>
                  <Image src={good.imageUrl} width={100} height={100} alt={good.name} />
                </TableCell>
                <TableCell>
                  {good.qty}
                </TableCell>
                <TableCell>
                  <DialogGood
                    good={good}
                  />
                </TableCell>
                <TableCell>
                  <AlertDialog
                    action={handleDelete}
                    isPending={isPending}
                  />
                </TableCell>
              </TableRow>
            )
          }

          )}
        </TableBody>
      </Table>
    )
  ) : (
    <Heading className="text-center">No GoodsAdmins</Heading>
  )
}

export default GoodsAdmin  