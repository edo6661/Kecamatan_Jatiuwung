import { z } from "zod";

export const goodSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  imageUrl: z.string(),
  qty: z.string(),
})

export type ActualGood = Pick<z.infer<typeof goodSchema>, "name" | "imageUrl"> & {qty:number}