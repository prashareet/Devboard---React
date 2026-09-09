import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

function EditProjectModal({ open, onOpenChange, project, onEditProject }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    githubUrl: "",
    deadline: "",
    priority: "medium",
  });
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    if (!project) return;

    setFormData({
      name: project.name || "",
      description: project.description || "",
      githubUrl: project.githubUrl || "",
      deadline: project.deadline || "",
      priority: project.priority || "medium",
    });
  }, [project]);

  const handleSubmit = () => {
    if (!project || !formData.name.trim()) {
      return;
    }

    const updatedProject = {
      ...project,
      name: formData.name.trim(),
      description: formData.description.trim(),
      githubUrl: formData.githubUrl.trim(),
      deadline: formData.deadline,
      priority: formData.priority,
    };

    onEditProject(updatedProject);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-zinc-800 bg-zinc-950 text-zinc-100 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Edit project
          </DialogTitle>

          <DialogDescription className="text-sm text-zinc-500">
            Update the details of your project.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Name */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-project-name"
              className="text-xs font-medium text-zinc-300"
            >
              Project name
            </Label>

            <Input
              id="edit-project-name"
              value={formData.name}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
              className="border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-project-description"
              className="text-xs font-medium text-zinc-300"
            >
              Description
            </Label>

            <Textarea
              id="edit-project-description"
              value={formData.description}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
              rows={3}
              className="resize-none border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
            />
          </div>

          {/* GitHub URL */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-project-github"
              className="text-xs font-medium text-zinc-300"
            >
              Repository URL
            </Label>

            <Input
              id="edit-project-github"
              value={formData.githubUrl}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  githubUrl: e.target.value,
                }));
              }}
              placeholder="https://github.com/..."
              className="border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
            />
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-project-deadline"
              className="text-xs font-medium text-zinc-300"
            >
              Deadline
            </Label>

            <Input
              id="edit-project-deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  deadline: e.target.value,
                }));
              }}
              className="border-zinc-800 bg-zinc-900 text-zinc-100 focus-visible:ring-indigo-500"
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
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="low">Low</SelectItem>

                <SelectItem value="medium">Medium</SelectItem>

                <SelectItem value="high">High</SelectItem>
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
            disabled={!formData.name.trim()}
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

export default EditProjectModal;
