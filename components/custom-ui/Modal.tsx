import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
interface ModalProps {
  title: string
  description: string
  trigger: React.ReactNode
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}
export default function Modal(
  { title, description, trigger, children, isOpen, onClose, onOpen }: ModalProps
) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="outline" className=" border-none"
          onClick={onOpen}
        >{trigger}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button type="submit"
            onClick={() => { }}
          >Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
