"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { useCoverImage } from "@/hooks/useCoverImage";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";

export const CoverImageModal = () => {
  const params = useParams();

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = useMutation(api.documents.update);
  const coverImage = useCoverImage();

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        {/* <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        /> */}
        <div>TODO Upload image</div>
      </DialogContent>
    </Dialog>
  );
};
