import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import ContactStatus from "./ContactStatus";
import PreferredContactMethod from "./PreferredContactMethod";
import StateAbbreviation from "./StateAbbreviation";
import InsuranceNeeds from "./InsuranceNeeds";
import ContactActions from "./ContactActions";

const ContactsTable = ({ contacts, onDelete, onEdit, onShowNotes, onSort }) => {
  return (
    <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900 flex items-center cursor-pointer" onClick={onSort}>
            Name
            <ArrowsUpDownIcon className="h-4 w-4 ml-1" />
          </th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">
            Contact
          </th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">
            Status
          </th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">
            Current Insurance
          </th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">
            State
          </th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">
            Insurance Needs
          </th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {contacts.map((contact, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
              <div className="text-sm">
                <div className="font-medium text-gray-700">{contact.name}</div>
                <div className="text-gray-400">{contact.occupation}</div>
              </div>
            </th>
            <PreferredContactMethod methods={contact.preferredContact} phone={contact.phone} email={contact.email} />
            <ContactStatus level={contact.status} statusDate={contact.statusDate} />
            <td className="px-6 py-4">{contact.currentInsCo}</td>
            <StateAbbreviation state={contact.state} />
            <InsuranceNeeds needs={contact.needs} />
            <ContactActions contact={contact} onDelete={onDelete} onEdit={onEdit} onShowNotes={onShowNotes} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactsTable;
