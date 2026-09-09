import { useMemo } from "react";

import {
  Activity,
  CheckCircle2,
  CircleDashed,
  Clock3,
  FolderKanban,
  ListTodo,
} from "lucide-react";

function Analytics({ tasks = [], projects = [] }) {
  const analytics = useMemo(() => {
    const total = tasks.length;

    const completed = tasks.filter(
      (task) => task.status === "completed",
    ).length;

    const inProgress = tasks.filter(
      (task) => task.status === "in-progress",
    ).length;

    const pending = tasks.filter((task) => task.status === "pending").length;

    const high = tasks.filter(
      (task) => task.priority?.toLowerCase() === "high",
    ).length;

    const medium = tasks.filter(
      (task) => task.priority?.toLowerCase() === "medium",
    ).length;

    const low = tasks.filter(
      (task) => task.priority?.toLowerCase() === "low",
    ).length;

    const completionRate =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      completed,
      inProgress,
      pending,
      high,
      medium,
      low,
      completionRate,
    };
  }, [tasks]);

  const projectAnalytics = useMemo(() => {
    return projects.map((project) => {
      const projectTasks = tasks.filter(
        (task) => task.projectId === project.id,
      );

      const completedTasks = projectTasks.filter(
        (task) => task.status === "completed",
      ).length;

      const progress =
        projectTasks.length === 0
          ? 0
          : Math.round((completedTasks / projectTasks.length) * 100);

      return {
        id: project.id,
        name: project.name,
        totalTasks: projectTasks.length,
        completedTasks,
        progress,
      };
    });
  }, [projects, tasks]);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-zinc-100">
          Analytics
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Understand your workload and project progress.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Tasks"
          value={analytics.total}
          icon={ListTodo}
        />

        <MetricCard
          label="Completion Rate"
          value={`${analytics.completionRate}%`}
          icon={Activity}
        />

        <MetricCard
          label="Projects"
          value={projects.length}
          icon={FolderKanban}
        />

        <MetricCard
          label="Completed"
          value={analytics.completed}
          icon={CheckCircle2}
        />
      </div>

      {/* Status + Priority */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Task Status */}
        <AnalyticsCard
          title="Task Status"
          description="How your current tasks are distributed."
        >
          <StatRow
            label="Completed"
            value={analytics.completed}
            total={analytics.total}
            icon={CheckCircle2}
          />

          <StatRow
            label="In Progress"
            value={analytics.inProgress}
            total={analytics.total}
            icon={Clock3}
          />

          <StatRow
            label="Pending"
            value={analytics.pending}
            total={analytics.total}
            icon={CircleDashed}
          />
        </AnalyticsCard>

        {/* Priority */}
        <AnalyticsCard
          title="Priority Distribution"
          description="How your workload is prioritized."
        >
          <StatRow
            label="High"
            value={analytics.high}
            total={analytics.total}
          />

          <StatRow
            label="Medium"
            value={analytics.medium}
            total={analytics.total}
          />

          <StatRow label="Low" value={analytics.low} total={analytics.total} />
        </AnalyticsCard>
      </div>

      {/* Projects */}
      <AnalyticsCard
        title="Project Progress"
        description="Completion across each project."
      >
        {projectAnalytics.length === 0 ? (
          <div className="rounded-md border border-dashed border-zinc-800 px-4 py-10 text-center">
            <p className="text-sm text-zinc-500">No projects available yet.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {projectAnalytics.map((project) => (
              <div key={project.id}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-200">
                    {project.name}
                  </span>

                  <span className="text-xs text-zinc-500">
                    {project.completedTasks}/{project.totalTasks} completed
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>

                <p className="mt-1 text-right text-[11px] text-zinc-600">
                  {project.progress}%
                </p>
              </div>
            ))}
          </div>
        )}
      </AnalyticsCard>
    </div>
  );
}

function MetricCard({ label, value, icon: Icon }) {
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

function AnalyticsCard({ title, description, children }) {
  return (
    <section className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
      <h3 className="text-sm font-medium text-zinc-100">{title}</h3>

      <p className="mt-1 text-xs text-zinc-500">{description}</p>

      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

function StatRow({ label, value, total, icon: Icon }) {
  const percentage = total === 0 ? 0 : Math.round((value / total) * 100);

  return (
    <div>
      <div className="flex items-center gap-2">
        {Icon && <Icon size={14} className="text-zinc-500" />}

        <span className="text-xs text-zinc-400">{label}</span>

        <span className="ml-auto text-xs text-zinc-500">
          {value} · {percentage}%
        </span>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-zinc-400 transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

export default Analytics;
