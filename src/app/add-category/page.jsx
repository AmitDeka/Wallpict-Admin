"use client";
import Header from "@/components/header";
import ImageUpload from "@/components/imageUpload";
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
import { useState } from "react";

function AddCategory() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const initialCategoryState = {
    categoryName: "",
    categoryBanner: "",
  };

  const [category, setCategory] = useState(initialCategoryState);
  const [resetKey, setResetKey] = useState(0);

  const handleGetImageUrl = (url) => {
    if (url) {
      setCategory((prev) => ({
        ...prev,
        categoryBanner: url,
      }));
    }
  };

  const handleCreateCategory = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/api/category", category);
      toast({
        variant: "constructive",
        title: "Category created successfully.",
      });
      setCategory(initialCategoryState);
      setResetKey((prevKey) => prevKey + 1);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "Failed to create category. Please try again. Check Console log for more details.",
      });
      console.log(error);
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
              <CardTitle className="text-2xl">Add Category</CardTitle>
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
                label="Choose Background"
                key={resetKey}
                handleGetImageUrl={handleGetImageUrl}
              />
            </CardContent>
            <CardFooter className="justify-end">
              <Button
                size="lg"
                variant="default"
                onClick={handleCreateCategory}
                disabled={
                  !category.categoryName ||
                  !category.categoryBanner ||
                  isLoading
                }>
                {isLoading ? (
                  <>
                    <ReloadIcon className="animate-spin w-4 h-4 mr-1" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FileTextIcon className="w-4 h-4 mr-1" />
                    Save
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
export default AddCategory;
