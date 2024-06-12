import React from "react";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import ContactRow from "./ContactRow";

const ContactsTable = ({ contacts, onDelete, onEdit, onShowNotes, onSort }) => {
  const tableWrapperClasses = "overflow-auto";
  const tableClasses = "w-full border-collapse bg-white text-left text-sm text-gray-500";
  const theadClasses = "bg-gray-50";
  const thClasses = "px-2 py-2 lg:px-6 lg:py-4 font-medium text-gray-900";
  const thSortableClasses = `${thClasses} flex items-center cursor-pointer`;
  const iconClasses = "h-4 w-4 ml-1";
  const tbodyClasses = "divide-y divide-gray-100 border-t border-gray-100";

  return (
    <div className={tableWrapperClasses}>
      <table className={tableClasses}>
        <thead className={theadClasses}>
          <tr>
            <th scope="col" className={thSortableClasses} onClick={onSort}>
              Name
              <ArrowsUpDownIcon className={iconClasses} />
            </th>
            <th scope="col" className={thClasses}>
              Contact
            </th>
            <th scope="col" className={thClasses}>
              Status
            </th>
            <th scope="col" className={thClasses}>
              Current Insurance
            </th>
            <th scope="col" className={thClasses}>
              State
            </th>
            <th scope="col" className={thClasses}>
              Insurance Needs
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

export default ContactsTable;
