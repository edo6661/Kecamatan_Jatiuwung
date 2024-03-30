"use server"
import { db } from "@/lib/db";
import { goodSchema } from "@/lib/zod/good";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addGoods = async (data: z.infer<typeof goodSchema>) => {
  try {
    const newGood = await db.good.create({
      data: {
        ...data,
        qty: +data.qty
      }
    })
    revalidatePath("/goods")
    return newGood
  } catch (err) {
    console.log(err);
    throw (err);
  }
}

export const deleteGoodWithId = async (id: string) => {
  try {
    const deletedGood = await db.good.delete({
      where: {
        id: id,
      }
    })
    revalidatePath("/goods")
    revalidatePath("/items")
    return deletedGood
  } catch (err) {
    console.log(err);
    throw (err);
  }
}
export const updateGood = async (id: string, data: z.infer<typeof goodSchema>) => {
  try {
    const updatedGood = await db.good.update({
      where: {
        id
      },
      data: {
        ...data,
        qty: +data.qty
      }
    })
    revalidatePath("/goods")
    revalidatePath("/items")
    return updatedGood
  } catch (err) {
    console.log(err);
    throw (err);
  }
}