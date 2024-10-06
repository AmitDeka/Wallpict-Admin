import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoadingFallback() {
  return (
    <div className="lg:p-8 md:p-6 p-4">
      <div className="md:w-3/5 w-full mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-48 h-6" />
            </CardTitle>
          </CardHeader>
          <CardContent className="gap-y-4 grid">
            <div className="grid w-full items-center gap-1.5">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-full h-10" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-full h-10" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-full h-10" />
            </div>
            <Skeleton className="w-full h-40" />
          </CardContent>
          <CardFooter className="justify-end">
            <Skeleton className="w-32 h-12" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
