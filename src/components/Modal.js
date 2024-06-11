import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Modal = ({ show, onClose, children, customerName }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg border border-gray-200">
        <div className="flex justify-between mb-4">
          <span className="text-gray-500">{customerName}</span>
          <button onClick={onClose} className="text-gray-700 hover:text-red-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="text-gray-900">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
