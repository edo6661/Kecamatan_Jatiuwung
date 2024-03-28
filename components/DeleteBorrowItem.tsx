"use client"
import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { deleteUserBorrowNotApproved } from '@/actions/borrow'
import { toast } from 'sonner'


const DeleteBorrowItem = () => {
  const [isPending, startTransition] = useTransition()
  const onRemove = () => {
    startTransition(() => {
      deleteUserBorrowNotApproved()
        .then(() => {
          toast.success("Barang berhasil dihapus")

        })
        .catch((err) => {
          toast.error("Barang gagal dihapus", err.message)
          console.error(err)
          throw err
        })
    })
  }
  return (
    <Button className="w-full rounded-xl" disabled={isPending} variant={"destructive"}
      onClick={onRemove}
    >
      {
        isPending ? "Menghapus" : "Hapus"
      }
    </Button>
  )
}

export default DeleteBorrowItem