import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

function WallpaperCard({ wallpaperName, wallpaperId, wallpaperUri }) {
  const pathname = usePathname();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0 pb-2">
        <CardTitle
          className="rounded-[4px] h-[325px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${wallpaperUri})`,
          }}></CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-lg font-bold truncate">{wallpaperName}</p>
      </CardContent>
      {!pathname === "/dashboard" && (
        <CardFooter className="float-end gap-2 p-3 pt-0">
          <Button size="icon" variant="constructive">
            <Pencil1Icon className="w-[22px] h-[22px]" />
          </Button>
          <Button size="icon" variant="destructive">
            <TrashIcon className="w-[22px] h-[22px]" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
export default WallpaperCard;
