import React from "react";
import ContactStatus from "./ContactStatus";
import PreferredContactMethod from "../PreferredContactMethod";
import StateAbbreviation from "../StateAbbreviation";
import InsuranceNeeds from "./InsuranceNeeds";
import ContactActions from "./ContactActions";

const ContactInfo = ({ name, occupation }) => (
  <div className="text-sm">
    <div className="font-medium text-gray-700">{name}</div>
    <div className="text-gray-400">{occupation}</div>
  </div>
);

const ContactRow = ({ contact, onDelete, onEdit, onShowNotes }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="flex flex-col lg:flex-row gap-2 px-2 py-2 lg:px-6 lg:py-4 font-normal text-gray-900">
        <ContactInfo name={contact.name} occupation={contact.occupation} />
      </td>
      <PreferredContactMethod methods={contact.preferredContact} phone={contact.phone} email={contact.email} />
      <ContactStatus level={contact.status} statusDate={contact.statusDate} />
      <td className="px-2 py-2 lg:px-6 lg:py-4">{contact.currentInsCo}</td>
      <StateAbbreviation state={contact.state} />
      <InsuranceNeeds needs={contact.needs} />
      <ContactActions contact={contact} onDelete={onDelete} onEdit={onEdit} onShowNotes={onShowNotes} />
    </tr>
  );
};

export default ContactRow;
