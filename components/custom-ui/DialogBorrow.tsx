import React, { FormEventHandler, useState, useTransition } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Plus } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { Heading } from './heading'
import FormBorrow from '@/app/(user)/goods/_components/FormBorrow'
import { toast } from 'sonner'

interface DialogBorrowProps {
  borrowGoods: any[]
  onSubmitted: () => void;
  isUserHasBorrowedItem: boolean;
}

const DialogBorrow = (
  { borrowGoods, onSubmitted, isUserHasBorrowedItem }: DialogBorrowProps
) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const onOpen = () => {
    if (isUserHasBorrowedItem) {
      toast.error("Anda masih memiliki barang yang belum dikembalikan")
      return;
    }
    setIsOpen(true)
  }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Button
        onClick={() => onOpen()}
      >
        Pinjam
      </Button>
      <DialogContent className="bg-transparent p-0 border-none">
        <FormBorrow
          onClose={onClose}
          borrowGoods={borrowGoods}
          onSubmitted={onSubmitted}
        />
      </DialogContent>
    </Dialog>
  )
}

export default DialogBorrow