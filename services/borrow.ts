import { db } from "@/lib/db";
import { getCurrentUser } from "./user";

export const isUserHasBorrowedItem = async () => {
  try {
    const currentUser = await getCurrentUser()
    return !!await db.borrow.findFirst({
      where:{
        userId: currentUser?.id,
        approved:false,
        isRetured:false
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
        approved:false,
        isRetured:false
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