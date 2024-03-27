import DeleteBorrowItem from '@/components/DeleteBorrowItem'
import { Heading } from '@/components/custom-ui/heading'
import { getUserBorrowedItem } from '@/services/borrow'
import Image from 'next/image'
import React, { useTransition } from 'react'

const BorrowedItems = async () => {
  const borrow = await getUserBorrowedItem()

  return (
    <div className='container space-y-8'>
      {borrow ? (
        <>
          <div className="grid grid-cols-2 justify-between">
            <Heading>
              Borrowed Items
            </Heading>
            <DeleteBorrowItem />
          </div>

          <div className="grid grid-cols-3">
            {borrow?.item.map((item) =>
              <div key={item.good.id} className="space-y-2">
                <Heading as="h4" size="sm">{item.good.name}</Heading>
                <Image src={item.good.imageUrl} width={300} height={300} alt={item.good.name} className=" aspect-square" />
                <p className='font-light text-muted-foreground'>{item.qty}</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <Heading>No borrowed items</Heading>

      )}

    </div>
  )
}

export default BorrowedItems