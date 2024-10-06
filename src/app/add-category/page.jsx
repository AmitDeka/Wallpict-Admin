"use client";
import Header from "@/components/header";
import ImageUpload from "@/components/imageUpload";
import LoadingFallback from "@/components/loadingFallback";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/utils/api";
import { FileTextIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function AddCategoryContent() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id");

  const isEditMode = !!categoryId;

  const [isLoading, setIsLoading] = useState(false);

  const initialCategoryState = {
    categoryName: "",
    categoryBanner: "",
  };

  const [category, setCategory] = useState(initialCategoryState);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (isEditMode) {
      fetchCategoryData(categoryId);
    }
  }, [isEditMode, categoryId]);

  const fetchCategoryData = async (id) => {
    try {
      const response = await api.get(`/api/category/${id}`);
      const categoryData = response.data.category;
      setCategory({
        categoryName: categoryData.categoryName,
        categoryBanner: categoryData.categoryBanner,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error fetching category data.",
        description: "Unable to load category for editing.",
      });
      console.error(error);
    }
  };

  const handleGetImageUrl = (url) => {
    if (url) {
      setCategory((prev) => ({
        ...prev,
        categoryBanner: url,
      }));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (isEditMode) {
        await api.put(`/api/category/${categoryId}`, category);
        toast({
          variant: "constructive",
          title: "Category updated successfully.",
        });
      } else {
        await api.post("/api/category", category);
        toast({
          variant: "constructive",
          title: "Category created successfully.",
        });
        setCategory(initialCategoryState);
        setResetKey((prevKey) => prevKey + 1);
      }
      router.push("/category");
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Failed to ${isEditMode ? "update" : "create"} category.`,
        description: "Please try again. Check the console for more details.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="lg:p-8 md:p-6 p-4">
        <div className="md:w-3/5 w- w-full mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {isEditMode ? "Edit Category" : "Add Category"}
              </CardTitle>
            </CardHeader>
            <CardContent className="gap-y-4 grid">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="categoryName">
                  Category Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="text"
                  id="categoryName"
                  placeholder="Enter category name"
                  required
                  value={category.categoryName}
                  onChange={(e) => {
                    setCategory((prevValue) => ({
                      ...prevValue,
                      categoryName: e.target.value,
                    }));
                  }}
                />
              </div>
              <ImageUpload
                label="Choose Banner"
                key={resetKey}
                handleGetImageUrl={handleGetImageUrl}
                initialImageUrl={category.categoryBanner}
              />
            </CardContent>
            <CardFooter className="justify-end">
              <Button
                size="lg"
                variant="default"
                onClick={handleSubmit}
                disabled={
                  !category.categoryName ||
                  !category.categoryBanner ||
                  isLoading
                }>
                {isLoading ? (
                  <>
                    <ReloadIcon className="animate-spin w-4 h-4 mr-1" />
                    {isEditMode ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <FileTextIcon className="w-4 h-4 mr-1" />
                    {isEditMode ? "Update Category" : "Save Category"}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
}

// export default AddCategory;
export default function AddCategory() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AddCategoryContent />
    </Suspense>
  );
}
