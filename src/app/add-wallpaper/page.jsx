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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";

function AddWallpaper() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const wallpaperId = searchParams.get("id");

  const isEditMode = !!wallpaperId;

  const [isLoading, setIsLoading] = useState(false);

  const initialWallpaperState = {
    wallpaperName: "",
    wallpaperResolution: "",
    categoryName: "",
    wallpaperURL: "",
  };

  const [wallpaper, setWallpaper] = useState(initialWallpaperState);
  const [resetKey, setResetKey] = useState(0);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetchCategories();
    if (isEditMode && wallpaperId) {
      fetchWallpaperData(wallpaperId);
    }
  }, [isEditMode, wallpaperId]);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/api/category");
      const categoryData = response?.data?.category || [];
      setCategory(categoryData);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error fetching categories.",
        description: "Unable to load categories for selection.",
      });
      console.error(error);
    }
  };

  const fetchWallpaperData = async (id) => {
    try {
      const response = await api.get(`/api/wallpaper/${id}`);
      const wallpaperData = response?.data?.wallpaper;
      if (wallpaperData) {
        setWallpaper({
          wallpaperName: wallpaperData.wallpaperName,
          wallpaperResolution: wallpaperData.wallpaperResolution,
          categoryName: wallpaperData.categoryName,
          wallpaperURL: wallpaperData.wallpaperURL,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Wallpaper not found.",
          description: "The wallpaper you are trying to edit does not exist.",
        });
        router.push("/wallpaper");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error fetching wallpaper data.",
        description: "Unable to load wallpaper for editing.",
      });
      console.error(error);
    }
  };

  const handleGetImageUrl = (url) => {
    if (url) {
      setWallpaper((prev) => ({
        ...prev,
        wallpaperURL: url,
      }));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (isEditMode) {
        await api.put(`/api/wallpaper/${wallpaperId}`, wallpaper);
        toast({
          variant: "constructive",
          title: "Wallpaper updated successfully.",
        });
      } else {
        await api.post("/api/wallpaper", wallpaper);
        toast({
          variant: "constructive",
          title: "Wallpaper created successfully.",
        });
        setWallpaper(initialWallpaperState);
        setResetKey((prevKey) => prevKey + 1);
      }
      router.push("/wallpaper");
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Failed to ${isEditMode ? "update" : "create"} wallpaper.`,
        description: "Please try again. Check the console for more details.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmit = async () => {
  //   setIsLoading(true);
  //   try {
  //     if (isEditMode) {
  //       await api.put(`/api/wallpaper/${wallpaperId}`, wallpaper);
  //       toast({
  //         variant: "constructive",
  //         title: "Wallpaper updated successfully.",
  //       });
  //     } else {
  //       await api.post("/api/wallpaper", wallpaper);
  //       toast({
  //         variant: "constructive",
  //         title: "Wallpaper added successfully.",
  //       });
  //       setWallpaper(initialWallpaperState);
  //       setResetKey((prevKey) => prevKey + 1);
  //     }
  //     router.push("/category");

  //     // const response = await api.post("/api/wallpaper", wallpaper);
  //     // toast({
  //     //   variant: "constructive",
  //     //   title: "Wallpaper added successfully.",
  //     // });
  //     // setWallpaper(initialWallpaperState);
  //     // setResetKey((prevKey) => prevKey + 1);
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       title: `Failed to ${isEditMode ? "update" : "create"} wallpaper.`,
  //       description: "Please try again. Check the console for more details.",
  //     });
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      <Header />
      <section className="lg:p-8 md:p-6 p-4">
        <div className="md:w-3/5 w- w-full mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {isEditMode ? "Edit Wallpaper" : "Add Wallpaper"}
              </CardTitle>
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
                initialImageUrl={wallpaper.wallpaperURL}
              />
            </CardContent>
            <CardFooter className="justify-end">
              <Button
                size="lg"
                variant="default"
                onClick={handleSubmit}
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
                    {isEditMode ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <FileTextIcon className="w-4 h-4 mr-1" />
                    {isEditMode ? "Update Wallpaper" : "Add Wallpaper"}
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
