"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const DocumentsPage = () => {
    const { user } = useUser();
    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = create({ title: "Untitled" });
        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note  created!",
            error: "Failed to create a new note",
        });
    };

    return (
        <div className="flex h-full flex-col items-center justify-center space-y-4">
            <Image
                src="/empty.svg"
                alt="empty"
                height="300"
                width="300"
                priority
                className="h-auto dark:hidden"
            />
            <Image
                src="/empty-dark.svg"
                alt="empty"
                height="300"
                width="300"
                priority
                className="hidden h-auto dark:block"
            />
            <h2 className="text-lg font-medium">
                Welcome to {user?.lastName}&apos;s Zotion
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create a note
            </Button>
        </div>
    );
};
export default DocumentsPage;
