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
import DialogBorrow from '@/components/custom-ui/DialogBorrow'

interface GoodsCardProps {
  goods: Good[]
  isUserHasBorrowedItem: boolean
}

const GoodsCard = ({ goods, isUserHasBorrowedItem }: GoodsCardProps) => {
  const [borrowGoods, setBorrowGoods] = useState<any[]>([])
  const [submitted, setSubmitted] = useState(false)


  const onSubmitted = () => {
    setBorrowGoods([])
    setSubmitted(true)
  }


  return (
    <>
      <div className=" space-y-8">
        <div className="fl-ic justify-between">
          <Heading>Goods</Heading>
          <SearchGoods placeholder="Search Goods" />
        </div>
        <div className="grid grid-cols-3 justify-around">
          {goods.map((good) => {
            return good.qty > 0 && (
              <div key={good.id} className="space-y-2">
                <Heading as="h4" size="sm">{good.name}</Heading>
                <Image src={good.imageUrl} width={300} height={300} alt={good.name} className=" aspect-square" />
                <GoodActions setBorrowGoods={setBorrowGoods} {...good} submitted={submitted}
                  setSubmitted={setSubmitted}
                />
              </div>
            )
          }

          )}
        </div>
        {
          borrowGoods.length > 0 && (
            <div className="grid grid-cols-2">
              <DialogBorrow
                borrowGoods={borrowGoods}
                onSubmitted={onSubmitted}
                isUserHasBorrowedItem={isUserHasBorrowedItem}
              />
            </div>
          )
        }
      </div>

    </>
  )
}

export default GoodsCard