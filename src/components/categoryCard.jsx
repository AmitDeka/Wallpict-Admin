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
import { usePathname } from "next/navigation";

function CategoryCard({ categoryName, categoryId, categoryBgUri, onDelete }) {
  const pathname = usePathname();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0 pb-2">
        <CardTitle
          className="rounded-[4px] h-[100px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${categoryBgUri})`,
          }}></CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-lg font-bold truncate">{categoryName}</p>
      </CardContent>
      {pathname === "/dashboard" ? (
        ""
      ) : (
        <CardFooter className="float-end gap-2 p-3 pt-0">
          <Button size="icon" variant="constructive">
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
