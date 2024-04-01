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
import { Badge } from "@/components/ui/badge"
import FormItemApproved from "./FormItemApproved"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { deleteBorrowWithId, toggleApproveBorrowWithId, toggleReturnBorrowWithId } from "@/actions/borrow"
import { toast } from "sonner"
import { X } from "lucide-react"
import { distanceToNow, formatDate } from "@/utils/formateDate"
import { BorrowsRelation } from "@/types/borrow"
import FormItemActions from "./FormItemActions"
import { User } from "@prisma/client"

interface ItemProps {
  borrows: BorrowsRelation[]
  currentUser: User
}
const Item = (
  { borrows, currentUser }: ItemProps
) => {
  const [isPending, startTransition] = useTransition()

  const tableHeadBase = ["Name", "Image", "Quantity", "Limit",]
  const tableHeadUser = [...tableHeadBase, "Approved", "Returned", "Reason"]
  const tableHeadAdmin = [...tableHeadBase, "User", "Approved", "Returned", "Reason", "Delete",]
  const tableHeads = currentUser.role === "ADMIN" ? tableHeadAdmin : tableHeadUser
  return borrows.length > 0 ? (
    (

      <Table>
        <TableCaption>A list of your recent Items.</TableCaption>
        <TableHeader>
          <TableRow>
            {tableHeads.map((head) => (
              <TableHead key={head}>{head}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {borrows.map((borrow) => {
            const handleApprove = () => {
              if (borrow.isReturned) {
                toast.error("Borrow is Already Returned")
                return
              }
              if (borrow.limitDate < new Date()) {
                toast.error("Borrow is Expired")
                return
              }
              startTransition(() => {
                toggleApproveBorrowWithId(borrow.id)
                  .then(() => {
                    toast.success("Approve Changed Successfully")
                  })
                  .catch((err) => {
                    toast.error("Error Changing Borrow")
                  })
              })
            }
            const handleReturn = () => {
              const returnedBorrow = borrow.item.map((item) => ({
                id: item.good.id,
                qty: item.qty
              }))
              if (borrow.isReturned) {
                toast.error("Borrow is Already Returned")
                return
              }
              startTransition(() => {
                toggleReturnBorrowWithId(borrow.id, returnedBorrow)
                  .then(() => {
                    toast.success("Return Changed Successfully")
                  })
                  .catch((err) => {
                    toast.error("Error Changing Borrow")
                  })
              })
            }
            const handleDelete = () => {
              startTransition(() => {
                deleteBorrowWithId(borrow.id)
                  .then(() => {
                    toast.success("Borrow Deleted Successfully")
                  })
                  .catch((err) => {
                    toast.error("Error Delete Borrow")
                  })
              })
            }
            return borrow.item.map((item) =>
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
                <TableCell>{formatDate(borrow.limitDate)}</TableCell>
                {currentUser.role === "USER" &&
                  <>
                    <TableCell>
                      <Badge variant={
                        borrow.approved ? 'default' : 'destructive'
                      }>
                        {borrow.approved ? 'Approved' : 'Dissaproved '}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        borrow.isReturned ? 'default' : 'destructive'
                      }>
                        {borrow.isReturned ? 'Returned' : 'Unreturned '}
                      </Badge>
                    </TableCell>
                    <TableCell className=" break-words">
                      <p className=" text-muted-foreground ">
                        {borrow.reason}
                      </p>
                    </TableCell>
                  </>
                }
                {currentUser.role === "ADMIN" && <FormItemActions borrow={borrow} isPending={isPending} handleApprove={handleApprove} handleDelete={handleDelete}
                  handleReturn={handleReturn}
                />}
              </TableRow>
            )
          }

          )}
        </TableBody>
      </Table>
    )
  ) : (
    <Heading className="text-center">No Items</Heading>
  )
}

export default Item  