import { Skeleton } from "@/components/ui/skeleton";

const DashboardV1Skeleton = () => (
  <div className="space-y-6">
    {/* Stat cards skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-card border border-border rounded-xl p-5">
          <Skeleton className="w-10 h-10 rounded-full mb-4" />
          <Skeleton className="h-8 w-24 mb-2" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20 mt-2" />
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      {/* Team Performance skeleton */}
      <div className="xl:col-span-2 bg-card border border-border rounded-xl p-5">
        <div className="flex justify-between mb-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-8 w-28 rounded-lg" />
        </div>
        <div className="flex items-end gap-4 h-48">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex-1 flex flex-col justify-end gap-1">
              <Skeleton className="w-full" style={{ height: `${Math.random() * 100 + 40}px` }} />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Donut chart skeleton */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex justify-between mb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex justify-center mb-4">
          <Skeleton className="w-40 h-40 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>

    {/* Employee table skeleton */}
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex justify-between mb-4">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-10 w-48 rounded-lg" />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Skeleton className="h-10 rounded-lg" />
        <Skeleton className="h-10 rounded-lg" />
        <Skeleton className="h-10 rounded-lg" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="grid grid-cols-5 gap-4">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DashboardV1Skeleton;
