import { Check, Pencil, Trash2 } from "lucide-react";

function TaskItem({ task, onComplete, onEdit, onDelete }) {
  const isCompleted = task.status === "completed";

  return (
    <div className="group flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:bg-zinc-900">
      {/* Complete button */}
      <button
        type="button"
        onClick={() => onComplete(task.id)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
          isCompleted
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-zinc-600 text-transparent hover:border-indigo-500"
        }`}
        aria-label={
          isCompleted ? "Mark task as pending" : "Mark task as completed"
        }
      >
        {isCompleted && <Check size={12} />}
      </button>

      {/* Task content */}
      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium ${
            isCompleted ? "text-zinc-500 line-through" : "text-zinc-200"
          }`}
        >
          {task.title}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-2">
          {task.priority && (
            <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-500">
              {task.priority}
            </span>
          )}

          <span className="text-[11px] text-zinc-600">{task.status}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-md p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
          aria-label="Edit task"
        >
          <Pencil size={15} />
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-md p-2 text-zinc-500 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
          aria-label="Delete task"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
