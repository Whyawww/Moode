import { Skeleton } from "@/components/ui/Skeleton";

export default function TaskListSkeleton() {
  return (
    <div className="w-full backdrop-blur-xl bg-surface/40 border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col h-full min-h-[500px]">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32 bg-white/20" />
          <Skeleton className="h-3 w-48 bg-white/10" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full bg-white/10" />{" "}
        {/* Badge count */}
      </div>

      <div className="mb-6 relative">
        <Skeleton className="h-12 w-full rounded-xl bg-surface/50" />
      </div>

      <div className="flex-1 space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-surface/30"
          >
            <div className="flex items-center gap-3 w-full">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>

      {/* Button Skeleton */}
      <div className="mt-6 pt-6 border-t border-white/5">
        <Skeleton className="h-12 w-full rounded-xl bg-primary/20" />
      </div>
    </div>
  );
}
