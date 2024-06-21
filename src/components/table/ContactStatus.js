import React from "react";
import PropTypes from "prop-types";
import { getContactLevel } from "../../utils/contactLevels";

const ContactStatus = ({ level, statusDate }) => {
  const { bgColor, textColor, dotColor, label } = getContactLevel(level);

  return (
    <td className="px-6 py-4">
      <div className={`inline-flex items-center gap-1 rounded-full ${bgColor} px-2 py-1 text-xs font-semibold ${textColor}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`}></span>
        {label}
      </div>
      <div className="text-xs text-gray-500">As of: {statusDate}</div>
    </td>
  );
};

ContactStatus.propTypes = {
  level: PropTypes.oneOf(["pending", "initial", "followedUp", "notInterested", "quoted", "client"]).isRequired,
  statusDate: PropTypes.string.isRequired,
};

export default ContactStatus;
