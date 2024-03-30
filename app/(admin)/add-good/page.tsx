"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,

} from "@/components/ui/form"
import { X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import FormInput from "@/components/custom-ui/FormInput"
import ImageUpload from "@/components/custom-ui/ImageUploader"
import Image from "next/image"
import { goodSchema } from "@/lib/zod/good"
import { useTransition } from "react"
import { addGoods } from "@/actions/good"

import { useRouter } from 'next/navigation'
import { toast } from "sonner"



export default function AddGood() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof goodSchema>>({
    resolver: zodResolver(goodSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      qty: "",
    },
  })

  const { setValue, watch } = form

  function onSubmit(values: z.infer<typeof goodSchema>) {
    startTransition(() => {
      addGoods(values)
        .then((data) => {
          toast.success(`Good ${data.name} has been added!`)
          router.push('/goods')
        })
        .catch((err) => {
          toast.error(err.message)
          console.log(err)
        })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-xl mx-auto">
        <FormInput
          control={form.control}
          label="Name"
          name="name"
          placeholder="Enter your name"
          description="
            Your name must be at least 2 characters long."
        />
        <FormInput
          control={form.control}
          label="Quantity"
          name="qty"
          placeholder="Enter your quantity"
          description="Quantity"
          type="number"
        />
        {watch("imageUrl") && (
          <>
            <div className="flex justify-center gap-4">
              <Image src={watch("imageUrl")} width={300} height={300} alt="Preview" />
              <Button
                onClick={() => setValue("imageUrl", "")}
              >
                <X />
              </Button>
            </div>
          </>
        )}
        {!watch("imageUrl") && (
          <ImageUpload
            setImage={setValue}
          />
        )}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add Good"}
        </Button>
      </form>
    </Form>
  )
}
