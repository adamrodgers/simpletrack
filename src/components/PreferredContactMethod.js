import { PhoneIcon, EnvelopeIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const PreferredContactMethod = ({ methods }) => {
  const iconClass = "h-5 w-5 text-gray-500";

  return (
    <td className="px-6 py-4">
      <div className="text-gray-400">{contact.phone}</div>
      <div className="text-gray-400">{contact.email}</div>
      <div className="flex gap-1">
        {methods.includes("Phone") && <PhoneIcon className={iconClass} />}
        {methods.includes("Email") && <EnvelopeIcon className={iconClass} />}
        {methods.includes("Text") && <ChatBubbleLeftRightIcon className={iconClass} />}
      </div>
    </td>
  );
};

export default PreferredContactMethod;
