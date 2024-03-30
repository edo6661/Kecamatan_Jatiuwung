import React from 'react'
import { getAllBorrowed, getAllBorrowedApproved, getAllBorrowedNotApproved, getAllBorrowedNotReturned, getAllBorrowedReturned, getAllBorrowedUser, getAllBorrowedUserApproved, getAllBorrowedUserNotApproved, getAllBorrowedUserNotReturned, getAllBorrowedUserReturned } from '@/services/borrow'
import Items from './_components/Items'
import { getCurrentUser } from '@/services/user'

const ItemsPage = async () => {
  const allBorrows = await getAllBorrowed()
  const approvedBorrows = await getAllBorrowedApproved()
  const notApprovedBorrows = await getAllBorrowedNotApproved()
  const returnedBorrows = await getAllBorrowedReturned()
  const notReturnedBorrows = await getAllBorrowedNotReturned()
  const userAllBorrows = await getAllBorrowedUser()
  const userApprovedBorrows = await getAllBorrowedUserApproved()
  const userNotApprovedBorrows = await getAllBorrowedUserNotApproved()
  const userReturnedBorrows = await getAllBorrowedUserReturned()
  const userNotReturnedBorrows = await getAllBorrowedUserNotReturned()
  const currentUser = await getCurrentUser()


  return (
    <>
      <Items
        allBorrows={allBorrows}
        approvedBorrows={approvedBorrows}
        notApprovedBorrows={notApprovedBorrows}
        returnedBorrows={returnedBorrows}
        notReturnedBorrows={notReturnedBorrows}
        currentUser={currentUser!}
        userAllBorrows={userAllBorrows}
        userApprovedBorrows={userApprovedBorrows}
        userNotApprovedBorrows={userNotApprovedBorrows}
        userReturnedBorrows={userReturnedBorrows}
        userNotReturnedBorrows={userNotReturnedBorrows}
      />
    </>
  )
}

export default ItemsPage