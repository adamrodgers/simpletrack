const contactLevels = {
  pending: {
    bgColor: "bg-gray-50",
    textColor: "text-gray-600",
    dotColor: "bg-gray-600",
    label: "Pending Lead",
  },
  initial: {
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    dotColor: "bg-purple-600",
    label: "Initial Contact",
  },
  followedUp: {
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
    dotColor: "bg-yellow-600",
    label: "Followed Up",
  },
  notInterested: {
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    dotColor: "bg-red-600",
    label: "Not Interested",
  },
  quoted: {
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    dotColor: "bg-blue-600",
    label: "Quoted",
  },
  client: {
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    dotColor: "bg-green-600",
    label: "Client",
  },
};

function ContactStatus({ level, statusDate }) {
  const { bgColor, textColor, dotColor, label } = contactLevels[level] || contactLevels.pending;
  return (
    <td className="px-6 py-4">
      <div className={`inline-flex items-center gap-1 rounded-full ${bgColor} px-2 py-1 text-xs font-semibold ${textColor}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`}></span>
        {label}
      </div>
      <div className="text-xs text-gray-500">As of: {statusDate}</div>
    </td>
  );
}

export default ContactStatus;
