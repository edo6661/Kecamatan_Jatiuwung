import { db } from "@/lib/db";
import { revalidatePath, unstable_noStore } from "next/cache";

export const getGoods = async () => {
  try {
    return await db.good.findMany({
      
    });
  } catch (err) {
    console.error(err);
    throw (err);
  }
}

export const getGoodsWithPaginationQuery = async (page: number, limit: number, query:string) => {
  try {
    const totalGoods = await db.good.count({
      where:{
        name:{
          contains: query,
          mode: "insensitive"
        }
      }
    });

    const goods = await db.good.findMany({
      take: limit,
      skip: (page -1) * limit,
      where:{
        name:{
          contains: query,
          mode: "insensitive"
        }
        
      }
    })

    const totalPages = Math.ceil(totalGoods / limit)

    return { goods, totalPages }
    
  } catch (err) {
    console.error(err);
    throw (err);
  }
}