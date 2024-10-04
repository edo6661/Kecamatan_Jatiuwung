import React, { FormEventHandler, useState, useTransition } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Good } from '@prisma/client'
import Image from 'next/image';

interface DialogGoodProps {
  imageUrl: string;
}

const DialogKtp = (
  { imageUrl }: DialogGoodProps
) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const onOpen = () => {
    setIsOpen(true)
  }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}

    >
      <Image
        src={imageUrl}
        alt={imageUrl}
        width={50}
        height={50}
        className="aspect-square "
        onClick={() => onOpen()}
      />

      <DialogContent className="bg-transparent p-0 border-none w-96 h-96"

      >
        <Image
          src={imageUrl}
          alt={imageUrl}
          width={420}
          height={420}
          className="aspect-square "
        />

      </DialogContent>
    </Dialog>
  )
}

export default DialogKtp