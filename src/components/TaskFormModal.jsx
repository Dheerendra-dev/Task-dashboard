import { useEffect, useState } from "react";

import Button from "./ui/Button";
import TaskFormFields from "./task-form/TaskFormFields";
import { validateTaskForm } from "./task-form/validateTaskForm";
import { buildTaskFormInitialState } from "../utils/taskForm";
import { DEFAULT_TASK_FORM_VALUES } from "../constants/taskForm";

const TaskFormModal = ({ isOpen, task, onSave, onClose }) => {
  const [formData, setFormData] = useState(() => ({ ...DEFAULT_TASK_FORM_VALUES }));
  const [errors, setErrors] = useState({});
  const isEditing = Boolean(task);

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

  const onFieldChange = ({ target: { name, value } }) => {
    updateField(name, value);
  };

  const validateForm = () => {
    const nextErrors = validateTaskForm(formData);
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
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <header className="flex items-center justify-between px-8 pb-4 pt-8">
          <h2 id="task-form-title" className="text-2xl font-extrabold tracking-tight text-slate-900">
            {isEditing ? "Edit Task" : "Create Task"}
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
          <TaskFormFields
            formData={formData}
            errors={errors}
            onFieldChange={onFieldChange}
            updateField={updateField}
          />
          <footer className="flex items-center justify-end gap-4 bg-slate-100/70 p-8">
            <Button variant="secondary" className="px-6 py-2.5 text-sm font-bold" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="px-8 py-2.5 text-sm font-bold"
            >
              {isEditing ? "Save Task" : "Create Task"}
            </Button>
          </footer>
        </form>
      </section>
    </div>
  );
};

export default TaskFormModal;
