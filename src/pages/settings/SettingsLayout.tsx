import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Building2, MapPin, Users, Briefcase, Calendar, Shield, Link2, Zap, Lock, Bell, Menu, X, ChevronRight } from "lucide-react";

const organizationNav = [
  { label: "Company Profile", icon: Building2, path: "/settings/company" },
  { label: "Entities", icon: MapPin, path: "/settings/offices" },
  { label: "Users", icon: Users, path: "/settings/department" },
  { label: "Roles", icon: Briefcase, path: "/settings/job-titles" },
  { label: "Permissions", icon: Shield, path: "/settings/permission" },
];

const workspaceNav = [
  { label: "Work Schedule", icon: Calendar, path: "/settings/work-schedule" },
  { label: "Integration", icon: Link2, path: "/settings/integration" },
  { label: "Subscription", icon: Zap, path: "/settings/subscription" },
  { label: "Password", icon: Lock, path: "/settings/password" },
  { label: "Notifications", icon: Bell, path: "/settings/push-notifications" },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
}

const SettingsLayoutInner = ({ children, activeTab }: SettingsLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleNavClick = useCallback((path: string) => {
    navigate(path);
    setMobileNavOpen(false);
    setShowMobileMenu(false);
  }, [navigate]);

  const currentPath = activeTab || location.pathname;
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filterNav = <T extends { label: string }>(items: T[]) =>
    normalizedQuery ? items.filter((item) => item.label.toLowerCase().includes(normalizedQuery)) : items;

  const filteredOrganizationNav = filterNav(organizationNav);
  const filteredWorkspaceNav = filterNav(workspaceNav);

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Organization</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage company structure, access, roles, and entity scope.</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden flex items-center gap-2"
            >
              <Menu className="w-4 h-4" />
              Settings Menu
            </Button>

            {/* Desktop Search */}
            <div className="relative hidden sm:block">
              <Input
                placeholder="Search settings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>

            {/* Mobile Search Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="sm:hidden"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileNavOpen && (
          <div className="sm:hidden border border-border rounded-lg p-3 bg-card">
            <div className="relative">
              <Input
                placeholder="Search settings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10"
                autoFocus
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        )}

        <div className="flex gap-6">
          {/* Mobile Settings Menu */}
          {showMobileMenu && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setShowMobileMenu(false)}
              />
              <div className="fixed inset-y-0 right-0 z-50 w-72 bg-card border-l border-border lg:hidden shadow-xl flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h2 className="font-semibold text-foreground">Settings Menu</h2>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  <div className="space-y-1">
                    <p className="px-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Organization</p>
                    {filteredOrganizationNav.map((item) => {
                      const isActive = currentPath === item.path;
                      return (
                        <button
                          key={item.label}
                          onClick={() => handleNavClick(item.path)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors ${isActive
                              ? "bg-muted font-medium text-foreground"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            }`}
                        >
                          <item.icon className="w-5 h-5 flex-shrink-0" />
                          <span className="flex-1 text-left">{item.label}</span>
                          {isActive && <ChevronRight className="w-4 h-4" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-1">
                    <p className="px-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Workspace</p>
                    {filteredWorkspaceNav.map((item) => {
                      const isActive = currentPath === item.path;
                      return (
                        <button
                          key={item.label}
                          onClick={() => handleNavClick(item.path)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors ${isActive
                              ? "bg-muted font-medium text-foreground"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            }`}
                        >
                          <item.icon className="w-5 h-5 flex-shrink-0" />
                          <span className="flex-1 text-left">{item.label}</span>
                          {isActive && <ChevronRight className="w-4 h-4" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Desktop Side Nav */}
          <div className="hidden lg:block w-64 flex-shrink-0 space-y-6">
            <div className="space-y-1 rounded-2xl border border-border bg-card p-3">
              <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Organization</p>
              {filteredOrganizationNav.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-3 text-sm rounded-xl transition-colors ${isActive
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
            </div>

            <div className="space-y-1 rounded-2xl border border-border bg-card p-3">
              <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Workspace</p>
              {filteredWorkspaceNav.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-3 text-sm rounded-xl transition-colors ${isActive
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default SettingsLayoutInner;
