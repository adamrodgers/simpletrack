import { faCar, faHome, faShip, faHeart, faBuilding, faDog, faUmbrella, faStore, faHouseDamage, faWater, faMotorcycle, faCaravan, faAt, faHouseUser } from "@fortawesome/free-solid-svg-icons";

const INSURABLE_ITEMS = [
  { name: "Auto", bgColor: "bg-blue-50", textColor: "text-blue-600", icon: faCar },
  { name: "Home", bgColor: "bg-green-50", textColor: "text-green-600", icon: faHome },
  { name: "Boat", bgColor: "bg-yellow-50", textColor: "text-yellow-600", icon: faShip },
  { name: "Life", bgColor: "bg-red-50", textColor: "text-red-600", icon: faHeart },
  { name: "Renters", bgColor: "bg-purple-50", textColor: "text-purple-600", icon: faBuilding },
  { name: "Pet", bgColor: "bg-teal-50", textColor: "text-teal-600", icon: faDog },
  { name: "Umbrella", bgColor: "bg-pink-50", textColor: "text-pink-600", icon: faUmbrella },
  { name: "Business", bgColor: "bg-indigo-50", textColor: "text-indigo-600", icon: faStore },
  { name: "Earth Quake", bgColor: "bg-cyan-50", textColor: "text-cyan-600", icon: faHouseDamage },
  { name: "Flood", bgColor: "bg-lime-50", textColor: "text-lime-600", icon: faWater },
  { name: "Motorcycle", bgColor: "bg-amber-50", textColor: "text-amber-600", icon: faMotorcycle },
  { name: "RV", bgColor: "bg-gray-50", textColor: "text-gray-600", icon: faCaravan },
  { name: "ATV", bgColor: "bg-orange-50", textColor: "text-orange-600", icon: faAt },
  { name: "Rental Property", bgColor: "bg-stone-50", textColor: "text-stone-600", icon: faHouseUser },
];

export const INSURANCE_NEEDS = INSURABLE_ITEMS.map((item) => item.name);

export const needLevels = INSURABLE_ITEMS.reduce((acc, item) => {
  acc[item.name] = { bgColor: item.bgColor, textColor: item.textColor, icon: item.icon };
  return acc;
}, {});

export const defaultLevel = {
  bgColor: "bg-gray-50",
  textColor: "text-gray-600",
  icon: null,
};

export const getNeedLevel = (need) => {
  const level = needLevels[need] || defaultLevel;
  console.log(`Need: ${need}, Level:`, level); // Add this line
  return level;
};
