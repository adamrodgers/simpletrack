import React from "react";
import { ArrowsUpDownIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import ContactRow from "./ContactRow";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

const ContactsTable = ({ contacts = [], onDelete, onEdit, onShowNotes, onSort }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const tableWrapperClasses = "overflow-auto";
  const tableClasses = "w-full border-collapse bg-white text-left text-sm text-gray-500";
  const theadClasses = "bg-gray-50";
  const thClasses = "px-2 py-2 lg:px-6 lg:py-4 font-medium text-gray-900";
  const thSortableClasses = `${thClasses} flex items-center cursor-pointer`;
  const iconClasses = "h-4 w-4 ml-1";
  const tbodyClasses = "divide-y divide-gray-100 border-t border-gray-100";

  if (isMobile) {
    return (
      <div className="w-full">
        {contacts.map((contact) => (
          <div key={contact._id} className="bg-white p-4 mb-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <div className="mr-2">
                <span className="text-gray-900 font-semibold text-lg">{contact.name}</span>
              </div>
            </div>
            <div className="text-gray-700 mb-1">{contact.occupation}</div>
            <div className="text-gray-500 mb-1">
              <a href={`mailto:${contact.email}`} className="flex items-center">
                <EnvelopeIcon className="w-4 h-4 mr-1" />
                {contact.email}
              </a>
            </div>
            <div className="text-gray-500">
              <a href={`tel:${contact.phone}`} className="flex items-center">
                <PhoneIcon className="w-4 h-4 mr-1" />
                {contact.phone}
              </a>
            </div>
            <div className="flex space-x-4 mt-2">
              <button onClick={() => onEdit(contact._id)} className="text-blue-600 hover:text-blue-800">
                Edit
              </button>
              <button onClick={() => onDelete(contact._id)} className="text-red-600 hover:text-red-800">
                Delete
              </button>
              <button onClick={() => onShowNotes(contact._id)} className="text-gray-600 hover:text-gray-800">
                Notes
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

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
