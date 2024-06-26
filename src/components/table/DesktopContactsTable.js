import React from "react";
import { ArrowsUpDownIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import ContactRow from "./ContactRow";
import { getContactLevel, contactLevels } from "../../utils/contactLevels";
import { ICON_MAP } from "../../utils/insurableItems";

const DesktopContactsTable = ({
  contacts,
  selectedStatuses,
  selectedInsuranceTypes,
  toggleStatus,
  toggleInsuranceType,
  showStatusDropdown,
  setShowStatusDropdown,
  statusDropdownRef,
  showInsuranceDropdown,
  setShowInsuranceDropdown,
  insuranceDropdownRef,
  onDelete,
  onEdit,
  onShowNotes,
  insurableItems,
  handleSort,
}) => {
  const tableWrapperClasses = "overflow-auto";
  const tableClasses = "w-full border-collapse bg-white text-left text-sm text-gray-500";
  const theadClasses = "bg-gray-50";
  const thClasses = "px-2 py-2 lg:px-6 lg:py-4 font-medium text-gray-900";
  const thSortableClasses = `${thClasses} flex items-center relative`;
  const iconClasses = "h-4 w-4 ml-1";
  const tbodyClasses = "divide-y divide-gray-100 border-t border-gray-100";

  return (
    <div className={tableWrapperClasses}>
      <table className={tableClasses}>
        <thead className={theadClasses}>
          <tr>
            <th scope="col" className={thSortableClasses} onClick={() => handleSort("name")}>
              Name
              <ArrowsUpDownIcon className={iconClasses} />
            </th>
            <th scope="col" className={thClasses}>
              Contact
            </th>
            <th scope="col" className={thSortableClasses}>
              <div>Status</div>
              <ChevronDownIcon className={iconClasses} onClick={() => setShowStatusDropdown(!showStatusDropdown)} />
              {showStatusDropdown && (
                <div ref={statusDropdownRef} className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <ul className="max-h-48 overflow-auto p-2">
                    {Object.keys(contactLevels).map((level) => (
                      <li key={level} className="flex items-center mb-2">
                        <input type="checkbox" className="mr-2" checked={selectedStatuses.includes(level)} onChange={() => toggleStatus(level)} />
                        <span className={getContactLevel(level).textColor}>{getContactLevel(level).label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </th>
            <th scope="col" className={thClasses}>
              Current Insurance
            </th>
            <th scope="col" className={thClasses}>
              State
            </th>
            <th scope="col" className={thSortableClasses}>
              <div>Insurance Needs</div>
              <ChevronDownIcon className={iconClasses} onClick={() => setShowInsuranceDropdown(!showInsuranceDropdown)} />
              {showInsuranceDropdown && (
                <div ref={insuranceDropdownRef} className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <ul className="max-h-48 overflow-auto p-2">
                    {insurableItems.map((item) => (
                      <li key={item.name} className="flex items-center mb-2">
                        <input type="checkbox" className="mr-2" checked={selectedInsuranceTypes.includes(item.name)} onChange={() => toggleInsuranceType(item.name)} />
                        <span className={ICON_MAP[item.name]?.textColor}>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </th>
            <th scope="col" className={thClasses}></th>
          </tr>
        </thead>
        <tbody className={tbodyClasses}>
          {contacts.map((contact, index) => (
            <ContactRow key={index} contact={contact} onDelete={onDelete} onEdit={onEdit} onShowNotes={onShowNotes} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DesktopContactsTable;
