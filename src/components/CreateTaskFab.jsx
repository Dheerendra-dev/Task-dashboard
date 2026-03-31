import React from "react";
import Button from "./ui/Button";

const CreateTaskFab = ({ show, onClick }) => {
  if (!show) {
    return null;
  }

  return (
    <Button
      className="cta-gradient fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl transition-transform duration-200 hover:scale-110 active:scale-95 lg:hidden"
      onClick={onClick}
      aria-label="Create task"
    >
      <span className="material-symbols-outlined text-2xl">add</span>
    </Button>
  );
};

export default CreateTaskFab;
