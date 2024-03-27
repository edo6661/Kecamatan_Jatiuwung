import { UploadDropzone } from "@/lib/utils";
import React from "react";
interface ImageUploadProps {
  setImage: any;
}
const ImageUpload = ({ setImage }: ImageUploadProps) => {
  return (
    <>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => setImage("imageUrl", res[0].url)}
        appearance={{
          container: {
            padding: "0.5rem 0",
          },
        }}
      />
    </>
  );
};

export default ImageUpload;
