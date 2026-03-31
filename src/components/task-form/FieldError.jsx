import { ERROR_TEXT_CLASS } from "./formConfig";

const FieldError = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <p className={ERROR_TEXT_CLASS}>
      <span className="material-symbols-outlined text-[14px]">error</span>
      {message}
    </p>
  );
};

export default FieldError;
