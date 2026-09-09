# DevBoard — Developer Productivity Dashboard

> A modern, efficient task management and project tracking tool built with React.

**Live Demo:** https://devboard-react.vercel.app
**Repository:** https://github.com/prashareet/Devboard---React

DevBoard is a frontend productivity application designed to help developers organize tasks, manage projects, monitor progress, and understand their workload through a clean developer-focused dashboard.

The project was built to explore modern React development patterns including state management, component composition, controlled forms, derived state, React Hooks, client-side persistence, routing, and responsive UI design.

---

## Features

### Task Management

- Create tasks with title, priority, project, and status
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Toggle task completion state
- Filter tasks by status
- Search tasks by title
- Associate tasks with projects

### Project Management

- Create and manage projects
- Edit project information
- Delete projects
- Assign deadlines and priorities
- Add repository URLs
- Automatically calculate project progress
- Display completed vs total tasks
- Display remaining/overdue days
- Automatically remove associated tasks when a project is deleted

### Dashboard

- Overview of current tasks and projects
- Task completion statistics
- Project progress visibility
- Quick access to productivity information

### Analytics

- Total task count
- Completion rate
- Completed, pending, and in-progress task distribution
- Task priority distribution
- Per-project completion progress
- Derived analytics calculated directly from application state

### Data Persistence

DevBoard uses browser `localStorage` for client-side persistence.

This means:

- Tasks survive page refreshes
- Projects survive page refreshes
- No backend or database is required
- Application state remains the single source of truth while `localStorage` provides persistence

### Responsive UI

The interface is designed for:

- Desktop
- Tablet
- Mobile

The application uses reusable UI components, responsive layouts, accessible controls, and a developer-tool inspired visual design.

---

## React Concepts Demonstrated

DevBoard was intentionally built to practice and apply core React concepts rather than simply assembling UI components.

### Component Architecture

The application is broken into reusable components with clear responsibilities.

Examples include:

- `AppShell`
- `Sidebar`
- `TopBar`
- `TaskItem`
- `ProjectItem`
- `CreateTaskModal`
- `CreateProjectModal`
- `EditTaskModal`
- `EditProjectModal`

### State Management

Application-level state is maintained in `App.jsx` for shared task and project data.

Examples:

- Tasks
- Projects
- Modal visibility
- Selected task/project
- Search state
- Filter state

This demonstrates lifting state up and maintaining a single source of truth.

### Props & Callback Functions

Data flows downward through props while child components communicate actions upward through callback functions.

For example:

```text
App
 ↓
Projects
 ↓
ProjectItem
```

User actions such as editing or deleting a project travel back upward through callback props.

### Controlled Forms

Task and project forms use controlled inputs where React state represents the current form values.

This provides predictable form behavior and makes validation and submission logic easier to manage.

### Derived State

Values such as:

- Project progress
- Completion percentage
- Visible tasks
- Task statistics
- Analytics
- Remaining deadline days

are calculated from existing state instead of being stored separately.

This helps avoid duplicated or inconsistent state.

### `useEffect`

`useEffect` is used where DevBoard needs to synchronize React state with an external system — browser `localStorage`.

```text
React State
    ↓
useEffect
    ↓
localStorage
```

### `useMemo`

`useMemo` is used for calculated project and analytics data where deriving statistics involves iterating over tasks and projects.

This demonstrates memoizing derived calculations when there is a meaningful reason to do so.

### React Router

DevBoard uses client-side routing for:

- `/projects`
- `/tasks`
- `/dashboard`
- `/analytics`
- `/settings`

The root route redirects to the Projects page and an application-level fallback handles unknown routes.

---

## Architecture

The application follows a simple state-driven architecture:

```text
                    App
                     │
          ┌──────────┴──────────┐
          │                     │
       Tasks                  Projects
          │                     │
     TaskItem              ProjectItem
          │                     │
     Edit/Delete           Edit/Delete
          │                     │
          └──────────┬──────────┘
                     │
              React State
                     │
                  Effects
                     │
               localStorage
```

The main design principle is:

> **React state is the source of truth; localStorage is the persistence layer.**

---

## Tech Stack

### Frontend

- React
- React Router
- Vite
- JavaScript (ES6+)

### UI

- Tailwind CSS
- shadcn/ui
- Lucide React

### State & Persistence

- React Hooks
- Browser localStorage

### Development

- ESLint
- Git
- GitHub

### Deployment

- Vercel

---

## Project Structure

```text
src/
├── components/
│   ├── layout/
│   ├── Projects/
│   ├── Tasks/
│   └── ui/
│
├── pages/
│   ├── Analytics.jsx
│   ├── Dashboard.jsx
│   ├── NotFound.jsx
│   ├── Projects.jsx
│   ├── Settings.jsx
│   └── Tasks.jsx
│
├── App.jsx
└── main.jsx
```

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/prashareet/Devboard---React.git
cd Devboard---React
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Run lint

```bash
npm run lint
```

### Build for production

```bash
npm run build
```

---

## Key Engineering Decisions

### Single Source of Truth

Tasks and projects are owned by the application-level state so multiple pages and components can work with the same data.

### Derived Data Instead of Duplicated State

Project progress and analytics are calculated from tasks rather than manually stored.

This reduces synchronization problems and keeps the application state predictable.

### Reusable Components

Common UI patterns are extracted into reusable components to keep pages focused on application behavior.

### Client-Side Persistence

`localStorage` provides persistence without introducing unnecessary backend infrastructure for this project.

### Relationship-Based Data Modeling

Tasks reference projects using `projectId` instead of storing project names directly.

This means a project can be renamed without requiring every associated task to be updated.

---

## Future Improvements

Potential future iterations could include:

- Authentication
- Backend API
- MongoDB persistence
- User-specific workspaces
- Drag-and-drop task management
- Advanced analytics
- Due-date notifications
- Team collaboration
- Activity history
- Dark/light theme preferences
- Automated testing

---

## Purpose

DevBoard was built as a practical React learning project with a focus on understanding application architecture, state management, component communication, derived state, persistence, and modern frontend development practices.

It also serves as a foundation for applying these concepts to larger full-stack applications.

---

## Author

**Prashareet Choudhury**

Full-Stack Developer focused on building practical, scalable web applications.

**Live Project:** https://devboard-react.vercel.app
**GitHub:** https://github.com/prashareet/Devboard---React
