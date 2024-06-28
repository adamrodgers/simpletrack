import React from "react";

const FormInput = ({ label, type = "text", name, value, onChange, error, ...rest }) => (
  <div>
    <label className="block text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-md text-gray-900 focus:ring focus:ring-blue-200 ${error ? "border-red-500" : "border-gray-300"}`}
      {...rest}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default FormInput;
