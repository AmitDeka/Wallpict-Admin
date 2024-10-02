"use client";
import { useEffect, useState } from "react";
import CategoryCard from "@/components/categoryCard";
import Header from "@/components/header";
import { api } from "@/utils/api";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function Category() {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const skeletonCount = 12;

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      const response = await api.get("/api/category");
      const categoryData = response?.data?.category || [];
      if (categoryData.length) {
        setCategory(categoryData);
        setIsLoading(false);
      } else {
        setError("No categories found.");
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

  const deleteCategory = async (categoryId) => {
    try {
      await api.delete(`/api/category/${categoryId}`);
      setCategory((prevCategory) =>
        prevCategory.filter((cat) => cat._id !== categoryId)
      );
    } catch (error) {
      console.error("Failed to delete category:", error.message);
    }
  };

  const renderSkeletons = (count) => {
    return Array.from({ length: count }).map((_, index) => (
      <Card key={index} className="overflow-hidden">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="rounded-[4px] h-[100px] w-full bg-cover bg-center bg-no-repeat">
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

  const renderCategories = () => {
    return category.map((cat) => (
      <CategoryCard
        key={cat._id}
        categoryId={cat._id}
        categoryName={cat.categoryName}
        categoryBgUri={cat.categoryBanner}
        onDelete={deleteCategory}
      />
    ));
  };

  return (
    <>
      <Header />
      <section className="lg:p-8 md:p-6 p-4">
        <div className="my-4">
          <h1 className="inline-flex items-center mb-3 text-xl font-bold">
            All Categories
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </h1>

          {isLoading && (
            <div className="md:grid-cols-3 lg:grid-cols-4 md:gap-6 grid grid-cols-2 gap-4">
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
            <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 grid grid-cols-1 gap-4">
              {renderCategories()}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
export default Category;
