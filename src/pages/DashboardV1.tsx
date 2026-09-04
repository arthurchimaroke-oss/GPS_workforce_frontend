import { useState, useEffect } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import StatCard from "@/components/dashboard/StatCard";
import TeamPerformanceChart from "@/components/dashboard/TeamPerformanceChart";
import DonutChart from "@/components/dashboard/DonutChart";
import EmployeeTable from "@/components/dashboard/EmployeeTable";
import DashboardV1Skeleton from "@/components/dashboard/DashboardV1Skeleton";
import {
  Users,
  Briefcase,
  Plus,
  Minus,
  BadgeDollarSign,
  DollarSign
} from "lucide-react";
import { useAuth } from "@/components/context/authContext";
import { useNavigate } from "react-router-dom";

const DashboardV1 = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/sign-in", { replace: true });
    }
  }, [user, isLoading, navigate]);

  // Still checking auth status
  if (isLoading) {
    return <DashboardV1Skeleton />;
  }

  // Redirect is in progress
  if (!user) {
    return null;
  }

  // Fixed: user has no `user_name` field — the backend returns
  // `first_name` (see /auth/login, /auth/login/entity docs).
  const displayName = (user.first_name as string) ?? "";

  return (
    <SidebarLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Hi, {displayName}</h1>
        <p className="text-sm text-hr-text-light">This is your HR report so far</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="grid grid-cols-2 gap-4">
            {/* //users */}
            <StatCard icon={<Users className="w-6 h-6" />} value="3,540" label="Total Employees" change="+25.5%" positive />
            <StatCard icon={<BadgeDollarSign className="w-6 h-6" />} value="1,150" label="Payment Reserves" change="+4.10%" positive />
            <StatCard icon={<Briefcase className="w-6 h-6" />} value="1,150" label="Job applicants" change="+4.10%" positive />
            <StatCard icon={<Plus className="w-6 h-6" />} value="500" label="New Employees" change="+5.1%" positive />
            <StatCard icon={<Minus className="w-6 h-6" />} value="93" label="Resigned Employees" change="+25.5%" positive={false} />
            <StatCard icon={<DollarSign className="w-6 h-6" />} value="1,150" label="Total Salary" change="+4.10%" positive />
          </div>
          <div className="xl:col-span-2 height-full bg-card border border-border rounded-xl p-5">
            <TeamPerformanceChart />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 bg-card border border-border rounded-xl p-5">
            <EmployeeTable />
          </div>
          <DonutChart
            title="Total Employee"
            centerValue="121"
            centerLabel="Total Emp."
            data={[
              { name: "Others", value: 71, color: "#0D9488" },
              { name: "Onboarding", value: 27, color: "#E5A93D" },
              { name: "Offboarding", value: 23, color: "#3B82F6" },
            ]}
          />
        </div>
      </div>
    </SidebarLayout>
  );
};

export default DashboardV1;