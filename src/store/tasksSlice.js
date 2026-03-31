import { createSelector, createSlice } from "@reduxjs/toolkit";
import { TASK_STORAGE_KEY } from "../constants/storage";
import { TASK_STATUSES } from "../constants/taskStatus";
import { DEFAULT_TASKS } from "../data/defaultTasks";
import { isValidTask, normalizeTask } from "../utils/taskData";

const cloneDefaultTasks = () => {
  return DEFAULT_TASKS.map((task) => ({ ...task }));
};

export const loadInitialTasks = () => {
  try {
    if (typeof window === "undefined") {
      return cloneDefaultTasks();
    }

    const rawData = window.localStorage.getItem(TASK_STORAGE_KEY);

    if (!rawData) {
      return cloneDefaultTasks();
    }

    const parsedData = JSON.parse(rawData);

    if (!Array.isArray(parsedData)) {
      return cloneDefaultTasks();
    }

    const cleaned = parsedData.map(normalizeTask).filter(isValidTask);
    return cleaned.length ? cleaned : cloneDefaultTasks();
  } catch (_error) {
    return cloneDefaultTasks();
  }
};

export const persistTasks = (tasks) => {
  try {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
  } catch (_error) {
    // Ignore storage write failures to keep the app usable.
  }
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: loadInitialTasks(),
    status: "idle",
    error: null
  },
  reducers: {
    setTasks: (state, { payload }) => {
      state.items = payload;
      state.status = "succeeded";
      state.error = null;
    },
    addTask: (state, { payload }) => {
      state.items.unshift(payload);
    },
    updateTask: (state, { payload }) => {
      const { id, updates } = payload;
      const task = state.items.find((item) => item.id === id);

      if (!task) {
        return;
      }

      task.title = updates.title;
      task.description = updates.description;
      task.status = updates.status;
      task.category = updates.category;
      task.priority = updates.priority;
      task.dueDate = updates.dueDate;
      task.updatedAt = new Date().toISOString();
    },
    deleteTask: (state, { payload }) => {
      const { id } = payload;
      state.items = state.items.filter((task) => task.id !== id);
    },
    setTasksStatus: (state, { payload }) => {
      state.status = payload;
    },
    setTasksError: (state, { payload }) => {
      state.error = payload;
    },
    resetTasks: (state) => {
      state.items = cloneDefaultTasks();
      state.status = "idle";
      state.error = null;
    }
  }
});

export const {
  addTask,
  deleteTask,
  resetTasks,
  setTasks,
  setTasksError,
  setTasksStatus,
  updateTask
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;

export const selectTasksState = ({ tasks }) => tasks;

export const selectTasks = (state) => selectTasksState(state).items;

export const selectTasksStatus = (state) => selectTasksState(state).status;

export const selectTasksError = (state) => selectTasksState(state).error;

export const selectTaskSummary = createSelector([selectTasks], (tasks) => {
  const counts = {
    total: tasks.length
  };

  TASK_STATUSES.forEach((status) => {
    counts[status] = tasks.filter((task) => task.status === status).length;
  });

  return counts;
});
