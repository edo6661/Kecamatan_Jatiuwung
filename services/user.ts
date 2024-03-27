import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export const getCurrentUser = async () => {
  try {
    const self = await currentUser()
    if(!self) return null
    return db.user.findUnique({
      where:{
        externalUserId: self?.id
      }
    })
  } catch (err) {
    console.error(err);
    throw (err);
  }
}