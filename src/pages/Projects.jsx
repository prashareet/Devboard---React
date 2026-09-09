import React, { useMemo } from "react";

import { FolderKanban, Plus } from "lucide-react";

import ProjectItem from "@/components/Projects/ProjectItem";

import { Button } from "@/components/ui/button";

function Projects({
  projects,
  tasks,
  onEditProject,
  onDeleteProject,
  setIsCreateProjectOpen,
}) {
  const projectStats = useMemo(() => {
    const stats = new Map();

    projects.forEach((project) => {
      stats.set(project.id, {
        totalTasks: 0,
        completedTasks: 0,
      });
    });

    tasks.forEach((task) => {
      if (task.projectId === null || task.projectId === undefined) {
        return;
      }

      const project = stats.get(task.projectId);

      if (!project) {
        return;
      }

      project.totalTasks += 1;

      if (task.status === "completed") {
        project.completedTasks += 1;
      }
    });

    return stats;
  }, [projects, tasks]);

  const getDaysLeft = (deadline) => {
    if (!deadline) {
      return null;
    }

    const today = new Date();

    const deadlineDate = new Date(`${deadline}T00:00:00`);

    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);

    const difference = deadlineDate.getTime() - today.getTime();

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-100">
            Projects
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Organize your work and keep track of what you're building.
          </p>
        </div>

        {projects.length > 0 && (
          <div className="hidden items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-400 sm:flex">
            <FolderKanban size={14} />
            <span>
              {projects.length} {projects.length === 1 ? "project" : "projects"}
            </span>
          </div>
        )}
      </div>

      {projects.length === 0 ? (
        <section className="flex min-h-[420px] items-center justify-center rounded-lg border border-dashed border-zinc-800 bg-zinc-900/30 px-6">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
              <FolderKanban size={22} className="text-zinc-500" />
            </div>

            <h3 className="mt-5 text-base font-semibold text-zinc-100">
              Let&apos;s set up your new project.
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Turn your ideas into something real. Create a project, organize
              your tasks, and watch your progress take shape.
            </p>

            <Button
              onClick={() => setIsCreateProjectOpen(true)}
              className="mt-6 gap-2 bg-indigo-600 text-white hover:bg-indigo-500"
            >
              <Plus size={16} />
              Create your first project
            </Button>
          </div>
        </section>
      ) : (
        <section>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => {
              const stats = projectStats.get(project.id);

              const totalTasks = stats?.totalTasks ?? 0;

              const completedTasks = stats?.completedTasks ?? 0;

              const progress =
                totalTasks === 0
                  ? 0
                  : Math.round((completedTasks / totalTasks) * 100);

              const daysLeft = getDaysLeft(project.deadline);

              return (
                <ProjectItem
                  key={project.id}
                  project={project}
                  totalTasks={totalTasks}
                  completedTasks={completedTasks}
                  progress={progress}
                  daysLeft={daysLeft}
                  onEdit={onEditProject}
                  onDelete={onDeleteProject}
                />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

export default Projects;
