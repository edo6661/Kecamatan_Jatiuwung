import DeleteBorrowItem from '@/components/DeleteBorrowItem'
import { Heading } from '@/components/custom-ui/heading'
import { getUserApprovedItem, getUserBorrowedItem } from '@/services/borrow'
import { format } from 'date-fns'
import Image from 'next/image'

import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { distanceToNow } from '@/utils/formateDate'
import { Badge } from '@/components/ui/badge'

const ApprovedItems = async () => {
  const borrow = await getUserApprovedItem()

  return (
    <div className='base-container'>
      {borrow ? (
        <>
          <div className="grid grid-cols-2 justify-between">
            <div >
              <Heading>
                Approved Items
              </Heading>

            </div>

            <DeleteBorrowItem />
          </div>

          <div className="space-y-2">
            <div className="fl-ic gap-4">
              <p>Batas Meminjam: </p>
              <p className='font-light text-muted-foreground'>
                {distanceToNow(borrow.limitDate)}
              </p>
            </div>
            <div>
              <Badge variant={
                borrow.approved ? 'default' : 'destructive'
              }>
                {borrow.approved ? 'Approved By Admin' : 'Not Approved By Admin'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-3">
            {borrow?.item.map((item) =>
              <div key={item.good.id} className="space-y-2">
                <Heading as="h4" size="sm">{item.good.name}</Heading>
                <Image src={item.good.imageUrl} width={300} height={300} alt={item.good.name} className=" aspect-square" />
                <div className="fl-ic gap-4">
                  <p>Jumlah: </p>
                  <p className='font-light text-muted-foreground'>{item.qty}</p>
                </div>
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

export default ApprovedItems