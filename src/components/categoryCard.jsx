import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

function CategoryCard({ categoryName, categoryId, categoryBgUri }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0 pb-2">
        <CardTitle
          className=" rounded-[4px] h-[80px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${categoryBgUri})`,
          }}></CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-lg font-bold truncate">{categoryName}</p>
      </CardContent>
      <CardFooter className="float-end gap-2 p-3 pt-0">
        <Button size="icon" variant="constructive">
          <Pencil1Icon className="w-5 h-5" />
        </Button>
        <Button size="icon" variant="destructive">
          <TrashIcon className="w-5 h-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
export default CategoryCard;
