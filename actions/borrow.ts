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