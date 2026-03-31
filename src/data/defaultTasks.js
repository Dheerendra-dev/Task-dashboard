import {
  TASK_CATEGORY_PERSONAL,
  TASK_CATEGORY_WORK,
  TASK_PRIORITY_LOW,
  TASK_PRIORITY_MEDIUM,
  TASK_PRIORITY_URGENT,
  TASK_STATUS_COMPLETED,
  TASK_STATUS_IN_PROGRESS,
  TASK_STATUS_PENDING
} from "../constants/taskStatus";

export const DEFAULT_TASKS = [
  {
    id: "task-1",
    title: "Finalize onboarding checklist",
    description: "Prepare the step-by-step onboarding checklist for new team members.",
    status: TASK_STATUS_PENDING,
    category: TASK_CATEGORY_PERSONAL,
    priority: TASK_PRIORITY_MEDIUM,
    dueDate: "2026-04-04",
    createdAt: "2026-03-25T09:00:00.000Z",
    updatedAt: "2026-03-25T09:00:00.000Z"
  },
  {
    id: "task-2",
    title: "Build analytics widget",
    description: "Implement the weekly velocity widget for the management dashboard.",
    status: TASK_STATUS_IN_PROGRESS,
    category: TASK_CATEGORY_WORK,
    priority: TASK_PRIORITY_URGENT,
    dueDate: "2026-04-01",
    createdAt: "2026-03-24T11:00:00.000Z",
    updatedAt: "2026-03-26T08:30:00.000Z"
  },
  {
    id: "task-3",
    title: "QA regression pass",
    description: "Run regression test scenarios on the latest release candidate.",
    status: TASK_STATUS_COMPLETED,
    category: TASK_CATEGORY_WORK,
    priority: TASK_PRIORITY_LOW,
    dueDate: "2026-03-28",
    createdAt: "2026-03-21T10:15:00.000Z",
    updatedAt: "2026-03-27T07:15:00.000Z"
  },
  {
    id: "task-4",
    title: "Prepare personal learning sprint",
    description: "Create a one-week plan to complete advanced React hooks exercises.",
    status: TASK_STATUS_PENDING,
    category: TASK_CATEGORY_PERSONAL,
    priority: TASK_PRIORITY_URGENT,
    dueDate: "2026-03-30",
    createdAt: "2026-03-26T10:00:00.000Z",
    updatedAt: "2026-03-26T10:00:00.000Z"
  }
];
