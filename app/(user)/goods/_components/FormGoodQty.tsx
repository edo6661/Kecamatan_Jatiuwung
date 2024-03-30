"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "sonner"
import { useTransition } from "react"
import { addBorrow } from "@/actions/borrow"
import FormInput from "@/components/custom-ui/FormInput"
import { updateGood } from "@/actions/good"
import { goodSchema } from "@/lib/zod/good"
import { Good } from "@prisma/client"
import Image from "next/image"
import ImageUpload from "@/components/custom-ui/ImageUploader"
import { X } from "lucide-react"


interface FormGoodProps extends Good {
  onClose: () => void

}

export default function FormGood({ onClose,
  id, qty, imageUrl, name
}: FormGoodProps) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof goodSchema>>({
    resolver: zodResolver(goodSchema),
    defaultValues: {
      qty: qty.toString(),
      name: name,
      imageUrl,
    }
  })

  const onSubmit = (data: z.infer<typeof goodSchema>) => {
    startTransition(() => {
      const actualData = {
        id,
        ...data,
      }


      updateGood(id, actualData)
        .then(() => {
          toast.success("Barang berhasil Diubah")
          onClose()

        })
        .catch((err) => {
          console.error(err)
          throw err
        })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white border w-full h-full p-12 rounded-2xl mx-auto space-y-8"

      >
        <FormInput
          control={form.control}
          label="Quantity"
          name="qty"
          placeholder="Enter your quantity"
          description="Quantity"
          type="number"
        />
        <FormInput
          control={form.control}
          label="Name"
          name="name"
          placeholder="Enter your name"
          description="Name"
        />
        {form.watch("imageUrl") && (
          <>
            <div className="flex justify-center gap-4">
              <Image src={form.watch("imageUrl")} width={300} height={300} alt="Preview" />
              <Button
                onClick={() => form.setValue("imageUrl", "")}
              >
                <X />
              </Button>
            </div>
          </>
        )}
        {!form.watch("imageUrl") && (
          <ImageUpload
            setImage={form.setValue}
          />
        )}
        <Button type="submit"
          disabled={isPending}
        >Submit</Button>
      </form>
    </Form>
  )
}
