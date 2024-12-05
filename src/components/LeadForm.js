"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import FormInput from "./table/FormInput";
import { validateForm } from "../utils/validationUtil";
import callGoogleVision from "../utils/googleVision"; // Import Google Vision logic

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

  useEffect(() => {
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
      // Read the file as base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result.split(",")[1];

        // Call Google Vision API
        const extractedText = await callGoogleVision(base64);
        console.log("Extracted Text:", extractedText);

        // Parse the extracted text
        const extractedData = parseExtractedText(extractedText);
        console.log("Parsed Data:", extractedData);

        // Update form data
        setFormData((prev) => ({ ...prev, ...extractedData }));
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error with Google Vision OCR:", error);
    } finally {
      setIsProcessing(false);
    }
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

  const parseExtractedText = (text) => {
    // Implement a robust logic to parse text and extract relevant fields
    const data = {
      name: "",
      email: "",
      phone: "",
      currentInsCo: "",
      state: "",
    };

    // Add regex-based parsing for handwritten and structured content
    return data;
  };

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
            <FormInput label="Current Insurance Company" name="currentInsCo" value={formData.currentInsCo} onChange={handleChange} error={errors.currentInsCo} />
            <FormInput label="State" name="state" value={formData.state} onChange={handleChange} error={errors.state} />
            <div>
              <label className="block text-gray-700">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-600 hover:file:bg-gray-200"
              />
              {isProcessing && <p className="text-gray-500 text-sm mt-2">Processing image...</p>}
              {image && (
                <div className="mt-4 w-32 h-32 relative">
                  <img src={image} alt="Uploaded Preview" className="border rounded-md" />
                </div>
              )}
            </div>
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
