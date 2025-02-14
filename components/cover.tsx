"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/useCoverImage";
import { useEdgeStore } from "@/lib/edgestore";
import { useParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from '@/components/ui/skeleton';


interface CoverImageProps {
    url?: string;
    preview?: boolean;
}


export const Cover = ({ url, preview }: CoverImageProps) => {
    const { edgestore } = useEdgeStore();

    const params = useParams();
    const coverImage = useCoverImage();
    const removeCoverImage = useMutation(api.documents.removeCoverImage);

    const onRemove = async () => {
        if (url) {
            await edgestore.publicFiles.delete({
                //we've pass the url as value which we want to delete
                url: url,
            });
        }
        //also removing from our convex database
        removeCoverImage({
            id: params.documentId as Id<"documents">,
        });
    };

    return (<div className={cn('relative w-full h-[35vh] group', !url && 'h-[12vh] ', url && 'bg-muted')}>{
        !!url && (
            <Image
                src={url}
                fill
                alt='cover'
                className='object-fit'
            />
        )
    }
        {
            url && !preview && (
                <div className="absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100">
                    <Button
                        onClick={() => coverImage.onReplace(url)}
                        className="text-xs text-muted-foreground"
                        variant="outline"
                        size="sm"
                    >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Change cover
                    </Button>
                    <Button
                        onClick={onRemove}
                        className="text-xs text-muted-foreground"
                        variant="outline"
                        size="sm"
                    >
                        <X className="h-4 w-4 mr-2" />
                        Remove
                    </Button>
                </div>
            )
        }

    </div>);
};

Cover.Skeleton = function CoverSkeleton() {
    return <Skeleton className="h-[12vh] w-full" />;
};