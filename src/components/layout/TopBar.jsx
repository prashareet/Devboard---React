import { useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function TopBar({
  setIsCreateTaskOpen,
  setIsCreateProjectOpen,
  search,
  setSearch,
}) {
  const location = useLocation();

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/tasks": "Tasks",
    "/projects": "Projects",
    "/analytics": "Analytics",
    "/settings": "Settings",
  };

  const pageTitle = pageTitles[location.pathname] || "DevBoard";

  const isTasksPage = location.pathname === "/tasks";
  const isProjectsPage = location.pathname === "/projects";

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-800 px-4">
      <h1 className="text-sm font-semibold text-zinc-100">{pageTitle}</h1>

      <div className="flex items-center gap-2">
        {isTasksPage && (
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="hidden w-64 border-zinc-800 bg-zinc-900 text-zinc-200 placeholder:text-zinc-500 sm:block"
          />
        )}

        {isProjectsPage ? (
          <Button
            onClick={() => setIsCreateProjectOpen(true)}
            size="sm"
            className="gap-2 bg-indigo-600 text-white hover:bg-indigo-500"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New Project</span>
          </Button>
        ) : (
          <Button
            onClick={() => setIsCreateTaskOpen(true)}
            size="sm"
            className="gap-2 bg-indigo-600 text-white hover:bg-indigo-500"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add Task</span>
          </Button>
        )}
      </div>
    </header>
  );
}

export default TopBar;
