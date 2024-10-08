import { z } from "zod";

export const goodSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
    
  }).refine((val) => {
    // if there's a number in the name
    return !/\d/.test(val)
  }, {
    message: "Name cannot contain numbers."
  }),
  imageUrl: z.string().min(2,{
    message: "Image cannot be empty."
  }),
  qty: z.string().min(1,{
    message: "Quantity cannot be empty."
  
  }),
})

export type ActualGood = Pick<z.infer<typeof goodSchema>, "name" | "imageUrl"> & {qty:number}