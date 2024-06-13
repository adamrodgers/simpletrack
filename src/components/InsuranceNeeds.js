import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getNeedLevel } from "../utils/insurableItems";

const InsuranceNeeds = ({ needs }) => (
  <td className="px-6 py-4">
    <div className="flex gap-2">
      {needs.sort().map((need, idx) => {
        const { bgColor, textColor, icon } = getNeedLevel(need);
        return (
          <span key={idx} className={`inline-flex items-center gap-1 rounded-full ${bgColor} px-2 py-1 text-xs font-semibold ${textColor}`}>
            <FontAwesomeIcon icon={icon} className="mr-1" />
            {need}
          </span>
        );
      })}
    </div>
  </td>
);

InsuranceNeeds.propTypes = {
  needs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InsuranceNeeds;
