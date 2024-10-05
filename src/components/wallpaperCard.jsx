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

import { EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

function WallpaperCard({ wallpaperName, wallpaperId, wallpaperUri, onDelete }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/add-wallpaper?id=${wallpaperId}`);
  };

  const viewOriginal = () => {
    window.open(wallpaperUri, "_blank");
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="rounded-[4px] h-[325px] relative">
          <Image
            src={wallpaperUri}
            fill
            style={{ objectFit: "cover" }}
            alt={wallpaperName}
            loading="lazy"
            quality={30}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-lg font-bold truncate">{wallpaperName}</p>
        <p className="text-sm font-bold">{wallpaperId}</p>
      </CardContent>
      {pathname === "/dashboard" ? (
        <></>
      ) : (
        <CardFooter className="float-end gap-2 p-3 pt-0">
          <Button size="icon" variant="default" onClick={viewOriginal}>
            <EyeOpenIcon className="w-[22px] h-[22px]" />
          </Button>
          <Button size="icon" variant="constructive" onClick={handleEdit}>
            <Pencil1Icon className="w-[22px] h-[22px]" />
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
                  wallpaper <strong>{wallpaperName}</strong>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant="outline">Cancel</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(wallpaperId)}>
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
export default WallpaperCard;
