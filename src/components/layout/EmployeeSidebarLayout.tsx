import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/auth/Logo";
import {
  LayoutDashboard,
  Clock,
  CalendarDays,
  Receipt,
  TrendingUp,
  Heart,
  FileText,
  HelpCircle,
  Settings,
  Sun,
  Moon,
  Search,
  Mail,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  User,
  Bell,
  X,
  Menu,
} from "lucide-react";

interface EmployeeSidebarLayoutProps {
  children: React.ReactNode;
  currentView?: string;
  onViewChange?: (view: string) => void;
}

const employeeSidebarItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    id: "dashboard",
  },
  {
    label: "Time Off",
    icon: Clock,
    id: "timeoff",
  },
  {
    label: "Attendance",
    icon: CalendarDays,
    id: "attendance",
  },
  {
    label: "Payroll",
    icon: Receipt,
    id: "payroll",
  },
  {
    label: "Performance",
    icon: TrendingUp,
    id: "performance",
  },
  {
    label: "Benefits",
    icon: Heart,
    id: "benefits",
  },
  {
    label: "Payments",
    icon: FileText,
    id: "wallet",
  },
  {
    label: "Bank Transfer",
    icon: Receipt,
    id: "banktransfer",
  },
  {
    label: "Claim Salary",
    icon: TrendingUp,
    id: "claimsalary",
  },
  {
    label: "Documents",
    icon: FileText,
    id: "documents",
  },
];

const EmployeeSidebarLayout = ({ children, currentView = "dashboard", onViewChange }: EmployeeSidebarLayoutProps) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const isActive = useCallback((id: string) => {
    return currentView === id;
  }, [currentView]);

  const handleViewChange = useCallback((id: string) => {
    if (onViewChange) {
      onViewChange(id);
    }
    setMobileMenuOpen(false);
  }, [onViewChange]);

  const notifications = [
    { title: "Payroll Processed", desc: "Your payroll for this month has been processed successfully.", time: "5 min ago", unread: true },
    { title: "Time Off Approved", desc: "Your time off request has been approved by your manager.", time: "2 hours ago", unread: true },
    { title: "Performance Review Due", desc: "Your performance review is due in 3 days.", time: "1 day ago", unread: false },
    { title: "New Document Available", desc: "A new document has been shared with you.", time: "2 days ago", unread: false },
  ];

  const unreadNotificationsCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-background relative">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto bg-card border-r border-border transition-all duration-300 flex flex-col ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "lg:w-16" : "lg:w-64"} w-64`}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!isCollapsed && <Logo />}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-muted transition-colors lg:block hidden"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-md hover:bg-muted transition-colors lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {employeeSidebarItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                  isActive(item.id)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="font-medium">{item.label}</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            {!isCollapsed && <span>Theme</span>}
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <HelpCircle className="w-5 h-5" />
            {!isCollapsed && <span>Help</span>}
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <Settings className="w-5 h-5" />
            {!isCollapsed && <span>Settings</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-4 lg:px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            >
              <Menu className="w-5 h-5" />
            </button>

            <h1 className="text-base lg:text-xl font-semibold text-foreground hidden sm:block">
              Employee Portal
            </h1>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            {/* Search - Desktop */}
            <div className="hidden md:block relative">
              <input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-48 lg:w-64 rounded-lg border border-border bg-background pl-9 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mail/Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowMessages(false);
                  setShowUserMenu(false);
                }}
                className="relative p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">Notifications</h3>
                      <button onClick={() => navigate("/employee-notifications")} className="text-xs text-primary hover:underline">
                        View All
                      </button>
                    </div>
                    <div className="divide-y divide-border">
                      {notifications.map((n, i) => (
                        <div key={i} className={`p-4 hover:bg-muted/50 cursor-pointer ${n.unread ? "bg-muted/30" : ""}`}>
                          <p className="text-sm font-medium text-foreground">{n.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{n.desc}</p>
                          <p className="text-[10px] text-muted-foreground mt-2">{n.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Messages */}
            <button
              onClick={() => navigate("/employee-messages")}
              className="relative p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                2
              </span>
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                  setShowMessages(false);
                }}
                className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary hover:bg-primary/30 transition-colors"
              >
                E
              </button>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                  <div className="absolute right-0 top-12 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                    <div className="p-3 border-b border-border">
                      <p className="text-sm font-medium text-foreground">Employee User</p>
                      <p className="text-xs text-muted-foreground">employee@payflow.com</p>
                    </div>
                    <button
                      onClick={() => {
                        navigate("/employee-dashboard");
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        navigate("/settings");
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        navigate("/sign-in");
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted"
                    >
                      Logout
                    </button>
                  </div>
                </>
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

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};

export default EmployeeSidebarLayout;