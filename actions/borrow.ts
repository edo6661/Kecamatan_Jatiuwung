"use server"
import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user";
import { GoodBorrow } from "@/types/good";
import { Item } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface Borrow {
  borrowGoods: {
    goodId: string;
    qty: number;
  }[]
  limitDate: Date;
}

export const addBorrow = async (data: Borrow  ) => {  
  try {
    const currentUser = await getCurrentUser()

    if(!currentUser) throw new Error("User not found")
    if(!data) throw new Error("Data not found");

    const item = data.borrowGoods.map((data) => 
      {
        return {
          goodId: data.goodId,
          qty: data.qty
        }
      }
    )

    const changeQtyGood = item.map(async(item) => 
      await db.good.update({
        where:{
          id: item.goodId
        },
        data:{
          qty:{
            decrement:item.qty
          }
        }
      })
    )
   
    const newBorrow= await db.borrow.create({
      data:{
        userId: currentUser?.id!,
        item: {
          create: item
        },
       limitDate: data.limitDate
      },
      include:{
        item:true
      }
    })
    revalidatePath("/goods")
    return newBorrow
  } catch (err) {
    console.log(err);
    throw(err);
  }
}



export const deleteUserBorrowNotApproved = async () => {
  try {
    const currentUser = await getCurrentUser()
    const deletedBorrow= await db.borrow.deleteMany({
      where:{
        userId: currentUser?.id,
        approved:false
      }
    })
    revalidatePath("/goods")
    revalidatePath("borrowed-items")
    return deletedBorrow
  } catch (err) {
    console.log(err);
    throw(err);
  }
}

export const approveBorrowWithId =async (id:string) => {
  try {
    const approveBorrow = await db.borrow.update({
      where:{
        id,
      },
      data:{
        approved:true
      }
      
    })
    revalidatePath("/borrowed-items")
    return approveBorrow
  } catch (err) {
    console.log(err);
    throw(err);
  }
}

export const toggleApproveBorrowWithId =async (id:string) => {
  try {
    const borrow = await db.borrow.findUnique({
      where:{
        id,
      }
    })
    if(!borrow) throw new Error("Borrow not found")
    const approveBorrow = await db.borrow.update({
      where:{
        id,
      },
      data:{
        approved:!borrow.approved
      }
      
    })
    revalidatePath("/items")
    return approveBorrow
  } catch (err) {
    console.log(err);
    throw(err);
  }
}
export const toggleReturnBorrowWithId =async (id:string, returnedBorrow: {
  id: string;
  qty: number;
}[]) => {
  try {
    const borrow = await db.borrow.findUnique({
      where:{
        id,
      }
    })
    if(!borrow) throw new Error("Borrow not found")
    const returnBorrow = await db.borrow.update({
      where:{
        id,
      },
      data:{
        isReturned:!borrow.isReturned
      }
    })

    const returnQtyGood = returnedBorrow.map(async(item) => 
      await db.good.update({
        where:{
          id:item.id,
        },
        data:{
          qty:{
            increment:item.qty
          }
        }
      })
    )
    
    revalidatePath("/items")
    return returnBorrow
  } catch (err) {
    console.log(err);
    throw(err);
  }

}
export const deleteBorrowWithId =async (id:string) => {
  try {
    const deletedBorrow = await db.borrow.delete({
      where:{
        id,
      }
    })
    revalidatePath("/items")
    return deletedBorrow
  } catch (err) {
    console.log(err);
    throw(err);
  }
}
export const addReasonToBorrow =async (id:string,reason:string) => {
  try {
    const updatedBorrow = await db.borrow.update({
      where:{
        id,
      },
      data:{
        reason
      }
    })
    revalidatePath("/items")
    revalidatePath("/")
    return updatedBorrow
  } catch (err) {
    console.log(err);
    throw(err);
  }
}