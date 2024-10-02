"use client";
import Header from "@/components/header";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import WallpaperCard from "@/components/wallpaperCard";
import { api } from "@/utils/api";
import { ArrowRightIcon, HandIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Wallpaper() {
  const [wallpaper, setWallpaper] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const skeletonCount = 12;

  useEffect(() => {
    getAllWallpaper();
  }, [page]);

  const getAllWallpaper = async () => {
    try {
      const response = await api.get("/api/wallpaper", {
        params: {
          page,
        },
      });
      const wallpaperData = response?.data?.wallpaper || [];

      if (wallpaperData.length) {
        setWallpaper([...wallpaper, ...wallpaperData]);
      } else if (wallpaperData.length < 12) {
        setHasMore(false);
      } else {
        setError("No wallpapers found.");
      }
    } catch (error) {
      setError(
        "Failed to fetch wallpaper from server. Check browser console for more information"
      );
      console.log("Fetching error :", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWallpaper = async (wallpaperId) => {
    try {
      await api.delete(`/api/wallpaper/${wallpaperId}`);
      setCategory((prevWallpaper) =>
        prevWallpaper.filter((cat) => cat._id !== wallpaperId)
      );
    } catch (error) {
      console.error("Failed to delete category:", error.message);
    }
  };

  const renderSkeletons = (count) => {
    return Array.from({ length: count }).map((_, index) => (
      <Card key={index} className="overflow-hidden">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="rounded-[4px] h-[325px] w-full bg-cover bg-center bg-no-repeat">
            <Skeleton className="w-full h-full rounded-none" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <Skeleton className="w-full h-[28px]" />
        </CardContent>
        <CardFooter className="float-end gap-2 p-3 pt-0">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
        </CardFooter>
      </Card>
    ));
  };

  const renderWallpapers = () => {
    return wallpaper.map((wall) => (
      <WallpaperCard
        key={wall._id}
        wallpaperId={wall._id}
        wallpaperName={wall.wallpaperName}
        wallpaperUri={wall.wallpaperURL}
        onDelete={deleteWallpaper}
      />
    ));
  };

  const fetchMoreWallpaper = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <Header />
      <section className="lg:p-8 md:p-6 p-4">
        <div className="my-4">
          <h1 className="inline-flex items-center mb-3 text-xl font-bold">
            All Wallpapers
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </h1>

          {isLoading && (
            <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-6 grid grid-cols-1 gap-4">
              {renderSkeletons(skeletonCount)}
            </div>
          )}

          {!isLoading && error && (
            <Card className="md:w-8/12 lg:w-1/2 w-full mx-auto">
              <CardHeader className="py-4">
                <CardTitle className="text-xl text-center">
                  Oops! Something went wrong.
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p className="text-destructive text-lg text-center">{error}</p>
              </CardContent>
            </Card>
          )}

          {!isLoading && !error && (
            <InfiniteScroll
              className=""
              dataLength={wallpaper.length}
              next={fetchMoreWallpaper}
              hasMore={hasMore}
              loader={
                <div className="text-muted-foreground inline-flex items-center justify-center w-full my-4 text-center">
                  <UpdateIcon className="animate-spin w-5 h-5"></UpdateIcon>
                  <h6 className="ms-2 text-lg">Fetching more data</h6>
                </div>
              }
              endMessage={
                <div className="text-muted-foreground inline-flex items-center justify-center w-full my-4 text-center">
                  <HandIcon className="animate-pulse w-5 h-5"></HandIcon>
                  <h6 className="ms-2 text-lg">Hey! You have seen it all.</h6>
                </div>
              }>
              <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-6 grid grid-cols-1 gap-4">
                {renderWallpapers()}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </section>
    </>
  );
}
export default Wallpaper;
