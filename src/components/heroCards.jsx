"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

function HeroCards({ catCount, wallCount }) {
  const router = useRouter();

  const goToWallpaper = () => {
    router.push("/wallpaper");
  };

  const goToCategory = () => {
    router.push("/category");
  };

  return (
    <div className="md:grid-cols-2 md:gap-8 grid gap-4">
      <Card
        x-chunk="dashboard-01-chunk-0"
        className=" relative overflow-hidden">
        <Button
          onClick={goToWallpaper}
          title="View all"
          variant="default"
          size="icon"
          className="-right-1 -bottom-1 absolute w-12 h-12 rounded-full">
          <ArrowRightIcon className="w-8 h-8" />
        </Button>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Total Wallpapers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{wallCount}</div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-1" className="relative overflow-hidden">
        <Button
          onClick={goToCategory}
          title="View all"
          variant="default"
          size="icon"
          className="-right-1 -bottom-1 absolute w-12 h-12 rounded-full">
          <ArrowRightIcon className="w-8 h-8" />
        </Button>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Total Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{catCount}</div>
        </CardContent>
      </Card>
    </div>
  );
}
export default HeroCards;
