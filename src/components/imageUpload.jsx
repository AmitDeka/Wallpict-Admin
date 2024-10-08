import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

function ImageUpload({ handleGetImageUrl, label, initialImageUrl }) {
  const storage = getStorage(app);

  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(0);

  useEffect(() => {
    if (initialImageUrl) {
      setSelectedFile(initialImageUrl);
    }
  }, [initialImageUrl]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
      });
      return;
    }

    const fileSizeKB = Math.round(file.size / 1024);

    if (fileSizeKB > 5120) {
      toast({
        variant: "destructive",
        title: "Upload error",
        description: "Image size must less than 5MB.",
      });
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
    reader.readAsDataURL(file);

    const date = new Date();
    const formattedDate = date
      .toISOString()
      .replace(/T/, "_")
      .replace(/\..+/, "")
      .replace(/:/g, "-");
    const fileName = `${formattedDate}_${file.name}`;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadPercent(progress);

        switch (snapshot.state) {
          case "paused":
            toast({
              variant: "destructive",
              title: "Upload is paused",
            });
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error,
        });
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          toast({
            variant: "constructive",
            title: "Image uploaded successfully.",
          });
          handleGetImageUrl(downloadURL);
          setLoading(false);
        });
      }
    );
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="picture">
        {label} <span className="text-destructive">*</span>
      </Label>
      <Input
        className="file:mr-4 mb-2 file:py-2 file:px-4 file:bg-primary/15 file:border-0 file:rounded-full file:text-sm file:font-bold h-[45.5px] items-center"
        id="catBg"
        type="file"
        required
        accept="image/png, image/jpg, image/jpeg"
        onChange={handleImageUpload}
      />

      {loading ? (
        <Card className="bg-primary/5 overflow-hidden border-0 shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="rounded-[4px] h-[125px] md:h-[150px] lg:h-[175px]">
              <Skeleton className="w-full h-full">
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-muted-foreground flex font-medium">
                    <ReloadIcon className="animate-spin w-4 h-4 mr-2" />
                    Uploading Image
                  </p>
                  <p className="text-muted-foreground mt-2 font-normal">
                    {uploadPercent}% Done
                  </p>
                </div>
              </Skeleton>
            </CardTitle>
          </CardHeader>
        </Card>
      ) : (
        selectedFile && (
          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              <CardTitle className="rounded-[4px] h-[125px] md:h-[150px] lg:h-[175px] relative">
                <Image
                  src={selectedFile}
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Image"
                  loading="lazy"
                  quality={80}
                />
              </CardTitle>
            </CardHeader>
          </Card>
        )
      )}
    </div>
  );
}
export default ImageUpload;
