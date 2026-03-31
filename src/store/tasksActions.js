import { v4 as uuidv4 } from "uuid";
import {
  createTaskInApi,
  deleteTaskInApi,
  fetchTasksFromApi,
  updateTaskInApi
} from "../api/tasksApi";
import { buildTaskRecord, sanitizeTaskInput } from "../utils/taskData";
import { isApiTaskId } from "../utils/tasksApi";
import { addTask, deleteTask, setTasks, setTasksError, setTasksStatus, updateTask } from "./tasksSlice";

export const fetchTasks = () => {
  return async (dispatch, getState) => {
    dispatch(setTasksStatus("loading"));
    dispatch(setTasksError(null));

    try {
      const tasks = await fetchTasksFromApi();
      const {
        tasks: { items: existingTasks }
      } = getState();
      const mergedTasks = [...existingTasks];
      const existingTaskIds = new Set(existingTasks.map((task) => task.id));
      let hasNewTasks = false;

      tasks.forEach((task) => {
        const { id } = task;

        if (existingTaskIds.has(id)) {
          return;
        }

        mergedTasks.push(task);
        existingTaskIds.add(id);
        hasNewTasks = true;
      });

      if (!existingTasks.length || hasNewTasks) {
        dispatch(setTasks(existingTasks.length ? mergedTasks : tasks));
        return;
      }

      dispatch(setTasksStatus("succeeded"));
    } catch (error) {
      const { message } = error || {};

      dispatch(setTasksStatus("failed"));
      dispatch(setTasksError(message || "Unable to fetch tasks from API."));
    }
  };
};

export const addTaskAsync = (taskData) => {
  return async (dispatch) => {
    const sanitized = sanitizeTaskInput(taskData);

    try {
      const createdTask = await createTaskInApi(sanitized);
      dispatch(addTask(createdTask));
    } catch (_error) {
      dispatch(addTask(buildTaskRecord(sanitized, uuidv4())));
    }
  };
};

export const updateTaskAsync = ({ id, updates }) => {
  return async (dispatch) => {
    const sanitized = sanitizeTaskInput(updates);

    if (isApiTaskId(id)) {
      try {
        await updateTaskInApi(id, sanitized);
      } catch (_error) {
        // Fall back to local state update when API update fails.
      }
    }

    dispatch(updateTask({ id, updates: sanitized }));
  };
};

export const deleteTaskAsync = ({ id }) => {
  return async (dispatch) => {
    if (isApiTaskId(id)) {
      try {
        await deleteTaskInApi(id);
      } catch (_error) {
        // Fall back to local state delete when API delete fails.
      }
    }

    dispatch(deleteTask({ id }));
  };
};
