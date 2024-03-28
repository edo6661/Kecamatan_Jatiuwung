import { Heading } from '@/components/custom-ui/heading'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAllBorrowed } from '@/services/borrow'
import { Button } from '@/components/ui/button'
import ApproveActions from './_components/ApproveActions'

const ApproveBorrow = async () => {

  const data = await getAllBorrowed()

  return (
    <section className='base-container'>
      <Heading>
        Approve Borrow
      </Heading>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Item</TableHead>
            <TableHead >Approved</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((borrow) => (
            <TableRow key={borrow.id}>
              <TableCell className="font-medium">{borrow.user.username}</TableCell>
              <TableCell>
                <div className="fl-ic gap-2">
                  {borrow.item.map((item) =>
                    item.good.name
                  )}
                </div>
              </TableCell>
              <TableCell>
                <ApproveActions id={borrow.id} approved={borrow.approved} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </section>
  )
}

export default ApproveBorrow