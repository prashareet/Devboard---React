import TaskItem from "@/components/Tasks/TaskItem";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Tasks({
  tasks,
  onComplete,
  onEdit,
  onDelete,
  search,
  statusFilter,
  setStatusFilter,
}) {
  const visibleTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "all" || task.status === statusFilter),
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">Tasks</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Manage your current work.
          </p>
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 border-zinc-800 bg-zinc-900 text-zinc-200">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All tasks</SelectItem>

            <SelectItem value="pending">Pending</SelectItem>

            <SelectItem value="in-progress">In Progress</SelectItem>

            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks */}
      <div className="space-y-2">
        {tasks.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-800 bg-zinc-900/30 px-6 py-12 text-center">
            <h3 className="text-sm font-medium text-zinc-200">No tasks yet</h3>

            <p className="mt-1 text-sm text-zinc-500">
              Create your first task to start tracking your work.
            </p>
          </div>
        ) : visibleTasks.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-800 bg-zinc-900/30 px-6 py-12 text-center">
            <h3 className="text-sm font-medium text-zinc-200">
              No matching tasks
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Try adjusting your search or status filter.
            </p>
          </div>
        ) : (
          visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={onComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Tasks;
