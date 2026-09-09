import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  BarChart3,
  Settings,
} from "lucide-react";

import NavigationItem from "./NavigationItem.jsx";

function Navigation() {
  const navigationItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Projects",
      path: "/projects",
      icon: FolderKanban,
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: ListTodo,
    },
    {
      label: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <nav className="flex flex-col gap-1">
      {navigationItems.map((item) => (
        <NavigationItem
          key={item.path}
          path={item.path}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </nav>
  );
}

export default Navigation;
