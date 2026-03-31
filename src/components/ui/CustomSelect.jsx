import { normalizeOptions } from "../../utils/taskForm";

const CustomSelect = ({
  id,
  value,
  options,
  onChange,
  ariaLabel,
  leftIcon,
  className = "",
  buttonClassName = ""
}) => {
  const normalizedOptions = normalizeOptions(options);

  const handleChange = ({ target: { value: selectedValue } }) => {
    onChange(selectedValue);
  };

  return (
    <div className={`relative ${className}`}>
      {leftIcon && (
        <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-lg text-slate-500">
          {leftIcon}
        </span>
      )}
      <select
        id={id}
        value={value}
        aria-label={ariaLabel}
        onChange={handleChange}
        className={`select-reset w-full ${leftIcon ? "pl-10" : "pl-4"} pr-9 focus:outline-none ${buttonClassName}`}
      >
        {normalizedOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span
        className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-lg text-slate-500"
      >
        expand_more
      </span>
    </div>
  );
};

export default CustomSelect;
