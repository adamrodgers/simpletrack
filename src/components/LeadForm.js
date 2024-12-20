"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import FormInput from "./table/FormInput";
import { validateForm } from "../utils/validationUtil";

const INITIAL_FORM_DATA = {
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
  notes: "",
};

const LeadForm = ({ initialFormData = INITIAL_FORM_DATA, onSubmit, buttonText, title }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [insuranceNeeds, setInsuranceNeeds] = useState([]);
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const fetchInsuranceNeeds = async () => {
      try {
        const response = await fetch("/api/insurable-items");
        const data = await response.json();
        setInsuranceNeeds(data.map((item) => item.name));
      } catch (error) {
        console.error("Error fetching insurance needs:", error);
      }
    };

    fetchInsuranceNeeds();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "status" && { statusDate: new Date().toISOString().slice(0, 10) }),
    }));
  }, []);

  const handleCheckChange = useCallback((e, field) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: checked ? [...prev[field], value] : prev[field].filter((item) => item !== value),
    }));
  }, []);

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

  const handlePhoneChange = useCallback((e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formattedPhoneNumber }));
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setIsProcessing(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result.split(",")[1];

        const response = await fetch("/api/google-vision", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64 }),
        });

        if (!response.ok) {
          throw new Error("Failed to process image");
        }

        const { extractedText } = await response.json();
        console.log("Extracted Text:", extractedText);

        const extractedData = parseExtractedText(extractedText);
        setFormData((prev) => ({ ...prev, ...extractedData }));
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const parseExtractedText = (text) => {
    // Basic example for parsing extracted text
    const lines = text.split("\n");
    const data = {
      name: "",
      email: "",
      phone: "",
      currentInsCo: "",
      state: "",
    };

    lines.forEach((line) => {
      if (line.toLowerCase().includes("name:")) data.name = line.split(":")[1]?.trim() || "";
      if (line.toLowerCase().includes("email:")) data.email = line.split(":")[1]?.trim() || "";
      if (line.toLowerCase().includes("phone:")) data.phone = line.split(":")[1]?.trim() || "";
      if (line.toLowerCase().includes("insurance:")) data.currentInsCo = line.split(":")[1]?.trim() || "";
      if (line.toLowerCase().includes("state:")) data.state = line.split(":")[1]?.trim() || "";
    });

    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      const success = await onSubmit(formData);
      if (success) {
        router.push("/auth/signin");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleCancel = () => {
    router.push("/auth/signin");
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">{title}</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
            <FormInput label="Occupation" name="occupation" value={formData.occupation} onChange={handleChange} error={errors.occupation} />
            <FormInput label="Email" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
            <FormInput label="Phone" type="tel" name="phone" value={formData.phone} onChange={handlePhoneChange} error={errors.phone} />
            <div>
              <label className="block text-gray-700">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border rounded-md text-gray-900 focus:ring focus:ring-blue-200">
                <option value="initial">Initial</option>
                <option value="pending">Pending</option>
                <option value="followedUp">Followed Up</option>
                <option value="quoted">Quoted</option>
                <option value="client">Client</option>
                <option value="notInterested">Not Interested</option>
              </select>
            </div>
            <FormInput label="Status Date" type="date" name="statusDate" value={formData.statusDate} onChange={handleChange} error={errors.statusDate} />
            <FormInput label="Current Insurance Company" name="currentInsCo" value={formData.currentInsCo} onChange={handleChange} error={errors.currentInsCo} />
            <FormInput label="State" name="state" value={formData.state} onChange={handleChange} error={errors.state} />
          </div>
          <div>
            <label className="block text-gray-700">Insurance Needs</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {insuranceNeeds.map((need) => (
                <label key={need} className="flex items-center text-gray-900">
                  <input type="checkbox" value={need} checked={formData.needs.includes(need)} onChange={(e) => handleCheckChange(e, "needs")} className="mr-2 focus:ring focus:ring-blue-200" />
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
                  <input
                    type="checkbox"
                    value={method}
                    checked={formData.preferredContact.includes(method)}
                    onChange={(e) => handleCheckChange(e, "preferredContact")}
                    className="mr-2 focus:ring focus:ring-blue-200"
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Upload Lead Form</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full px-4 py-2 border rounded-md text-gray-900 focus:ring focus:ring-blue-200" />
            {image && <img src={image} alt="Uploaded" className="mt-4 max-w-full h-auto rounded-md shadow-md" />}
            {isProcessing && <p className="text-blue-500 mt-2">Processing image...</p>}
          </div>
          <div>
            <label className="block text-gray-700">Notes</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} className="w-full px-4 py-2 border rounded-md text-gray-900 focus:ring focus:ring-blue-200" rows="4" />
          </div>
          <button type="submit" className="w-full bg-gray-700 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200">
            {buttonText}
          </button>
          <button type="button" onClick={handleCancel} className="w-full mt-4 bg-gray-700 text-white px-4 py-2 rounded-md shadow hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-200">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
