import React from "react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

const MobileContactsTable = ({ contacts, getContactLevel, onDelete, onEdit, onShowNotes }) => {
  const groupedContacts = contacts.reduce((acc, contact) => {
    const level = contact.status;
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(contact);
    return acc;
  }, {});

  const contactLevelsOrder = ["pending", "initial", "followedUp", "notInterested", "quoted", "client"];

  return (
    <div className="w-full">
      {contactLevelsOrder.map((level) => (
        <div key={level}>
          {groupedContacts[level] && groupedContacts[level].length > 0 && (
            <>
              <h2 className={`text-lg font-semibold my-4 ${getContactLevel(level).textColor}`}>{getContactLevel(level).label}</h2>
              {groupedContacts[level].map((contact) => (
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
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileContactsTable;
