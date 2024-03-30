import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { BorrowsRelation } from '@/types/borrow'
import { formatDate } from '@/utils/formateDate'
import { X } from 'lucide-react'
import React from 'react'
import DialogItemReason from './DialogItemReason'
import AlertDialog from '@/components/custom-ui/AlertDialog'
interface FormItemActionsProps {
  borrow: BorrowsRelation;
  isPending: boolean;
  handleApprove: () => void;
  handleDelete: () => void;

}
const FormItemActions = (
  { borrow, isPending, handleApprove, handleDelete }: FormItemActionsProps
) => {
  return (
    <>
      <TableCell>{borrow.user.username}</TableCell>

      <TableCell>
        <Button variant="outline" className=" border-none w-fit h-fit px-0 py-0"
          onClick={handleApprove}
          disabled={isPending}
        >
          <Badge variant={
            borrow.approved ? 'default' : 'destructive'
          }
            className=" cursor-pointer"
          >
            {borrow.approved ? 'Approved' : 'Disapprove '}
          </Badge>
        </Button>
      </TableCell>
      <TableCell>
        <Badge variant={
          borrow.isReturned ? 'default' : 'destructive'
        }>
          {borrow.isReturned ? 'Returned' : 'Unreturned'}
        </Badge>
      </TableCell>
      <TableCell>
        <DialogItemReason
          id={borrow.id}
          reason={borrow.reason ? borrow.reason : null}
        />
      </TableCell>
      <TableCell>

        <AlertDialog
          action={handleDelete}
          isPending={isPending}
        />
      </TableCell>

    </>
  )
}

export default FormItemActions