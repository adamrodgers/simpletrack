import { faCar, faHome, faShip, faHeart, faBuilding, faDog, faUmbrella, faStore, faHouseDamage, faWater, faMotorcycle, faCaravan, faAt, faHouseUser } from "@fortawesome/free-solid-svg-icons";

export const ICON_MAP = {
  faCar: faCar,
  faHome: faHome,
  faShip: faShip,
  faHeart: faHeart,
  faBuilding: faBuilding,
  faDog: faDog,
  faUmbrella: faUmbrella,
  faStore: faStore,
  faHouseDamage: faHouseDamage,
  faWater: faWater,
  faMotorcycle: faMotorcycle,
  faCaravan: faCaravan,
  faAt: faAt,
  faHouseUser: faHouseUser,
};

export const defaultLevel = {
  bgColor: "bg-gray-50",
  textColor: "text-gray-600",
  icon: null,
};

export const getNeedLevel = (need, items) => {
  const item = items.find((item) => item.name === need);
  return item ? { ...item, icon: ICON_MAP[item.icon] } : { bgColor: "bg-gray-50", textColor: "text-gray-600", icon: null };
};
