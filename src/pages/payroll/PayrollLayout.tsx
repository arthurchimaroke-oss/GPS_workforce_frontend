import { Outlet } from "react-router-dom";
import SidebarLayout from "@/components/layout/SidebarLayout";

export default function PayrollLayout() {
  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  );
}
