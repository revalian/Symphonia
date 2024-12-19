import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';
import { Button } from '@/Components/ui/button';
import { flashMessage } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { IconTrash } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function AlertDialogComponent({ supplier }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="red" size="sm">
                    <IconTrash size="4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah anda benar-benar yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus data secara permanen.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() =>
                            router.delete(route('admin.suppliers.destroy', [supplier]), {
                                preserveScroll: true,
                                preserveState: true,
                                onSuccess: (success) => {
                                    const flash = flashMessage(success);
                                    if (flash) toast[flash.type](flash.message);
                                },
                            })
                        }
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
