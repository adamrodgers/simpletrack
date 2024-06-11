import { PencilIcon, TrashIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

const ContactActions = ({ contact, onDelete, onEdit, onShowNotes }) => {
  return (
    <td className="px-6 py-4">
      <div className="flex justify-end gap-4">
        <button onClick={() => onDelete(contact._id)}>
          <TrashIcon className="h-6 w-6 text-gray-600 hover:text-red-600" />
        </button>
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
