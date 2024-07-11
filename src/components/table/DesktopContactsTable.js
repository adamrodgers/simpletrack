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
  const tableContainerClasses = "min-w-full inline-block align-middle";
  const tableClasses = "w-full border-collapse bg-white text-left text-sm text-gray-500";
  const tableHeaderGroupClasses = "bg-gray-50";
  const tableHeaderCellClasses = "px-2 py-2 lg:px-6 lg:py-4 font-medium text-gray-900";
  const tableHeaderCellSortableClasses = `${tableHeaderCellClasses} flex items-center relative`;
  const sortIconClasses = "h-4 w-4 ml-1";
  const tableRowGroupClasses = "divide-y divide-gray-100 border-t border-gray-100";
  const tableRowClasses = "table-row hover:bg-gray-50";
  const tableCellClasses = "table-cell px-2 py-2 lg:px-6 lg:py-4";
  const actionsCellClasses = "px-2 py-2 lg:px-6 lg:py-4 flex space-x-4";

  return (
    <div className={tableWrapperClasses}>
      <div className={tableContainerClasses}>
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className={tableClasses}>
            <thead className={tableHeaderGroupClasses}>
              <tr>
                <th scope="col" className={tableHeaderCellSortableClasses} onClick={() => handleSort("name")}>
                  Name
                  <ArrowsUpDownIcon className={sortIconClasses} />
                </th>
                <th scope="col" className={tableHeaderCellClasses}>
                  Contact
                </th>
                <th scope="col" className={tableHeaderCellSortableClasses}>
                  <div>Status</div>
                  <ChevronDownIcon className={sortIconClasses} onClick={() => setShowStatusDropdown(!showStatusDropdown)} />
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
                <th scope="col" className={tableHeaderCellClasses}>
                  Current Insurance
                </th>
                <th scope="col" className={tableHeaderCellClasses}>
                  State
                </th>
                <th scope="col" className={tableHeaderCellSortableClasses}>
                  <div>Insurance Needs</div>
                  <ChevronDownIcon className={sortIconClasses} onClick={() => setShowInsuranceDropdown(!showInsuranceDropdown)} />
                  {showInsuranceDropdown && (
                    <div ref={insuranceDropdownRef} className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <ul className="max-h-48 overflow-auto p-2">
                        {insurableItems.map((item) => (
                          <li key={item.name} className="flex items-center mb-2">
                            <input type="checkbox" className="mr-2" checked={selectedInsuranceTypes.includes(item.name)} onChange={() => toggleInsuranceType(item.name)} />
                            <span className={ICON_MAP[item.icon]?.textColor}>{item.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </th>
                <th scope="col" className={tableHeaderCellClasses}></th>
              </tr>
            </thead>
            <tbody className={tableRowGroupClasses}>
              {contacts.map((contact, index) => (
                <ContactRow key={index} contact={contact} onDelete={onDelete} onEdit={onEdit} onShowNotes={onShowNotes} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DesktopContactsTable;
