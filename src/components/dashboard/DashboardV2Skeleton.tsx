import { Skeleton } from "@/components/ui/skeleton";

const DashboardV2Skeleton = () => (
  <div className="space-y-6">
    {/* 4 Stat cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {["Permanent Employees", "Contract employees", "Freelance Employees", "Internship/Training"].map((label) => (
        <div key={label} className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm text-hr-text-light mb-2">{label}</p>
          <Skeleton className="h-8 w-20 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>

    {/* 3 Chart cards */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {["Total Employee", "Job Summary", "Team Performance"].map((title) => (
        <div key={title} className="bg-card border border-border rounded-xl p-5">
          <div className="flex justify-between mb-4">
            <p className="font-semibold text-foreground">{title}</p>
            <Skeleton className="h-6 w-16 rounded" />
          </div>
          <div className="flex justify-center mb-4">
            <Skeleton className="w-36 h-36 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>

    {/* Employee table */}
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex justify-between mb-4">
        <p className="font-semibold text-foreground">Employees</p>
        <Skeleton className="h-10 w-48 rounded-lg" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
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

export default DashboardV2Skeleton;
