"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PencilIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import useSWR from "swr";

import ContactStatus from "../../../components/ContactStatus";
import PreferredContactMethod from "../../../components/PreferredContactMethod";
import StateAbbreviation from "../../../components/StateAbbreviation";
import InsuranceNeeds from "../../../components/InsuranceNeeds";

const ITEMS_PER_PAGE = 8;

const fetcher = async (url) => {
  const res = await fetch(url, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }
  return res.json();
};

export default function Signin() {
  const { data: session, status } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const { data: contacts, error, mutate } = useSWR("/api/contacts", fetcher);

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        mutate(); // Revalidate the SWR cache
      } else {
        const errorData = await response.json();
        alert(`Failed to delete contact: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact");
    }
  };

  const editContact = (id) => {
    router.push(`/auth/editlead?id=${id}`);
  };

  const revalidateContacts = async () => {
    await mutate();
  };

  useEffect(() => {
    revalidateContacts();
  }, []);

  if (status === "loading" || !contacts) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading contacts: {error.message}</p>;
  }

  if (!session || !session.user.email) {
    return null;
  }

  const totalPages = Math.ceil(contacts.length / ITEMS_PER_PAGE);
  const paginatedContacts = contacts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-full">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name
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
            {paginatedContacts.map((contact, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">{contact.name}</div>
                    <div className="text-gray-400">{contact.occupation}</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <div className="text-gray-400">{contact.phone}</div>
                  <div className="text-gray-400">{contact.email}</div>
                  <PreferredContactMethod methods={contact.preferredContact} />
                </td>
                <ContactStatus level={contact.status} statusDate={contact.statusDate} />
                <td className="px-6 py-4">{contact.currentInsCo}</td>
                <StateAbbreviation state={contact.state} />
                <InsuranceNeeds needs={contact.needs} />
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button onClick={() => deleteContact(contact._id)}>
                      <TrashIcon className="h-6 w-6 text-gray-600 hover:text-red-600" />
                    </button>
                    <button onClick={() => editContact(contact._id)}>
                      <PencilIcon className="h-6 w-6 text-gray-600 hover:text-blue-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center">
          <div className="inline-flex border border-[#e4e4e4] bg-white p-4 rounded-xl mt-4">
            <ul className="flex items-center justify-center w-full">
              <li className="px-[6px]">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className="w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-blue"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li className="px-[6px]" key={index}>
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    className={`w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-blue ${
                      currentPage === index + 1 ? "text-gray-900 font-bold" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className="px-[6px]">
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className="w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-blue"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
