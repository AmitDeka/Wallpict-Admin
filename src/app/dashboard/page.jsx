"use client";

import CategoryCard from "@/components/categoryCard";
import Header from "@/components/header";
import HeroCards from "@/components/heroCards";
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
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

function Dashboard() {
  const [category, setCategory] = useState([]);
  const [wallpaper, setWallpaper] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const visibleCount = 10;

  useEffect(() => {
    getAllCategory();
    getAllWallpaper();
  }, []);

  const getAllCategory = async () => {
    try {
      const response = await api.get("/api/category");
      const categoryData = response?.data?.category || [];
      if (categoryData.length) {
        setCategory(categoryData);
        setIsLoading(false);
      } else {
        setError("Nothing is in here 🥲");
      }
    } catch (error) {
      setError(
        "Failed to fetch category from server. Check browser console for more information"
      );
      console.log("Fetching error :", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllWallpaper = async () => {
    try {
      const response = await api.get("/api/wallpaper");
      const wallpaperData = response?.data?.wallpaper || [];
      console.log(wallpaperData);
      if (wallpaperData.length) {
        setWallpaper(wallpaperData);
      } else {
        setError("Nothing is in here 🥲");
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

  const renderSkeletons = (count) => {
    return Array.from({ length: count }).map((_, index) => (
      <Card key={index} className="overflow-hidden">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="rounded-[4px] h-[80px] w-full bg-cover bg-center bg-no-repeat">
            <Skeleton className="w-full h-full rounded-none" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <Skeleton className="w-full h-[28px]" />
        </CardContent>
      </Card>
    ));
  };

  const renderCategories = () => {
    return category
      .slice(0, visibleCount)
      .map((cat) => (
        <CategoryCard
          key={cat._id}
          categoryName={cat.categoryName}
          categoryBgUri={cat.categoryBanner}
        />
      ));
  };

  const renderWallpapers = () => {
    return wallpaper
      .slice(0, visibleCount)
      .map((wall) => (
        <WallpaperCard
          key={wall._id}
          wallpaperName={wall.wallpaperName}
          wallpaperUri={wall.wallpaperURL}
        />
      ));
  };

  const catCount = category.length;
  const wallCount = wallpaper.length;

  return (
    <>
      <Header />
      <section className="lg:p-8 md:p-6 p-4">
        <HeroCards catCount={catCount} wallCount={wallCount} />
        <div className="mt-4 mb-2">
          <h1 className="inline-flex items-center mb-3 text-xl font-bold">
            Recently added Categories
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </h1>

          {isLoading && (
            <div className="md:grid-cols-3 lg:grid-cols-4 md:gap-6 grid grid-cols-2 gap-4">
              {renderSkeletons(visibleCount)}
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
            <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 grid grid-cols-1 gap-4">
              {renderCategories()}
            </div>
          )}
        </div>
        <div className="mt-4 mb-4">
          <h1 className="inline-flex items-center mb-3 text-xl font-bold">
            Recently added Wallpapers
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </h1>
          {isLoading && (
            <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 grid grid-cols-1 gap-4">
              {renderSkeletons(visibleCount)}
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
            <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 grid grid-cols-1 gap-4">
              {renderWallpapers()}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
export default Dashboard;
