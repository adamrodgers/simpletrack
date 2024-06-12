import { PhoneIcon, EnvelopeIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const PreferredContactMethod = ({ methods, phone, email }) => {
  const iconClass = "h-5 w-5 text-gray-500";

  const ContactIcon = ({ type }) => {
    const icons = {
      Phone: <PhoneIcon className={iconClass} />,
      Email: <EnvelopeIcon className={iconClass} />,
      Text: <ChatBubbleLeftRightIcon className={iconClass} />,
    };

    return icons[type] || null;
  };

  return (
    <td className="px-6 py-4">
      <div className="text-gray-400">{phone}</div>
      <div className="text-gray-400">{email}</div>
      <div className="flex gap-1">
        {methods.map((method) => (
          <ContactIcon key={method} type={method} />
        ))}
      </div>
    </td>
  );
};

export default PreferredContactMethod;
