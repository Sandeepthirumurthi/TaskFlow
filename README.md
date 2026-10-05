# TaskFlow

A modern task and project management application built with Angular.

TaskFlow allows users to create and manage projects and tasks, track task progress, assign tasks to projects, filter and sort tasks, and monitor overall project progress through a dashboard.

The project is also designed as a hands-on learning and interview-preparation application for modern Angular development.

---

## Features

### Dashboard

- View total projects
- View total tasks
- View tasks by status
- View completed task count
- View task completion percentage
- View overdue tasks

### Project Management

- Create projects
- Edit projects
- Delete projects
- View project details
- View project task count
- View project completion percentage
- View tasks belonging to a project

### Task Management

- Create tasks
- Edit tasks
- Delete tasks
- Assign tasks to projects
- Update task status
- Set task priority
- Set task due date
- View task details

### Task Search, Filtering & Sorting

- Search tasks by title and description
- Filter by status
- Filter by priority
- Sort by:
  - Due date
  - Priority
  - Status
  - Title
- Clear filters

### Navigation

- Dashboard
- Projects
- Project Details
- Tasks
- Task Details
- Route parameters
- Query parameters
- Lazy-loaded feature routes

---

## Tech Stack

- Angular
- TypeScript
- HTML
- CSS
- Angular Router
- Reactive Forms
- Angular Signals
- Angular Dependency Injection
- RxJS

### Current Data Storage

The current version uses Angular services with in-memory data.

The planned next step is to replace the in-memory services with a backend API.

---

## Architecture

TaskFlow follows a feature-oriented Angular structure.

```text
src/app/
│
├── core/
│   └── services/
│       ├── project.ts
│       └── task.ts
│
├── features/
│   ├── dashboard/
│   │
│   ├── projects/
│   │   └── project-details/
│   │
│   └── tasks/
│       └── task-details/
│
├── app.ts
├── app.html
├── app.css
├── app.config.ts
└── app.routes.ts
