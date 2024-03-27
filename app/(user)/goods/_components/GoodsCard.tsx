"use client"
import { Heading } from '@/components/custom-ui/heading'
import React, { useState, useTransition } from 'react'
import SearchGoods from './SearchGoods'
import Image from 'next/image'
import GoodActions from './GoodActions'
import { Button } from '@/components/ui/button'
import { Borrow, Good, User } from '@prisma/client'
import { addBorrow, deleteUserBorrowNotApproved } from '@/actions/borrow'
import { toast } from 'sonner'

interface GoodsCardProps {
  goods: Good[]
  isUserHasBorrowedItem: boolean
}

const GoodsCard = ({ goods, isUserHasBorrowedItem }: GoodsCardProps) => {
  const [isPending, startTransition] = useTransition()
  const [borrowGoods, setBorrowGoods] = useState<any[]>([])
  const [submitted, setSubmitted] = useState(false)


  const onSubmit = () => {
    startTransition(() => {
      if (isUserHasBorrowedItem) {
        toast.error("Anda masih memiliki barang yang belum dikembalikan")
        return
      }
      addBorrow(borrowGoods)
        .then(() => {
          toast.success("Barang berhasil dipinjam")
          setBorrowGoods([])
          setSubmitted(true)
        })
        .catch((err) => {
          toast.error("Barang gagal dipinjam", err.message)
          console.error(err)
          throw err
        })
    })
  }
  const onRemove = () => {
    startTransition(() => {
      deleteUserBorrowNotApproved()
        .then(() => {
          toast.success("Barang berhasil dihapus")
          setBorrowGoods([])
          setSubmitted(true)
        })
        .catch((err) => {
          toast.error("Barang gagal dihapus", err.message)
          console.error(err)
          throw err
        })
    })
  }


  return (
    <>
      <div className=" space-y-8">
        <div className="fl-ic justify-between">
          <Heading>Goods</Heading>
          <SearchGoods placeholder="Search Goods" />
        </div>
        <div className="grid grid-cols-3 justify-around">
          {goods.map((good) =>
            <div key={good.id} className="space-y-2">
              <Heading as="h4" size="sm">{good.name}</Heading>
              <Image src={good.imageUrl} width={300} height={300} alt={good.name} className=" aspect-square" />
              <GoodActions setBorrowGoods={setBorrowGoods} goodId={good.id} submitted={submitted}
                setSubmitted={setSubmitted}
              />
            </div>
          )}
        </div>
        {
          borrowGoods.length > 0 && (
            <div className="grid grid-cols-2">
              <Button className="w-full rounded-none rounded-l-xl" disabled={isPending} onClick={onSubmit} >
                {isPending ? "Memproses" : "Pinjam"}
              </Button>
              <Button className="w-full rounded-none rounded-r-xl" disabled={isPending} variant={"destructive"}
                onClick={onRemove}
              >
                {
                  isPending ? "Membatalkan" : "Batalkan"
                }
              </Button>
            </div>
          )
        }
      </div>

    </>
  )
}

export default GoodsCard