import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { OurFileRouter } from "@/app/api/uploadthing/core";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
