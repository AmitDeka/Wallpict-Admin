import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
} from "@/components/ui/alert-dialog";

import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

function CategoryCard({ categoryName, categoryId, categoryBgUri, onDelete }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/add-category?id=${categoryId}`);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="rounded-[4px] h-[120px] relative">
          <Image
            src={categoryBgUri}
            fill
            style={{ objectFit: "cover" }}
            alt={categoryName}
            loading="lazy"
            quality={80}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-lg font-bold truncate">{categoryName}</p>
        <p className="text-sm font-bold">{categoryId}</p>
      </CardContent>
      {pathname === "/dashboard" ? (
        <></>
      ) : (
        <CardFooter className="float-end gap-2 p-3 pt-0">
          <Button size="icon" variant="constructive" onClick={handleEdit}>
            <Pencil1Icon className="w-5 h-5" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="destructive">
                <TrashIcon className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  category <strong>{categoryName}</strong>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant="outline">Cancel</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(categoryId)}>
                    Delete
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      )}
    </Card>
  );
}
export default CategoryCard;
