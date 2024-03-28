"use client"

import { approveBorrowWithId } from "@/actions/borrow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"
interface ApproveActionsProps {
  id: string
  approved: boolean
}
const ApproveActions = ({ id, approved }: ApproveActionsProps) => {

  const [isPending, startTransition] = useTransition()

  const onApproved = () => {
    startTransition(() => {
      approveBorrowWithId(id)
        .then(() => {
          toast.success("Borrow approved")
        })
        .catch(() => {
          toast.error("Failed to approve borrow")
        })
    })
  }

  return approved ? <p>Approved</p> : <Button
    disabled={isPending}
    onClick={onApproved}
    variant={approved ? "outline" : "ghost"}
  >
    Approve
  </Button>
}

export default ApproveActions