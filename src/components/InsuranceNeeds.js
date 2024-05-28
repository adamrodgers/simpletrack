const needLevels = {
  Auto: {
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  Home: {
    bgColor: "bg-green-50",
    textColor: "text-green-600",
  },
  Boat: {
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
  },
  Life: {
    bgColor: "bg-red-50",
    textColor: "text-red-600",
  },
  Renters: {
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
  },
  Pet: {
    bgColor: "bg-teal-50",
    textColor: "text-teal-600",
  },
  Umbrella: {
    bgColor: "bg-pink-50",
    textColor: "text-pink-600",
  },
  Business: {
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-600",
  },
  "Earth Quake": {
    bgColor: "bg-cyan-50",
    textColor: "text-cyan-600",
  },
  Flood: {
    bgColor: "bg-lime-50",
    textColor: "text-lime-600",
  },
  Motorcycle: {
    bgColor: "bg-amber-50",
    textColor: "text-amber-600",
  },
  RV: {
    bgColor: "bg-gray-50",
    textColor: "text-gray-600",
  },
};

const InsuranceNeeds = ({ needs }) => {
  return (
    <td className="px-6 py-4">
      <div className="flex gap-2">
        {needs.sort().map((need, idx) => {
          const { bgColor, textColor } = needLevels[need] || { bgColor: "bg-gray-50", textColor: "text-gray-600" };
          return (
            <span key={idx} className={`inline-flex items-center gap-1 rounded-full ${bgColor} px-2 py-1 text-xs font-semibold ${textColor}`}>
              {need}
            </span>
          );
        })}
      </div>
    </td>
  );
};

export default InsuranceNeeds;
