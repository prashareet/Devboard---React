import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

import CreateTaskModal from "../Tasks/CreateTaskModal";
import CreateProjectModal from "../Projects/CreateProjectModal";

import EditTaskModal from "../Tasks/EditTaskModal";
import EditProjectModal from "../Projects/EditProjectModal";

function AppShell({
  children,

  isCreateTaskOpen,
  setIsCreateTaskOpen,

  onCreate,

  search,
  setSearch,

  isCreateProjectOpen,
  setIsCreateProjectOpen,

  onCreateProject,
  projects,

  isEditTaskOpen,
  setIsEditTaskOpen,
  selectedTask,
  onEditTask,

  isEditProjectOpen,
  setIsEditProjectOpen,
  selectedProject,
  onEditProject,
}) {
  return (
    <div className="flex min-h-screen gap-3 bg-zinc-950 p-3 text-zinc-100">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
        <TopBar
          isCreateTaskOpen={isCreateTaskOpen}
          setIsCreateTaskOpen={setIsCreateTaskOpen}
          isCreateProjectOpen={isCreateProjectOpen}
          setIsCreateProjectOpen={setIsCreateProjectOpen}
          search={search}
          setSearch={setSearch}
        />

        <CreateTaskModal
          open={isCreateTaskOpen}
          onOpenChange={setIsCreateTaskOpen}
          onCreate={onCreate}
          projects={projects}
        />

        <CreateProjectModal
          open={isCreateProjectOpen}
          onOpenChange={setIsCreateProjectOpen}
          onCreateProject={onCreateProject}
        />

        <EditTaskModal
          open={isEditTaskOpen}
          onOpenChange={setIsEditTaskOpen}
          task={selectedTask}
          projects={projects}
          onEditTask={onEditTask}
        />

        <EditProjectModal
          open={isEditProjectOpen}
          onOpenChange={setIsEditProjectOpen}
          project={selectedProject}
          onEditProject={onEditProject}
        />

        <main className="min-h-0 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default AppShell;
