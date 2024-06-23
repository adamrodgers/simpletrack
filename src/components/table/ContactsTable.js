import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import DesktopContactsTable from "./DesktopContactsTable";
import MobileContactsTable from "./MobileContactsTable";
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

  if (isMobile) {
    return (
      <MobileContactsTable
        contacts={sortedContacts}
        selectedStatuses={selectedStatuses}
        selectedInsuranceTypes={selectedInsuranceTypes}
        toggleStatus={toggleStatus}
        toggleInsuranceType={toggleInsuranceType}
        getContactLevel={getContactLevel}
        onDelete={onDelete}
        onEdit={onEdit}
        onShowNotes={onShowNotes}
        insurableItems={insurableItems}
      />
    );
  }

  return (
    <DesktopContactsTable
      contacts={sortedContacts}
      selectedStatuses={selectedStatuses}
      selectedInsuranceTypes={selectedInsuranceTypes}
      toggleStatus={toggleStatus}
      toggleInsuranceType={toggleInsuranceType}
      showStatusDropdown={showStatusDropdown}
      setShowStatusDropdown={setShowStatusDropdown}
      statusDropdownRef={statusDropdownRef}
      showInsuranceDropdown={showInsuranceDropdown}
      setShowInsuranceDropdown={setShowInsuranceDropdown}
      insuranceDropdownRef={insuranceDropdownRef}
      onDelete={onDelete}
      onEdit={onEdit}
      onShowNotes={onShowNotes}
      insurableItems={insurableItems}
    />
  );
};

export default ContactsTable;
