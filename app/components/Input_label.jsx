import { forwardRef } from "react";

const Input_label = forwardRef(({ label, id, type = "text", ...props }, ref) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-2 text-lg font-normal">
        {label}
      </label>

      <input
        ref={ref}
        type={type}
        id={id}
        className="focus:outline-none focus:border-cyan-500 py-1 pl-2 rounded-md border-2 border-gray-300 w-full"
        {...props}
      />
    </div>
  );
});

Input_label.displayName = "Input_label";

export default Input_label;
