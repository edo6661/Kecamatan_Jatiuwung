/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { toast } from "sonner"
import FormInput from "@/components/custom-ui/FormInput"
import FormCheckbox from "@/components/custom-ui/FormCheckbox"
import { useEffect } from "react"
import { GoodBorrow } from "@/types/good"

const FormSchema = z.object({
  selected: z.boolean().default(false),
  qty: z.string()
})

interface GoodActionsProps {
  setBorrowGoods: React.Dispatch<React.SetStateAction<GoodBorrow[]>>
  goodId: string
  submitted: boolean
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GoodActions({ setBorrowGoods, goodId, submitted, setSubmitted }: GoodActionsProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      selected: false,
      qty: "1"
    },
  })

  const deleteSameGoodId = () => setBorrowGoods((prev) => prev.filter((item) => item.goodId !== goodId))


  function onSubmit(data: z.infer<typeof FormSchema>) {
    const sendedData = {
      qty: +data.qty,
      goodId
    }
    deleteSameGoodId()
    setBorrowGoods((prev) => [...prev, sendedData])
  }

  useEffect(() => {
    if (submitted) {
      form.reset()
      return setSubmitted(false)
    }
    if (form.getValues().selected) {
      form.handleSubmit(onSubmit)()
      return
    } else {
      deleteSameGoodId()
      return
    }

  }, [form.watch("selected"), form.watch("qty"), submitted])


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="fl-ic gap-4">
          <FormCheckbox
            control={form.control}
            name="selected"
          />
          <FormInput
            control={form.control}
            name="qty"
            placeholder="Enter quantity"
            type="number"
          />
        </div>
      </form>
    </Form>
  )
}
