import CustomSelect from "../ui/CustomSelect";
import FieldError from "./FieldError";
import {
  FIELD_LABEL_CLASS,
  INPUT_BASE_CLASS,
  SELECT_BUTTON_CLASS,
  SELECT_FIELDS
} from "./formConfig";

const TaskFormFields = ({ formData, errors, onFieldChange, updateField }) => {
  return (
    <div className="custom-scrollbar max-h-[70vh] space-y-8 overflow-y-auto px-8 pb-8">
      <div className="space-y-2">
        <label htmlFor="task-title" className={FIELD_LABEL_CLASS}>
          Title <span className="text-red-600">*</span>
        </label>
        <input
          className={`${INPUT_BASE_CLASS} ${errors.title ? "border-red-500" : ""}`}
          id="task-title"
          name="title"
          value={formData.title}
          onChange={onFieldChange}
          placeholder="e.g. Architect Blueprint Finalization"
        />
        <FieldError message={errors.title} />
      </div>

      <div className="space-y-2">
        <label htmlFor="task-description" className={FIELD_LABEL_CLASS}>
          Description
        </label>
        <textarea
          className={INPUT_BASE_CLASS}
          id="task-description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={onFieldChange}
          placeholder="Describe the task scope and key deliverables..."
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {SELECT_FIELDS.map(({ id, name, label, options }) => (
          <div className="space-y-2" key={id}>
            <label htmlFor={id} className={FIELD_LABEL_CLASS}>
              {label}
            </label>
            <CustomSelect
              id={id}
              value={formData[name]}
              onChange={(value) => updateField(name, value)}
              options={options}
              buttonClassName={SELECT_BUTTON_CLASS}
            />
          </div>
        ))}

        <div className="space-y-2">
          <label htmlFor="task-due-date" className={FIELD_LABEL_CLASS}>
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
          <FieldError message={errors.dueDate} />
        </div>
      </div>
    </div>
  );
};

export default TaskFormFields;
