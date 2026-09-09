import { useState } from "react";

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
import { CalendarDays } from "lucide-react";

function CreateProjectModal({ open, onOpenChange, onCreateProject }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    githubUrl: "",
    deadline: "",
    priority: "medium",
  });
  const handleSubmit = () => {
    const newProject = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };
    onCreateProject(newProject);
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-zinc-800 bg-zinc-950 text-zinc-100 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Create project
          </DialogTitle>

          <DialogDescription className="text-sm text-zinc-500">
            Create a project to organize your work and track its progress.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="project-name" className="text-xs text-zinc-400">
              Project name
            </Label>

            <Input
              id="project-name"
              placeholder="e.g. Sociosphere"
              value={formData.name}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
              className="border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-600"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="project-description"
              className="text-xs text-zinc-400"
            >
              Description
            </Label>

            <Textarea
              id="project-description"
              value={formData.description}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
              placeholder="What are you building?"
              rows={3}
              className="resize-none border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-600"
            />
          </div>

          {/* GitHub Repository */}
          <div className="space-y-2">
            <Label htmlFor="project-github" className="text-xs text-zinc-400">
              GitHub repository
            </Label>

            <Input
              id="project-github"
              value={formData.githubUrl}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  githubUrl: e.target.value,
                }));
              }}
              placeholder="https://github.com/username/repository"
              className="border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-600"
            />
          </div>

          {/* Deadline + Priority */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Deadline */}
            <div className="space-y-2">
              <Label
                htmlFor="project-deadline"
                className="text-xs text-zinc-400"
              >
                Deadline
              </Label>

              <div className="relative">
                <CalendarDays
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <Input
                  id="project-deadline"
                  value={formData.deadline}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      deadline: e.target.value,
                    }));
                  }}
                  type="date"
                  className="border-zinc-800 bg-zinc-900 pl-9 text-zinc-100"
                />
              </div>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label className="text-xs text-zinc-400">Priority</Label>

              <Select
                value={formData.priority}
                onValueChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    priority: value,
                  }));
                }}
              >
                <SelectTrigger className="border-zinc-800 bg-zinc-900 text-zinc-200">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="border-t border-zinc-800 bg-zinc-950 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateProjectModal;
