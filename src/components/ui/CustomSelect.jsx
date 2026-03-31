import { useCallback, useRef, useState } from "react";
import { useDismissibleLayer } from "../../hooks/useDismissibleLayer";
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
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const normalizedOptions = normalizeOptions(options);
  const selectedOption =
    normalizedOptions.find((option) => option.value === value) || normalizedOptions[0];
  const selectedLabel = selectedOption?.label || "";
  const listboxId = `${id}-listbox`;

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  useDismissibleLayer({
    isActive: isOpen,
    containerRef,
    onDismiss: closeDropdown
  });

  const handleChange = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const handleTriggerKeyDown = (event) => {
    const { key } = event;

    if (key === "Enter" || key === " " || key === "ArrowDown" || key === "ArrowUp") {
      event.preventDefault();
      setIsOpen((current) => !current);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {leftIcon && (
        <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-lg text-slate-500">
          {leftIcon}
        </span>
      )}

      <button
        id={id}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => setIsOpen((current) => !current)}
        onKeyDown={handleTriggerKeyDown}
        className={`w-full text-left ${leftIcon ? "pl-10" : "pl-4"} pr-9 focus:outline-none ${buttonClassName}`}
      >
        <span className="block truncate">{selectedLabel}</span>
      </button>

      <span
        className={`material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-lg text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""
          }`}
      >
        expand_more
      </span>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
          <ul id={listboxId} role="listbox" aria-labelledby={id} className="max-h-64 overflow-y-auto py-1">
            {normalizedOptions.map(({ label, value: optionValue }) => {
              const isSelected = optionValue === value;

              return (
                <li key={optionValue} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => handleChange(optionValue)}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${isSelected
                      ? "bg-blue-50 font-semibold text-blue-700"
                      : "text-slate-700 hover:bg-slate-100"
                      }`}
                  >
                    <span>{label}</span>
                    {isSelected && (
                      <span className="material-symbols-outlined text-base text-blue-600">check</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
