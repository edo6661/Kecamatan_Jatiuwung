import {
  AlertDialog as Alert,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import React from 'react'
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
interface AlertDialogProps {
  action: () => void;
  isPending: boolean;
}
const AlertDialog = (
  { action, isPending }: AlertDialogProps
) => {
  return (
    <Alert>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className=" border-none w-fit h-fit px-0 py-0"
        >
          <Badge
            variant="destructive"
          >
            <X size="16" />
          </Badge>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="fl-ic">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="hover:bg-destructive bg-second transition-all duration-200 mt-2 text-black hover:text-white"
            onClick={action}
            disabled={isPending}

          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </Alert>
  )
}

export default AlertDialog