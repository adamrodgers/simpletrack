import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICON_MAP } from "../utils/insurableItems";

const InsuranceNeeds = ({ needs }) => {
  const [insurableItems, setInsurableItems] = useState([]);

  useEffect(() => {
    const fetchInsurableItems = async () => {
      try {
        const response = await fetch("/api/insurable-items");
        const data = await response.json();
        setInsurableItems(data);
      } catch (error) {
        console.error("Error fetching insurable items:", error);
      }
    };

    fetchInsurableItems();
  }, []);

  const getNeedLevel = (need) => {
    const item = insurableItems.find((item) => item.name === need);
    return item ? { ...item, icon: ICON_MAP[item.icon] } : { bgColor: "bg-gray-50", textColor: "text-gray-600", icon: null };
  };

  const firstRow = needs.slice(0, 3);
  const secondRow = needs.slice(3);

  return (
    <td className="px-6 py-4">
      <div className="flex flex-wrap gap-1">
        {firstRow.map((need, idx) => {
          const { bgColor, textColor, icon } = getNeedLevel(need);
          return (
            <span key={idx} className={`inline-flex items-center gap-1 rounded-full ${bgColor} px-2 py-1 text-xs font-semibold ${textColor}`}>
              <FontAwesomeIcon icon={icon} className="mr-1" />
              {need}
            </span>
          );
        })}
        {secondRow.length > 0 && (
          <>
            <span className="w-full h-px"></span>
            {secondRow.map((need, idx) => {
              const { bgColor, textColor, icon } = getNeedLevel(need);
              return (
                <span key={idx} className={`inline-flex items-center gap-1 rounded-full ${bgColor} px-2 py-1 text-xs font-semibold ${textColor}`}>
                  <FontAwesomeIcon icon={icon} className="mr-1" />
                  {need}
                </span>
              );
            })}
          </>
        )}
      </div>
    </td>
  );
};

InsuranceNeeds.propTypes = {
  needs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InsuranceNeeds;
