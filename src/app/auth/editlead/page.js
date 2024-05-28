"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function EditLeadComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    name: "",
    occupation: "",
    email: "",
    phone: "",
    status: "initial",
    statusDate: new Date().toISOString().slice(0, 10),
    currentInsCo: "",
    state: "",
    needs: [],
    preferredContact: [],
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchContact() {
      if (id) {
        try {
          const res = await fetch(`/api/contacts/${id}`);
          if (!res.ok) {
            throw new Error("Failed to fetch contact data");
          }
          const data = await res.json();
          setFormData(data);
        } catch (error) {
          console.error("Error fetching contact:", error);
        }
      }
    }

    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNeedsChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      needs: checked ? [...prev.needs, value] : prev.needs.filter((need) => need !== value),
    }));
  };

  const handlePreferredContactChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      preferredContact: checked ? [...prev.preferredContact, value] : prev.preferredContact.filter((method) => method !== value),
    }));
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;

    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({
      ...prev,
      phone: formattedPhoneNumber,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Contact updated successfully!");
        router.push("/auth/signin");
      } else {
        alert("Failed to update contact");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update contact");
    }
  };

  const handleCancel = () => {
    router.push("/auth/signin");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Edit Lead</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-md text-gray-900 focus:ring focus:ring-blue-200" required />
            </div>
            <div>
              <label className="block text-gray-700">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-900 focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md text-gray-900 focus:ring focus:ring-blue-200" required />
            </div>
            <div>
              <label className="block text-gray-700">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handlePhoneChange} className="w-full px-4 py-2 border rounded-md text-gray-900 focus:ring focus:ring-blue-200" required />
            </div>
            <div>
              <label className="block text-gray-700">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border rounded-md text-gray-900 focus:ring focus:ring-blue-200" required>
                <option value="initial">Initial</option>
                <option value="pending">Pending</option>
                <option value="followedUp">Followed Up</option>
                <option value="quoted">Quoted</option>
                <option value="client">Client</option>
                <option value="notInterested">Not Interested</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Status Date</label>
              <input
                type="date"
                name="statusDate"
                value={formData.statusDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-900 focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Current Insurance Company</label>
              <input
                type="text"
                name="currentInsCo"
                value={formData.currentInsCo}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-900 focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">State</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-2 border rounded-md text-gray-900 focus:ring focus:ring-blue-200" required />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Insurance Needs</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {["Auto", "Home", "Boat", "Life", "Renters", "Pet", "Umbrella", "Business", "Earth Quake", "Flood", "Motorcycle", "RV"].map((need) => (
                <label key={need} className="flex items-center text-gray-900">
                  <input type="checkbox" value={need} checked={formData.needs.includes(need)} onChange={handleNeedsChange} className="mr-2 focus:ring focus:ring-blue-200" />
                  {need}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Preferred Contact Method</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Phone", "Email", "Text"].map((method) => (
                <label key={method} className="flex items-center text-gray-900">
                  <input type="checkbox" value={method} checked={formData.preferredContact.includes(method)} onChange={handlePreferredContactChange} className="mr-2 focus:ring focus:ring-blue-200" />
                  {method}
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="w-full bg-gray-700 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200">
            Save Changes
          </button>
          <button type="button" onClick={handleCancel} className="w-full mt-4 bg-gray-700 text-white px-4 py-2 rounded-md shadow hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-200">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default function EditLead() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditLeadComponent />
    </Suspense>
  );
}
