"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"
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
import { addBorrow } from "@/actions/borrow"
import ImageUpload from "@/components/custom-ui/ImageUploader"
import Image from "next/image"

const FormSchema = z.object({
  limitDate: z.date({
    required_error: "A borrow Time is required.",
  }),
  imageUrl: z.string().optional()
})

interface FormBorrowProps {
  onClose: () => void
  borrowGoods: any[]
  onSubmitted: () => void;
}

export default function FormBorrow({ onClose,
  borrowGoods, onSubmitted
}: FormBorrowProps) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    startTransition(() => {
      const actualData = {
        borrowGoods,
        limitDate: data.limitDate,
        imageUrl: data.imageUrl
      }
      addBorrow(actualData)
        .then(() => {
          onSubmitted()
          toast.success("Barang berhasil dipinjam")
          onClose()
        })
        .catch((err) => {
          console.error(err)
          throw err
        })
    })
  }

  const { setValue, watch } = form

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white border w-full h-full p-12 rounded-2xl mx-auto space-y-8"

      >
        <FormField
          control={form.control}
          name="limitDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Borrow Time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        {watch("imageUrl") && (
          <>
            <div className="flex justify-center gap-4">
              <Image src={watch("imageUrl")!} width={300} height={300} alt="Preview" />
              <Button
                onClick={() => setValue("imageUrl", "")}
              >
                <X />
              </Button>
            </div>
          </>
        )}
        {!watch("imageUrl") && (
          <div>
            <FormLabel>Ktp</FormLabel>
            <ImageUpload
              setImage={setValue}
            />
          </div>
        )}

        <Button type="submit"
          disabled={isPending}
        >Submit</Button>
      </form>
    </Form>
  )
}
