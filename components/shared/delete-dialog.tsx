'use client'
import {useState} from "react"
import { useTransition } from "react";
import { toast } from "sonner";
import {Button} from "../ui/button"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";

const DeleteDialog = ({
    id, 
    action,
}:{
        id: string;
        action: (id: string) => Promise<{ success: boolean; message: string }>;
}) => {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    

    const handleDeleteClick = () => {
        startTransition( async() => {
            const res = await action(id);

            if (!res.success) {
                toast(res.message);
                return;
            }
        })
    }

        return(
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive" className="ml-2">
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure you want to delete it?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action can &apos; t  be undone
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                            Cancel
                    </AlertDialogCancel>
                    <Button
                    variant='destructive'
                    size="sm"
                    disabled={isPending}
                    onClick={handleDeleteClick}
                    >
                        {isPending? 'Deleting..':'Delete'}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        );
}

export default DeleteDialog