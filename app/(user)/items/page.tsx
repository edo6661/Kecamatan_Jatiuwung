import React from 'react'
import { getAllBorrowed, getAllBorrowedApproved, getAllBorrowedNotApproved, getAllBorrowedNotReturned, getAllBorrowedReturned, getAllBorrowedUser, getAllBorrowedUserApproved, getAllBorrowedUserNotApproved, getAllBorrowedUserNotReturned, getAllBorrowedUserReturned } from '@/services/borrow'
import Items from './_components/Items'
import { getCurrentUser } from '@/services/user'

const ItemsPage = async () => {
  const allBorrows = await getAllBorrowed()
  const approvedBorrows = allBorrows.filter((borrow) => borrow.approved === true)
  const notApprovedBorrows = allBorrows.filter((borrow) => borrow.approved === false)
  const returnedBorrows = allBorrows.filter((borrow) => borrow.isReturned === true)
  const notReturnedBorrows = allBorrows.filter((borrow) => borrow.isReturned === false)
  // const approvedBorrows = await getAllBorrowedApproved()
  // const notApprovedBorrows = await getAllBorrowedNotApproved()
  // const returnedBorrows = await getAllBorrowedReturned()
  // const notReturnedBorrows = await getAllBorrowedNotReturned()

  const currentUser = await getCurrentUser()

  const userAllBorrows = await getAllBorrowedUser()

  const userApprovedBorrows = userAllBorrows.filter((borrow) => borrow.approved === true)
  const userNotApprovedBorrows = userAllBorrows.filter((borrow) => borrow.approved === false)
  const userReturnedBorrows = userAllBorrows.filter((borrow) => borrow.isReturned === true)
  const userNotReturnedBorrows = userAllBorrows.filter((borrow) => borrow.isReturned === false)



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