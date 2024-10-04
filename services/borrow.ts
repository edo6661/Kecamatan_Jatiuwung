import { db } from "@/lib/db";
import { getCurrentUser } from "./user";

export const isUserHasBorrowedItem = async () => {
  try {
    const currentUser = await getCurrentUser()
    return !!await db.borrow.findFirst({
      where:{
        userId: currentUser?.id,
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
export const getAllBorrowedNotApproved = async () => {
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
export const getAllBorrowedNotReturned = async () => {
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
export const getAllBorrowedUser = async () => {
  try {
    const currentUser = await getCurrentUser()
    return await db.borrow.findMany({
      where:{
        userId: currentUser?.id
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
export const getAllBorrowedUserApproved = async () => {
  try {
    const currentUser = await getCurrentUser()
    return await db.borrow.findMany({
      where:{
        userId: currentUser?.id,
        approved:true
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
export const getAllBorrowedUserNotApproved = async () => {
  try {
    const currentUser = await getCurrentUser()
    return await db.borrow.findMany({
      where:{
        userId: currentUser?.id,
        approved:false
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
export const getAllBorrowedUserReturned = async () => {
  try {
    const currentUser = await getCurrentUser()
    return await db.borrow.findMany({
      where:{
        userId: currentUser?.id,
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
export const getAllBorrowedUserNotReturned = async () => {
  try {
    const currentUser = await getCurrentUser()
    return await db.borrow.findMany({
      where:{
        userId: currentUser?.id,
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

export const getCountAllBorrowedThatExpired = async () => {
  try {
    return await db.borrow.findMany({
      where: {
        isReturned: false,
        limitDate: {
          lte: new Date(),
        },
      },
      include : {
        item:  {
          include:{
            good:true
          }
        }
      }
    }).then((res) => res.length)
  } catch (err) {
    console.log(err);
    throw err;
  }
};
