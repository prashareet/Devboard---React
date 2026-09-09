import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function EditTaskModal({
  open,
  onOpenChange,
  task,
  projects = [],
  onEditTask,
}) {
  const [formData, setFormData] = useState({
    title: "",
    priority: "",
    projectId: "",
    status: "pending",
  });
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    if (!task) return;

    setFormData({
      title: task.title || "",
      priority: task.priority || "",
      projectId:
        task.projectId !== null && task.projectId !== undefined
          ? String(task.projectId)
          : "",
      status: task.status || "pending",
    });
  }, [task]);

  const selectedProject = projects.find(
    (project) => String(project.id) === formData.projectId,
  );

  const handleSubmit = () => {
    if (!task || !formData.title.trim()) {
      return;
    }

    const updatedTask = {
      ...task,
      title: formData.title.trim(),
      priority: formData.priority,
      projectId: formData.projectId ? Number(formData.projectId) : null,
      status: formData.status,
    };

    onEditTask(updatedTask);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-zinc-800 bg-zinc-950 text-zinc-100 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Edit task
          </DialogTitle>

          <DialogDescription className="text-sm text-zinc-500">
            Update the details of your task.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Title */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-task-title"
              className="text-xs font-medium text-zinc-300"
            >
              Task title
            </Label>

            <Input
              id="edit-task-title"
              value={formData.title}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
              className="border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-zinc-300">
              Priority
            </Label>

            <Select
              value={formData.priority}
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  priority: value,
                }));
              }}
            >
              <SelectTrigger className="border-zinc-800 bg-zinc-900 text-zinc-100">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="low">Low</SelectItem>

                <SelectItem value="medium">Medium</SelectItem>

                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Project */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-zinc-300">Project</Label>

            <Select
              value={formData.projectId || "none"}
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  projectId: value === "none" ? "" : value,
                }));
              }}
            >
              <SelectTrigger className="border-zinc-800 bg-zinc-900 text-zinc-200">
                <SelectValue>
                  {selectedProject?.name || "No project"}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="none">No project</SelectItem>

                {projects.map((project) => (
                  <SelectItem key={project.id} value={String(project.id)}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-zinc-300">Status</Label>

            <Select
              value={formData.status}
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  status: value,
                }));
              }}
            >
              <SelectTrigger className="border-zinc-800 bg-zinc-900 text-zinc-100">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>

                <SelectItem value="in-progress">In Progress</SelectItem>

                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="border-t border-zinc-800 bg-zinc-950 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={!formData.title.trim()}
            onClick={handleSubmit}
            className="bg-indigo-500 text-white hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditTaskModal;
