import React, { FormEventHandler, useState, useTransition } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import FormBorrow from '@/app/(user)/goods/_components/FormBorrow'
import { toast } from 'sonner'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import FormGood from './FormGoodQty'
import { Good } from '@prisma/client'

interface DialogGoodProps {
  good: Good;
}

const DialogGood = (
  { good }: DialogGoodProps
) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const onOpen = () => {
    setIsOpen(true)
  }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Button
        onClick={() => onOpen()}
      >
        Ubah
      </Button>
      <DialogContent className="bg-transparent p-0 border-none">
        <FormGood
          onClose={onClose}
          {...good}
        />
      </DialogContent>
    </Dialog>
  )
}

export default DialogGood