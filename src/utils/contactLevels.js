export const contactLevels = {
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

export const getContactLevel = (level) => contactLevels[level] || contactLevels.pending;
