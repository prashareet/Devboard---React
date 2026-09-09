import { useMemo } from "react";

import { AlertCircle, CheckCircle2, Clock3, ListTodo } from "lucide-react";

function Dashboard({ tasks, projects }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;

  const pendingTasks = tasks.filter((task) => task.status === "pending").length;

  const highPriorityTasks = tasks.filter(
    (task) =>
      task.priority?.toLowerCase() === "high" && task.status !== "completed",
  ).length;

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const projectNames = useMemo(() => {
    return new Map(projects.map((project) => [project.id, project.name]));
  }, [projects]);

  const needsAttention = tasks
    .filter((task) => task.status !== "completed")
    .sort((a, b) => {
      const priorityWeight = {
        high: 3,
        medium: 2,
        low: 1,
      };

      return (
        (priorityWeight[b.priority?.toLowerCase()] || 0) -
        (priorityWeight[a.priority?.toLowerCase()] || 0)
      );
    })
    .slice(0, 5);

  const projectStats = useMemo(() => {
    const stats = new Map();

    projects.forEach((project) => {
      stats.set(project.id, {
        name: project.name,
        total: 0,
        completed: 0,
      });
    });

    tasks.forEach((task) => {
      if (task.projectId === null || task.projectId === undefined) {
        return;
      }

      const project = stats.get(task.projectId);

      if (!project) return;

      project.total += 1;

      if (task.status === "completed") {
        project.completed += 1;
      }
    });

    return Array.from(stats.values());
  }, [projects, tasks]);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-zinc-100">
          Overview
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          A quick look at your current workload.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Total Tasks" value={totalTasks} icon={ListTodo} />

        <SummaryCard
          label="Completed"
          value={completedTasks}
          icon={CheckCircle2}
        />

        <SummaryCard
          label="In Progress"
          value={inProgressTasks}
          icon={Clock3}
        />

        <SummaryCard
          label="High Priority"
          value={highPriorityTasks}
          icon={AlertCircle}
        />
      </div>

      {/* Main Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Workload */}
        <section className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-zinc-100">Workload</h3>

              <p className="mt-1 text-xs text-zinc-500">
                Current task distribution.
              </p>
            </div>

            <span className="text-sm font-medium text-zinc-300">
              {completionRate}% complete
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <WorkloadRow
              label="Pending"
              value={pendingTasks}
              total={totalTasks}
            />

            <WorkloadRow
              label="In Progress"
              value={inProgressTasks}
              total={totalTasks}
            />

            <WorkloadRow
              label="Completed"
              value={completedTasks}
              total={totalTasks}
            />
          </div>
        </section>

        {/* Attention */}
        <section className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
          <div>
            <h3 className="text-sm font-medium text-zinc-100">
              Needs Attention
            </h3>

            <p className="mt-1 text-xs text-zinc-500">
              Highest-priority unfinished work.
            </p>
          </div>

          <div className="mt-4 space-y-2">
            {needsAttention.length === 0 ? (
              <div className="rounded-md border border-dashed border-zinc-800 px-4 py-8 text-center">
                <p className="text-sm text-zinc-500">
                  Nothing needs attention.
                </p>
              </div>
            ) : (
              needsAttention.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 rounded-md border border-zinc-800/70 bg-zinc-950/40 px-3 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-200">
                      {task.title}
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      {task.projectId
                        ? projectNames.get(task.projectId) || "Unknown project"
                        : "Unassigned"}
                    </p>
                  </div>

                  <PriorityBadge priority={task.priority} />
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Projects */}
      <section className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
        <div>
          <h3 className="text-sm font-medium text-zinc-100">
            Projects Overview
          </h3>

          <p className="mt-1 text-xs text-zinc-500">
            Progress across your projects.
          </p>
        </div>

        <div className="mt-5 space-y-5">
          {projectStats.length === 0 ? (
            <p className="text-sm text-zinc-500">No projects yet.</p>
          ) : (
            projectStats.map((project) => {
              const progress =
                project.total === 0
                  ? 0
                  : Math.round((project.completed / project.total) * 100);

              return (
                <div key={project.name}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-200">
                      {project.name}
                    </span>

                    <span className="text-xs text-zinc-500">
                      {project.completed}/{project.total} completed
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}

function SummaryCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500">{label}</span>

        <Icon size={16} className="text-zinc-500" />
      </div>

      <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-100">
        {value}
      </p>
    </div>
  );
}

function WorkloadRow({ label, value, total }) {
  const percentage = total === 0 ? 0 : Math.round((value / total) * 100);

  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-400">{label}</span>
        <span className="text-zinc-500">{value}</span>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-zinc-400 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function PriorityBadge({ priority }) {
  const normalized = priority?.toLowerCase() || "low";

  const styles = {
    high: "border-rose-500/20 bg-rose-500/10 text-rose-400",
    medium: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    low: "border-zinc-700 bg-zinc-800 text-zinc-400",
  };

  return (
    <span
      className={`shrink-0 rounded-md border px-2 py-1 text-[11px] font-medium ${
        styles[normalized] || styles.low
      }`}
    >
      {priority || "Low"}
    </span>
  );
}

export default Dashboard;
