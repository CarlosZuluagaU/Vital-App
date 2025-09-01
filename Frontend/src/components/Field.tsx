import React from 'react';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  type?: string;
  error?: string;
}

// Campo accesible, label for, foco visible, error opcional
export const Field: React.FC<FieldProps> = ({ label, id, type = 'text', error, ...props }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block font-bold mb-1 text-lg">
      {label}
    </label>
    <input
      id={id}
      type={type}
      className="w-full min-h-[44px] px-3 py-2 border rounded focus:outline focus:outline-2 focus:outline-blue-600 text-lg"
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    />
    {error && (
      <div id={`${id}-error`} className="text-red-600 mt-1 text-sm" role="alert">
        {error}
      </div>
    )}
  </div>
);
