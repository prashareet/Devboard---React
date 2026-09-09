import { CalendarDays, ExternalLink, Pencil, Trash2 } from "lucide-react";

function ProjectItem({
  project,
  totalTasks = 0,
  completedTasks = 0,
  progress = 0,
  daysLeft = null,
  onEdit,
  onDelete,
}) {
  const priorityStyles = {
    high: "border-rose-500/20 bg-rose-500/10 text-rose-400",
    medium: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    low: "border-sky-500/20 bg-sky-500/10 text-sky-400",
  };

  const deadlineLabel =
    daysLeft === null
      ? "No deadline"
      : daysLeft < 0
        ? `${Math.abs(daysLeft)} days overdue`
        : daysLeft === 0
          ? "Due today"
          : daysLeft === 1
            ? "1 day left"
            : `${daysLeft} days left`;

  return (
    <div className="group rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:bg-zinc-900">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-zinc-100">
            {project.name}
          </h3>

          <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-500">
            {project.description || "No project description."}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-md border px-2 py-1 text-[10px] font-medium uppercase ${
            priorityStyles[project.priority?.toLowerCase()] ||
            "border-zinc-800 bg-zinc-900 text-zinc-500"
          }`}
        >
          {project.priority || "medium"}
        </span>
      </div>

      {/* Metadata */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <CalendarDays size={14} />

          <span>{deadlineLabel}</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-500">
            {completedTasks}/{totalTasks} tasks completed
          </span>

          <span className="font-medium text-zinc-400">{progress}%</span>
        </div>

        {/* Progress */}
        <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
        <div>
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-200"
            >
              Repository
              <ExternalLink size={12} />
            </a>
          ) : (
            <span className="text-xs text-zinc-600">No repository</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(project)}
            className="rounded-md p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
            aria-label="Edit project"
          >
            <Pencil size={15} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(project.id)}
            className="rounded-md p-2 text-zinc-500 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
            aria-label="Delete project"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectItem;
