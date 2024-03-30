import React, { FormEventHandler, useState, useTransition } from 'react'
import FormBorrow from '@/app/(user)/goods/_components/FormBorrow'
import { toast } from 'sonner'
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import FormItemReason from './FormItemReason';
import { Badge } from '@/components/ui/badge';

interface DialogItemReasonProps {
  id: string
  reason: string | null
}

const DialogItemReason = (
  { id, reason }: DialogItemReasonProps
) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const onOpen = () => {

    setIsOpen(true)
  }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Button variant="outline" className=" border-none w-fit h-fit px-0 py-0"

        onClick={() => onOpen()}
      >
        <Badge>
          Reason
        </Badge>
      </Button>
      <DialogContent className="bg-transparent p-0 border-none">
        <FormItemReason
          onClose={onClose}
          id={id}
          reason={reason}
        />
      </DialogContent>
    </Dialog>
  )
}

export default DialogItemReason