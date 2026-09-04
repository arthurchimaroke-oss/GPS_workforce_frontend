import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "@/components/auth/Logo";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Clock,
  CalendarDays,
  Receipt,
  TrendingUp,
  Briefcase,
  HelpCircle,
  Settings,
  Sun,
  Moon,
  Search,
  Mail,
  MessageSquare,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Newspaper,
  BarChart2,
  GraduationCap,
  Package,
  DollarSign,
  Menu,
  X,
  LogOut,
  User,
  Bell,
} from "lucide-react";
import { useAuth } from "../context/authContext";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    children: [
      { label: "Overview", path: "/dashboard-v1" },
    ],
  },
  {
    label: "Employees",
    icon: Users,
    path: "/employees",
    children: [
      { label: "Manage Employees", path: "/employees" },
      { label: "Directory", path: "/employees/directory" },
      { label: "ORG Chart", path: "/employees/org-chart" },
    ],
  },
  {
    label: "Checklist",
    icon: ClipboardList,
    path: "/checklist",
    children: [
      { label: "To-Dos", path: "/checklist/todos" },
      { label: "Onboarding", path: "/checklist/onboarding" },
      { label: "Offboarding", path: "/checklist/offboarding" },
      { label: "Setting", path: "/checklist/settings" },
    ],
  },
  {
    label: "Time Off",
    icon: Clock,
    path: "/time-off",
    children: [
      { label: "My Time Off", path: "/time-off/my" },
      { label: "Team Time Off", path: "/time-off/team" },
      { label: "Employee Time Off", path: "/time-off/employee" },
      { label: "Settings", path: "/time-off/settings" },
    ],
  },
  {
    label: "Attendance",
    icon: CalendarDays,
    path: "/attendance",
    children: [
      { label: "My Attendance", path: "/attendance/my" },
      { label: "Team Attendance", path: "/attendance/team" },
      { label: "Employee Attendance", path: "/attendance/employee" },
      { label: "Settings", path: "/attendance/settings" },
    ],
  },
  {
    label: "Payroll",
    icon: Receipt,
    path: "/payroll",
    children: [
      { label: "Overview", path: "/payroll/overview" },
      { label: "Employee Payroll", path: "/payroll/list" },
      { label: "Disburse Salary", path: "/payroll/disburse" },
      { label: "Settings", path: "/payroll/settings" },
    ],
  },
  {
    label: "Performance",
    icon: TrendingUp,
    path: "/performance",
    children: [
      { label: "Overview", path: "/performance" },
      { label: "My Performance", path: "/performance/my" },
      { label: "Team", path: "/performance/team" },
      { label: "Reviews", path: "/performance/reviews" },
      { label: "Settings", path: "/performance/settings" },
    ],
  },
  {
    label: "Recruitment",
    icon: Briefcase,
    path: "/recruitment",
    children: [
      { label: "Jobs", path: "/recruitment/jobs" },
      { label: "Candidates", path: "/recruitment/candidates" },
      { label: "EOB", path: "/recruitment/employee_onboarding" },
      { label: "Settings", path: "/recruitment/settings" },
    ],
  },
  {
    label: "News",
    icon: Newspaper,
    path: "/news",
    children: [
      { label: "All News", path: "/news" },
      { label: "Create Article", path: "/news/create" },
    ],
  },
  {
    label: "Reports",
    icon: BarChart2,
    path: "/reports",
    children: [
      { label: "Overview", path: "/reports" },
      { label: "Headcount", path: "/reports/headcount" },
      { label: "Turnover Rate", path: "/reports/turnover" },
      { label: "Onboarding", path: "/reports/onboarding" },
      { label: "Age Distribution", path: "/reports/employee-data/age" },
      { label: "Gender Distribution", path: "/reports/employee-data/gender" },
      { label: "Birthdays", path: "/reports/employee-data/birthday" },
    ],
  },
  {
    label: "Training",
    icon: GraduationCap,
    path: "/training",
    children: [
      { label: "Overview", path: "/training" },
      { label: "My Courses", path: "/training/my-courses" },
      { label: "Settings", path: "/training/settings" },
    ],
  },
  {
    label: "Assets",
    icon: Package,
    path: "/assets",
    children: [
      { label: "All Assets", path: "/assets" },
      { label: "Settings", path: "/assets/settings" },
    ],
  },
  {
    label: "Expenses",
    icon: DollarSign,
    path: "/expenses",
    children: [
      { label: "All Expenses", path: "/expenses" },
      { label: "New Expense", path: "/expenses/create" },
      { label: "Settings", path: "/expenses/settings" },
    ],
  },
];

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const { logout, user, switchEntity, isSubmitting } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTopNav, setShowTopNav] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Fixed: the user object never had `user_name` — the backend returns
  // `first_name` (see /auth/login, /auth/login/entity, /auth/check_auth
  // docs). These fall back gracefully instead of crashing when user is
  // still loading or a field is missing.
  const displayName = (user?.first_name as string) ?? "";
  const initial = displayName ? displayName[0].toUpperCase() : "?";
  const companyNameDisplay = (user?.company_name as string) ?? "";
  const isSystemAdministrator =
    user?.is_system_administrator === true || user?.role === "system_admin";
  const isEntityAdministrator =
    user?.is_entity_administrator === true || user?.role === "entity_admin";
  const userEntities = Array.isArray(user?.entities) ? user.entities : [];
  const activeEntityId = (user?.active_entity_id as string | null) ?? null;

  const isActivePath = useCallback((path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + "/");
  }, [location.pathname]);

  const getExpandedDefault = useMemo(() => {
    return () => {
      for (const item of sidebarItems) {
        if (item.children) {
          for (const child of item.children) {
            if (location.pathname === child.path) return item.label;
          }
          if (item.path && location.pathname.startsWith(item.path + "/")) return item.label;
        }
        if (item.path && location.pathname === item.path && item.children) return item.label;
      }
      return null;
    };
  }, [location.pathname]);

  const currentExpanded = expandedItem ?? getExpandedDefault();

  const handleNavClick = useCallback((path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setShowTopNav(false);
  }, [navigate]);

  const toggleSidebar = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  const handleItemClick = useCallback((item: typeof sidebarItems[0]) => {
    if (item.children) {
      setExpandedItem(prev => prev === item.label ? null : item.label);
    } else if (item.path) {
      navigate(item.path);
      setMobileMenuOpen(false);
    }
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto bg-card border-r border-border flex flex-col transition-all duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } ${collapsed ? "lg:w-16" : "lg:w-60"} w-60`}
      >
        <div className="flex items-center gap-2 px-4 py-4 border-b border-border">
          {!collapsed && <Logo />}
          <button
            onClick={toggleSidebar}
            className="ml-auto text-muted-foreground hover:text-foreground lg:block hidden"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="ml-auto text-muted-foreground hover:text-foreground lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-2 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = isActivePath(item.path) && !item.children;
            const isParentActive = item.children?.some((c) => isActivePath(c.path));
            const isExpanded = currentExpanded === item.label;

            return (
              <div key={item.label}>
                <button
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors mx-2 rounded-lg ${isActive
                      ? "bg-primary text-primary-foreground"
                      : isParentActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    } ${collapsed ? "justify-center px-2 mx-0" : ""}`}
                  style={{ width: collapsed ? undefined : "calc(100% - 16px)" }}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.children ? (
                        isExpanded ? (
                          <ChevronUp className="w-4 h-4 opacity-50" />
                        ) : (
                          <ChevronDown className="w-4 h-4 opacity-50" />
                        )
                      ) : !isActive ? (
                        <ChevronDown className="w-4 h-4 opacity-50" />
                      ) : null}
                    </>
                  )}
                </button>

                {/* Sub-items */}
                {!collapsed && isExpanded && item.children && (
                  <div className="ml-10 mt-1 space-y-0.5">
                    {item.children.map((child) => (
                      <button
                        key={child.label}
                        onClick={() => handleNavClick(child.path)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${location.pathname === child.path
                            ? "text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                          }`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="border-t border-border py-2">
          <button
            onClick={() => handleNavClick("/help")}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground mx-2 rounded-lg relative"
            style={{ width: collapsed ? undefined : "calc(100% - 16px)" }}
          >
            <HelpCircle className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Help Center</span>}
            <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-destructive text-destructive-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              8
            </span>
          </button>
          {
            isEntityAdministrator && <button
            onClick={() => handleNavClick("/settings")}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground mx-2 rounded-lg"
            style={{ width: collapsed ? undefined : "calc(100% - 16px)" }}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Setting</span>}
          </button>
          }
          
        </div>

        {!collapsed && (
          <div className="px-4 py-3 border-t border-border">
            <div className="flex bg-muted rounded-lg p-0.5">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md bg-card shadow-sm text-foreground">
                <Sun className="w-3.5 h-3.5" /> Light
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md text-muted-foreground">
                <Moon className="w-3.5 h-3.5" /> Dark
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-card border-b border-border px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search - Desktop */}
            <div className="hidden md:block relative flex-1 max-w-md">
              <input
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono hidden lg:inline">
                ⌘ F
              </span>
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Top Nav */}
          <nav className="hidden lg:flex items-center gap-4 text-sm text-muted-foreground">
            {[
              { label: "Documents", path: "/employer-documents" },
              { label: "News", path: "/news" },
              { label: "Payslip", path: "/payroll" },
              { label: "Reports", path: "/reports" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:gap-3">
            <button
              onClick={() => handleNavClick("/notifications")}
              className="relative p-2 text-muted-foreground hover:text-foreground"
            >
              <Mail className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-destructive" />
            </button>
            <button
              onClick={() => handleNavClick("/messages")}
              className="relative p-2 text-muted-foreground hover:text-foreground"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-destructive" />
            </button>

            {/* Profile Avatar with Dropdown */}
            <div className="relative ml-1" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(prev => !prev)}
                className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary hover:bg-primary/30 transition-colors"
              >
                {initial}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-card border border-border rounded-lg shadow-lg z-50 py-1 overflow-hidden">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium text-foreground">{displayName.toUpperCase()}</p>
                    <p className="text-xs text-muted-foreground truncate">{companyNameDisplay}</p>
                  </div>

                  {/* Entity switcher */}
                  {userEntities.length > 0 && (
                    <div className="border-b border-border py-2">
                      <p className="px-4 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Switch entity
                      </p>
                      {userEntities.map((entity) => {
                        const isActive = entity.id === activeEntityId;
                        return (
                          <button
                            key={entity.id}
                            disabled={isActive || isSubmitting}
                            onClick={async () => {
                              await switchEntity(entity);
                              setProfileOpen(false);
                            }}
                            className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                              isActive
                                ? "text-foreground font-medium bg-muted/60"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            <span className="flex-1 text-left truncate">{entity.name}</span>
                            {isActive && (
                              <span className="text-[10px] font-semibold uppercase text-primary">Active</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Menu items */}
                  <div className="py-1">
                    <button
                      onClick={() => { handleNavClick("/profile"); setProfileOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      My Profile
                    </button>
                    {isSystemAdministrator && (
                      <button
                        onClick={() => { handleNavClick("/system-settings"); setProfileOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <Settings className="w-4 h-4 text-muted-foreground" />
                        System Settings
                      </button>
                    )}
                    <button
                      onClick={() => { handleNavClick("/notifications"); setProfileOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Bell className="w-4 h-4 text-muted-foreground" />
                      Notifications
                    </button>
                  </div>

                  {/* Divider + Logout */}
                  <div className="border-t border-border py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="md:hidden border-b border-border px-4 py-3 bg-card">
            <div className="relative">
              <input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Top Nav */}
        {showTopNav && (
          <div className="lg:hidden border-b border-border px-4 py-2 bg-card">
            <nav className="flex flex-wrap gap-2">
              {[
                { label: "Documents", path: "/employer-documents" },
                { label: "News", path: "/news" },
                { label: "Payslip", path: "/payroll" },
                { label: "Reports", path: "/reports" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.path)}
                  className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;