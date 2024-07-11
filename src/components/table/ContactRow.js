import React from "react";
import ContactStatus from "./ContactStatus";
import PreferredContactMethod from "./PreferredContactMethod";
import StateAbbreviation from "./StateAbbreviation";
import InsuranceNeeds from "./InsuranceNeeds";
import ContactActions from "./ContactActions";

const tableRowClasses = "table-row hover:bg-gray-50";
const tableCellClasses = "table-cell px-2 py-2 lg:px-6 lg:py-4";

const ContactRow = ({ contact, onDelete, onEdit, onShowNotes }) => {
  return (
    <div className={tableRowClasses}>
      <div className={tableCellClasses}>
        <div className="text-sm">
          <div className="font-medium text-gray-700">{contact.name}</div>
          <div className="text-gray-400">{contact.occupation}</div>
        </div>
      </div>
      <PreferredContactMethod methods={contact.preferredContact} phone={contact.phone} email={contact.email} />
      <ContactStatus level={contact.status} statusDate={contact.statusDate} />
      <div className={tableCellClasses}>{contact.currentInsCo}</div>
      <StateAbbreviation state={contact.state} />
      <InsuranceNeeds needs={contact.needs} />
      <ContactActions contact={contact} onDelete={onDelete} onEdit={onEdit} onShowNotes={onShowNotes} />
    </div>
  );
};

export default ContactRow;
