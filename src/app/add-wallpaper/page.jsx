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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileTextIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";

function AddWallpaper() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      const response = await api.get("/api/category");
      setCategory(response?.data?.category);
    } catch (error) {
      console.log("Failed to fetch category from server. ", error);
    }
  };

  const initialCategoryState = {
    wallpaperName: "",
    wallpaperResolution: "",
    categoryName: "",
    wallpaperURL: "",
  };

  const [wallpaper, setWallpaper] = useState(initialCategoryState);
  const [resetKey, setResetKey] = useState(0);

  const handleGetImageUrl = (url) => {
    if (url) {
      setWallpaper((prev) => ({
        ...prev,
        wallpaperURL: url,
      }));
    }
  };

  const handleCreateWallpaper = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/api/wallpaper", wallpaper);
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
          "Failed to create wallpaper. Please try again. Check Console log for more details.",
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
              <CardTitle className="text-2xl">Add Wallpaper</CardTitle>
            </CardHeader>
            <CardContent className="gap-y-4 grid">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="wallpaperName">
                  Wallpaper Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="text"
                  id="wallpaperName"
                  placeholder="Enter wallpaper name"
                  required
                  value={wallpaper.wallpaperName}
                  onChange={(e) => {
                    setWallpaper((prevValue) => ({
                      ...prevValue,
                      wallpaperName: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="wallpaperResolution">
                  Wallpaper Resolution
                </Label>
                <Input
                  type="text"
                  id="wallpaperResolution"
                  placeholder="Enter wallpaper resolution"
                  value={wallpaper.wallpaperResolution}
                  onChange={(e) => {
                    setWallpaper((prevValue) => ({
                      ...prevValue,
                      wallpaperResolution: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="categoryName">
                  Wallpaper Category <span className="text-destructive">*</span>
                </Label>
                <Select
                  id="categoryName"
                  value={wallpaper.categoryName}
                  onValueChange={(value) => {
                    setWallpaper((prevValue) => ({
                      ...prevValue,
                      categoryName: value,
                    }));
                  }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {category.map((category) => {
                      return (
                        <SelectItem key={category._id} value={category._id}>
                          {category.categoryName}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <ImageUpload
                label="Choose Wallpaper"
                key={resetKey}
                handleGetImageUrl={handleGetImageUrl}
              />
            </CardContent>
            <CardFooter className="justify-end">
              <Button
                size="lg"
                variant="default"
                onClick={handleCreateWallpaper}
                disabled={
                  !wallpaper.wallpaperName ||
                  !wallpaper.wallpaperResolution ||
                  !wallpaper.categoryName ||
                  !wallpaper.wallpaperURL ||
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
export default AddWallpaper;
