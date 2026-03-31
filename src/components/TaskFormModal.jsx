import { useEffect, useState } from "react";

import Button from "./ui/Button";
import CustomSelect from "./ui/CustomSelect";
import { buildTaskFormInitialState } from "../utils/taskForm";
import { DEFAULT_TASK_FORM_VALUES } from "../constants/taskForm";
import { TASK_CATEGORIES, TASK_PRIORITIES, TASK_STATUSES } from "../constants/taskStatus";

const TaskFormModal = ({ isOpen, task, onSave, onClose }) => {
  const [formData, setFormData] = useState(() => ({ ...DEFAULT_TASK_FORM_VALUES }));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData(buildTaskFormInitialState(task));
      setErrors({});
    }
  }, [isOpen, task]);

  if (!isOpen) {
    return null;
  }

  const updateField = (name, value) => {
    setFormData((current) => ({
      ...current,
      [name]: value
    }));

    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const onFieldChange = (event) => {
    const { name, value } = event.target;
    updateField(name, value);
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.title.trim()) {
      nextErrors.title = "Title is required.";
    }

    if (!formData.dueDate) {
      nextErrors.dueDate = "Due date is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSave(formData);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="presentation"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm" />
      <section
        className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-[0_40px_80px_rgba(25,28,30,0.1)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between px-8 pb-4 pt-8">
          <h2 id="task-form-title" className="text-2xl font-extrabold tracking-tight text-slate-900">
            {task ? "Edit Task" : "Create Task"}
          </h2>
          <Button
            className="text-slate-400 transition-colors hover:text-slate-700"
            onClick={onClose}
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </Button>
        </header>

        <form onSubmit={onSubmit}>
          <div className="custom-scrollbar max-h-[70vh] space-y-8 overflow-y-auto px-8 pb-8">
            <div className="space-y-2">
              <label htmlFor="task-title" className="block text-sm font-bold text-slate-800">
                Title <span className="text-red-600">*</span>
              </label>
              <input
                className={`w-full rounded-md border-b-2 border-transparent bg-slate-100 px-4 py-3 text-slate-900 placeholder:text-slate-400/80 transition-all focus:outline-none ${errors.title ? "border-red-500" : ""
                  }`}
                id="task-title"
                name="title"
                value={formData.title}
                onChange={onFieldChange}
                placeholder="e.g. Architect Blueprint Finalization"
              />
              {errors.title && (
                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-600">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  {errors.title}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="task-description" className="block text-sm font-bold text-slate-800">
                Description
              </label>
              <textarea
                className="w-full resize-none rounded-md border-b-2 border-transparent bg-slate-100 px-4 py-3 text-slate-900 placeholder:text-slate-400/80 transition-all focus:outline-none"
                id="task-description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={onFieldChange}
                placeholder="Describe the task scope and key deliverables..."
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="task-status" className="block text-sm font-bold text-slate-800">
                  Status
                </label>
                <CustomSelect
                  id="task-status"
                  value={formData.status}
                  onChange={(value) => updateField("status", value)}
                  options={TASK_STATUSES}
                  buttonClassName="rounded-md bg-slate-100 py-3 text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="task-category" className="block text-sm font-bold text-slate-800">
                  Category
                </label>
                <CustomSelect
                  id="task-category"
                  value={formData.category}
                  onChange={(value) => updateField("category", value)}
                  options={TASK_CATEGORIES}
                  buttonClassName="rounded-md bg-slate-100 py-3 text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="task-priority" className="block text-sm font-bold text-slate-800">
                  Priority
                </label>
                <CustomSelect
                  id="task-priority"
                  value={formData.priority}
                  onChange={(value) => updateField("priority", value)}
                  options={TASK_PRIORITIES}
                  buttonClassName="rounded-md bg-slate-100 py-3 text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="task-due-date" className="block text-sm font-bold text-slate-800">
                  Due Date <span className="text-red-600">*</span>
                </label>
                <input
                  className={`w-full cursor-pointer rounded-md bg-slate-100 px-4 py-3 text-slate-900 transition-all focus:outline-none ${errors.dueDate ? "ring-1 ring-red-500" : ""
                    }`}
                  id="task-due-date"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={onFieldChange}
                />
                {errors.dueDate && (
                  <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-600">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    {errors.dueDate}
                  </p>
                )}
              </div>
            </div>
          </div>
          <footer className="flex items-center justify-end gap-4 bg-slate-100/70 p-8">
            <Button variant="secondary" className="px-6 py-2.5 text-sm font-bold" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="px-8 py-2.5 text-sm font-bold"
            >
              {task ? "Save Task" : "Create Task"}
            </Button>
          </footer>
        </form>
      </section>
    </div>
  );
};

export default TaskFormModal;
