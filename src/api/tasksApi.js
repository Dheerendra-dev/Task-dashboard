import { webDelete, webGet, webPost, webPut } from "../services/webService";
import {
  TASKS_API_DEFAULT_LIMIT,
  TASKS_API_DEFAULT_USER_ID
} from "../constants/api";
import { TASK_STATUS_COMPLETED } from "../constants/taskStatus";
import { mapTodoToTask, parseApiTaskId } from "../utils/tasksApi";

export { isApiTaskId } from "../utils/tasksApi";

export const fetchTasksFromApi = async () => {
  const response = await webGet("/todos", {
    params: {
      limit: TASKS_API_DEFAULT_LIMIT
    }
  });

  const { data = {} } = response;
  const { todos: apiTodos = [] } = data;
  const todos = Array.isArray(apiTodos) ? apiTodos : [];

  return todos.map(mapTodoToTask);
};

export const createTaskInApi = async (taskData) => {
  const { title, status } = taskData;

  const response = await webPost("/todos/add", {
    todo: title,
    completed: status === TASK_STATUS_COMPLETED,
    userId: TASKS_API_DEFAULT_USER_ID
  });

  const { data: createdTodo } = response;
  const mappedTask = mapTodoToTask(createdTodo);

  return {
    ...mappedTask,
    ...taskData
  };
};

export const updateTaskInApi = async (taskId, updates) => {
  const { title, status } = updates;
  const numericId = parseApiTaskId(taskId);
  if (numericId === null) return;

  await webPut(`/todos/${numericId}`, {
    todo: title,
    completed: status === TASK_STATUS_COMPLETED
  });
};

export const deleteTaskInApi = async (taskId) => {
  const numericId = parseApiTaskId(taskId);

  if (numericId === null) {
    return;
  }

  await webDelete(`/todos/${numericId}`);
};
