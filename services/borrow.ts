import { db } from "@/lib/db";
import { getCurrentUser } from "./user";

export const isUserHasBorrowedItem = async () => {
  try {
    const currentUser = await getCurrentUser()
    return !!await db.borrow.findFirst({
      where:{
        userId: currentUser?.id,
        approved:false,
        isReturned:false
      }
    })
  } catch (err) {
    console.log(err);
    throw(err);
  }
}

export const getUserBorrowedItem = async () => {
  try {
    const currentUser = await getCurrentUser()
    return await db.borrow.findFirst({
      where:{
        userId: currentUser?.id,
        isReturned:false,
        approved:false
      },
      include:{
        item: {
          include:{
            good:true
          
          }
        }
        
      }
    })
  } catch (err) {
    console.log(err);
    throw(err);
  }
}

export const getAllBorrowed = async () => {
  try {
    return await db.borrow.findMany({
      where:{
        approved:false,
        isReturned:false
      },
      include:{
        item: {
          include:{
            good:true
          }
        },
        user:true
        
      }
    })
  } catch (err) {
    console.log(err);
    throw(err);
  }
}

export const getAllBorrowedApproved = async () => {
  try {
    return await db.borrow.findMany({
      where:{
        approved:true,
        isReturned:false
      },
      include:{
        item: {
          include:{
            good:true
          }
        },
        user:true
        
      }
    })
  } catch (err) {
    console.log(err);
    throw(err);
  }
}
export const getAllBorrowedReturned = async () => {
  try {
    return await db.borrow.findMany({
      where:{
        approved:true,
        isReturned:true
      },
      include:{
        item: {
          include:{
            good:true
          }
        },
        user:true
        
      }
    })
  } catch (err) {
    console.log(err);
    throw(err);
  }
}

export const getUserApprovedItem = async () => {
  try {
    const currentUser = await getCurrentUser()
    // TODO GANTI JADI FIND MANY
    return await db.borrow.findFirst({
      where:{
        userId: currentUser?.id,
        approved:true,
        isReturned:false
      },
      include:{
        item: {
          include:{
            good:true
          }
        }
        
      }
    })
  } catch (err) {
    console.log(err);
    throw(err);
  }
}