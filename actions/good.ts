"use server"
import { db } from "@/lib/db";
import { goodSchema } from "@/lib/zod/good";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addGoods = async (data: z.infer<typeof goodSchema>) => {
  try {
    const newGood= await db.good.create({
      data:{
        ...data,
        qty: +data.qty
      }
    })
    revalidatePath("/goods")
    return newGood
  } catch (err) {
    console.log(err);
    throw(err);
  }
}