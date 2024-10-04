"use client"
import { Heading } from '@/components/custom-ui/heading'
import React, { useState } from 'react'
import Item from './Item'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BorrowsRelation, FuckTypescript } from '@/types/borrow'
import { User } from '@prisma/client'

interface ItemsProps {
  allBorrows: FuckTypescript[];
  approvedBorrows: FuckTypescript[];
  notApprovedBorrows: FuckTypescript[];
  returnedBorrows: FuckTypescript[];
  notReturnedBorrows: FuckTypescript[];
  userAllBorrows: FuckTypescript[];
  userApprovedBorrows: FuckTypescript[];
  userNotApprovedBorrows: FuckTypescript[];
  userReturnedBorrows: FuckTypescript[];
  userNotReturnedBorrows: FuckTypescript[];

  currentUser: User
}

const Items = ({ allBorrows,
  approvedBorrows,
  notApprovedBorrows,
  returnedBorrows,
  notReturnedBorrows,
  userAllBorrows,
  userApprovedBorrows,
  userNotApprovedBorrows,
  userReturnedBorrows,
  userNotReturnedBorrows,
  currentUser

}: ItemsProps) => {
  const [borrow, setBorrow] = useState("")
  const selectBorrow = ["All", "Approved", "Not Approved", "Returned", "Not Returned"]
  let borrows: BorrowsRelation[] = currentUser.role === "ADMIN" ? borrow === "All" ? allBorrows : borrow === "Approved" ? approvedBorrows : borrow === "Not Approved" ? notApprovedBorrows : borrow === "Returned" ? returnedBorrows : borrow === "Not Returned" ? notReturnedBorrows : allBorrows : borrow === "All" ? userAllBorrows : borrow === "Approved" ? userApprovedBorrows : borrow === "Not Approved" ? userNotApprovedBorrows : borrow === "Returned" ? userReturnedBorrows : borrow === "Not Returned" ? userNotReturnedBorrows : userAllBorrows

  return (
    <section className="base-container">
      <div className="fl-ic justify-between">
        <Heading>
          Items Page
        </Heading>
        <Select
          onValueChange={(value) => setBorrow(value)}
          value={borrow}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Borrow" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filter</SelectLabel>
              {selectBorrow.map((item) =>
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Item borrows={borrows}
        currentUser={currentUser}
      />
    </section>
  )
}

export default Items