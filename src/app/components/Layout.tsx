import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { MapPin, Users, FileText, UserCheck, Menu, LayoutDashboard, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/live-tracking", label: "Live Tracking", icon: MapPin },
    { path: "/customer-visit", label: "Customer Visit", icon: UserCheck },
    { path: "/reports", label: "Reports", icon: FileText },
    { path: "/salesman", label: "Salesman", icon: Users },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-blue-600 to-blue-800 text-white transition-all duration-300 fixed h-full z-10 shadow-xl`}
      >
        {/* Header */}
        <div className="p-4 border-b border-blue-500 flex items-center justify-between">
          {isSidebarOpen && (
            <div>
              <h1 className="font-bold text-xl">SalesTrack</h1>
              <p className="text-blue-200 text-xs">Location Tracking System</p>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Menu className="size-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  active
                    ? "bg-white text-blue-600 shadow-lg"
                    : "text-white hover:bg-blue-700"
                }`}
              >
                <Icon className="size-5 flex-shrink-0" />
                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {isSidebarOpen && (
          <div className="absolute bottom-0 w-full border-t border-blue-500">
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-full bg-blue-700 flex items-center justify-center">
                  <Users className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{user?.name}</p>
                  <p className="text-blue-200 text-xs truncate">{user?.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-blue-700 hover:bg-blue-600 text-white border-blue-500"
                onClick={handleLogout}
              >
                <LogOut className="size-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        )}
        
        {!isSidebarOpen && (
          <div className="absolute bottom-0 w-full p-4 border-t border-blue-500">
            <button
              onClick={handleLogout}
              className="w-full p-2 hover:bg-blue-700 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="size-5 mx-auto" />
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main
        className={`${
          isSidebarOpen ? "ml-64" : "ml-20"
        } flex-1 overflow-auto transition-all duration-300`}
      >
        <Outlet />
      </main>
    </div>
  );
}