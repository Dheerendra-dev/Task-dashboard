export const validateTaskForm = ({ title, dueDate }) => {
  const nextErrors = {};

  if (!title.trim()) {
    nextErrors.title = "Title is required.";
  }

  if (!dueDate) {
    nextErrors.dueDate = "Due date is required.";
  }

  return nextErrors;
};
