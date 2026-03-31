import { configureStore } from "@reduxjs/toolkit";
import { persistTasks, tasksReducer } from "./tasksSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer
  }
});

let {
  tasks: { items: previousTasks }
} = store.getState();

store.subscribe(() => {
  const {
    tasks: { items: nextTasks }
  } = store.getState();

  if (nextTasks !== previousTasks) {
    persistTasks(nextTasks);
    previousTasks = nextTasks;
  }
});
