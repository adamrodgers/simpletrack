import { useState } from "react";
import { PencilIcon, TrashIcon, ChatBubbleBottomCenterTextIcon, HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/outline";

const ConfirmDeleteButtons = ({ onConfirm, onCancel }) => (
  <div className="flex gap-2">
    <button onClick={onConfirm} className="text-green-600 hover:text-green-800">
      <HandThumbUpIcon className="h-6 w-6" />
    </button>
    <button onClick={onCancel} className="text-red-600 hover:text-red-800">
      <HandThumbDownIcon className="h-6 w-6" />
    </button>
  </div>
);

const ContactActions = ({ contact, onDelete, onEdit, onShowNotes }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = () => setConfirmDelete(true);

  const handleConfirmDelete = () => {
    onDelete(contact._id);
    setConfirmDelete(false);
  };

  const handleCancelDelete = () => setConfirmDelete(false);

  return (
    <td className="px-6 py-4">
      <div className="flex justify-end gap-4">
        {confirmDelete ? (
          <ConfirmDeleteButtons onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
        ) : (
          <button onClick={handleDeleteClick}>
            <TrashIcon className="h-6 w-6 text-gray-600 hover:text-red-600" />
          </button>
        )}
        <button onClick={() => onEdit(contact._id)}>
          <PencilIcon className="h-6 w-6 text-gray-600 hover:text-blue-600" />
        </button>
        <button onClick={() => onShowNotes(contact._id)} disabled={!contact.notes || contact.notes.length === 0}>
          <ChatBubbleBottomCenterTextIcon className={`h-6 w-6 ${contact.notes && contact.notes.length > 0 ? "text-gray-600 hover:text-green-600" : "text-gray-300"}`} />
        </button>
      </div>
    </td>
  );
};

export default ContactActions;
