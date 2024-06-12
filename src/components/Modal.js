import React from "react";
import PropTypes from "prop-types";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Modal = ({ show, onClose, children, customerName }) => {
  if (!show) return null;

  const modalClasses = "bg-white rounded-lg p-6 w-1/3 shadow-lg border border-gray-200";
  const overlayClasses = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50";
  const closeButtonClasses = "text-gray-700 hover:text-red-700";

  return (
    <div className={overlayClasses}>
      <div className={modalClasses}>
        <div className="flex justify-between mb-4">
          <span className="text-gray-500">{customerName}</span>
          <button onClick={onClose} className={closeButtonClasses}>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="text-gray-900 whitespace-pre-wrap">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  customerName: PropTypes.string,
};

Modal.defaultProps = {
  customerName: "",
};

export default Modal;
