"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import { addBorrow, addReasonToBorrow } from "@/actions/borrow"
import FormInput from "@/components/custom-ui/FormInput"

const FormSchema = z.object({
  reason: z.string().min(2, {
    message: "Reason must be at least 2 characters",
  })
})

interface FormItemReasonProps {
  onClose: () => void
  id: string
  reason: string | null
}

export default function FormItemReason({ onClose, id, reason
}: FormItemReasonProps) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reason: reason || ""
    }
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    startTransition(() => {

      addReasonToBorrow(id, data.reason)
        .then(() => {
          toast.success("Reason Added Successfully")
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
          label="Reason"
          name="reason"
          placeholder="Enter your reason"
          description="Why are you Approved or Disapprove this item?"
        />
        <Button type="submit"
          disabled={isPending}
        >Submit</Button>
      </form>
    </Form>
  )
}
