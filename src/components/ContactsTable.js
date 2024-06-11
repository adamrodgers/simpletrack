import React from "react";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import ContactRow from "./ContactRow";

const ContactsTable = ({ contacts, onDelete, onEdit, onShowNotes, onSort }) => {
  return (
    <div className="overflow-auto">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-2 py-2 lg:px-6 lg:py-4 font-medium text-gray-900 flex items-center cursor-pointer" onClick={onSort}>
              Name
              <ArrowsUpDownIcon className="h-4 w-4 ml-1" />
            </th>
            <th scope="col" className="px-2 py-2 lg:px-6 lg:py-4 font-medium text-gray-900">
              Contact
            </th>
            <th scope="col" className="px-2 py-2 lg:px-6 lg:py-4 font-medium text-gray-900">
              Status
            </th>
            <th scope="col" className="px-2 py-2 lg:px-6 lg:py-4 font-medium text-gray-900">
              Current Insurance
            </th>
            <th scope="col" className="px-2 py-2 lg:px-6 lg:py-4 font-medium text-gray-900">
              State
            </th>
            <th scope="col" className="px-2 py-2 lg:px-6 lg:py-4 font-medium text-gray-900">
              Insurance Needs
            </th>
            <th scope="col" className="px-2 py-2 lg:px-6 lg:py-4 font-medium text-gray-900"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {contacts.map((contact, index) => (
            <ContactRow key={index} contact={contact} onDelete={onDelete} onEdit={onEdit} onShowNotes={onShowNotes} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTable;
