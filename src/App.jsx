import { useEffect, useState } from "react";

import AppShell from "./components/layout/AppShell.jsx";

import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import Analytics from "./pages/Analytics.jsx";
import Projects from "./pages/Projects.jsx";
import Settings from "./pages/Settings.jsx";
import Tasks from "./pages/Tasks.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects");

    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // -------------------------
  // CREATE TASK
  // -------------------------

  const createTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // -------------------------
  // EDIT TASK
  // -------------------------

  const editTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );

    setIsEditTaskOpen(false);
    setSelectedTask(null);
  };

  // -------------------------
  // DELETE TASK
  // -------------------------

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // -------------------------
  // COMPLETE TASK
  // -------------------------

  const handleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        if (task.status === "pending" || task.status === "in-progress") {
          return {
            ...task,
            status: "completed",
          };
        }

        return {
          ...task,
          status: "pending",
        };
      }),
    );
  };

  // -------------------------
  // CREATE PROJECT
  // -------------------------

  const createProject = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  // -------------------------
  // EDIT PROJECT
  // -------------------------

  const editProject = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project,
      ),
    );

    setIsEditProjectOpen(false);
    setSelectedProject(null);
  };

  // -------------------------
  // DELETE PROJECT
  // -------------------------

  const deleteProject = (projectId) => {
    // Delete the project
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId),
    );

    // Delete all tasks belonging to that project
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.projectId !== projectId),
    );
  };

  // -------------------------
  // OPEN EDIT TASK
  // -------------------------

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditTaskOpen(true);
  };

  // -------------------------
  // OPEN EDIT PROJECT
  // -------------------------

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsEditProjectOpen(true);
  };

  // -------------------------
  // LOAD DATA
  // -------------------------

  // -------------------------
  // SAVE TASKS
  // -------------------------

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);
  return (
    <AppShell
      isCreateTaskOpen={isCreateTaskOpen}
      setIsCreateTaskOpen={setIsCreateTaskOpen}
      isCreateProjectOpen={isCreateProjectOpen}
      setIsCreateProjectOpen={setIsCreateProjectOpen}
      onCreate={createTask}
      search={search}
      setSearch={setSearch}
      onCreateProject={createProject}
      projects={projects}
      isEditTaskOpen={isEditTaskOpen}
      setIsEditTaskOpen={setIsEditTaskOpen}
      selectedTask={selectedTask}
      onEditTask={editTask}
      isEditProjectOpen={isEditProjectOpen}
      setIsEditProjectOpen={setIsEditProjectOpen}
      selectedProject={selectedProject}
      onEditProject={editProject}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route
          path="/dashboard"
          element={<Dashboard tasks={tasks} projects={projects} />}
        />

        <Route
          path="/analytics"
          element={<Analytics tasks={tasks} projects={projects} />}
        />

        <Route
          path="/projects"
          element={
            <Projects
              projects={projects}
              tasks={tasks}
              onEditProject={handleEditProject}
              onDeleteProject={deleteProject}
              setIsCreateProjectOpen={setIsCreateProjectOpen}
            />
          }
        />

        <Route path="/settings" element={<Settings />} />

        <Route
          path="/tasks"
          element={
            <Tasks
              tasks={tasks}
              onComplete={handleComplete}
              onEdit={handleEditTask}
              onDelete={deleteTask}
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppShell>
  );
}

export default App;
