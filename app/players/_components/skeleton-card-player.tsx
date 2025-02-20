import { Skeleton } from "@/app/_components/ui/skeleton";

export function SkeletonCardPlayer() {
  return (
    <div className="flex flex-col space-y-4">
      <Skeleton className="h-[125px]  rounded-xl" />
      <Skeleton className="h-[125px]  rounded-xl" />
      <Skeleton className="h-[125px]  rounded-xl" />
    </div>
  );
}
