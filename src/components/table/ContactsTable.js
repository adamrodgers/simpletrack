import React, { useState, useEffect, useRef } from "react";
import { ArrowsUpDownIcon, EnvelopeIcon, PhoneIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import ContactRow from "./ContactRow";
import { useMediaQuery } from "react-responsive";
import { getContactLevel, contactLevels } from "../../utils/contactLevels";
import { ICON_MAP } from "../../utils/insurableItems";

const ContactsTable = ({ contacts = [], onDelete, onEdit, onShowNotes }) => {
  const [sortedContacts, setSortedContacts] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState(Object.keys(contactLevels));
  const [selectedInsuranceTypes, setSelectedInsuranceTypes] = useState([]);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showInsuranceDropdown, setShowInsuranceDropdown] = useState(false);
  const [insurableItems, setInsurableItems] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const statusDropdownRef = useRef(null);
  const insuranceDropdownRef = useRef(null);

  useEffect(() => {
    const filteredContacts = contacts.filter(
      (contact) => selectedStatuses.includes(contact.status) && (selectedInsuranceTypes.length === 0 || contact.needs.some((need) => selectedInsuranceTypes.includes(need)))
    );
    setSortedContacts(filteredContacts);
  }, [contacts, selectedStatuses, selectedInsuranceTypes]);

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

  const toggleStatus = (status) => {
    setSelectedStatuses((prevSelected) => (prevSelected.includes(status) ? prevSelected.filter((s) => s !== status) : [...prevSelected, status]));
  };

  const toggleInsuranceType = (type) => {
    setSelectedInsuranceTypes((prevSelected) => (prevSelected.includes(type) ? prevSelected.filter((t) => t !== type) : [...prevSelected, type]));
  };

  const handleClickOutside = (event) => {
    if ((statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) || (insuranceDropdownRef.current && !insuranceDropdownRef.current.contains(event.target))) {
      setShowStatusDropdown(false);
      setShowInsuranceDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const tableWrapperClasses = "overflow-auto";
  const tableClasses = "w-full border-collapse bg-white text-left text-sm text-gray-500";
  const theadClasses = "bg-gray-50";
  const thClasses = "px-2 py-2 lg:px-6 lg:py-4 font-medium text-gray-900";
  const thSortableClasses = `${thClasses} flex items-center relative`;
  const iconClasses = "h-4 w-4 ml-1";
  const tbodyClasses = "divide-y divide-gray-100 border-t border-gray-100";

  if (isMobile) {
    const groupedContacts = sortedContacts.reduce((acc, contact) => {
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
  }

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
          {sortedContacts.map((contact, index) => (
            <ContactRow key={index} contact={contact} onDelete={onDelete} onEdit={onEdit} onShowNotes={onShowNotes} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTable;
