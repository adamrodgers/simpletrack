"use client";

import { useState, useCallback } from "react";
import Tesseract from "tesseract.js";

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

const LeadForm = ({ initialFormData = INITIAL_FORM_DATA, onSubmit, buttonText, title }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setIsProcessing(true);

    try {
      const { data } = await Tesseract.recognize(file, "eng");
      const text = data.text;

      // Parse extracted text
      const extractedData = parseExtractedText(text);
      setFormData((prev) => ({ ...prev, ...extractedData }));
    } catch (error) {
      console.error("Error with OCR:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const parseExtractedText = (text) => {
    const lines = text.split("\n").map((line) => line.trim());
    return {
      name:
        lines
          .find((line) => line.toLowerCase().includes("name"))
          ?.split(":")[1]
          ?.trim() || "",
      email:
        lines
          .find((line) => line.toLowerCase().includes("email"))
          ?.split(":")[1]
          ?.trim() || "",
      phone:
        lines
          .find((line) => line.toLowerCase().includes("phone"))
          ?.split(":")[1]
          ?.trim() || "",
      address:
        lines
          .find((line) => line.toLowerCase().includes("address"))
          ?.split(":")[1]
          ?.trim() || "",
      city:
        lines
          .find((line) => line.toLowerCase().includes("city"))
          ?.split(":")[1]
          ?.trim() || "",
      state:
        lines
          .find((line) => line.toLowerCase().includes("state"))
          ?.split(":")[1]
          ?.trim() || "",
      zip:
        lines
          .find((line) => line.toLowerCase().includes("zip"))
          ?.split(":")[1]
          ?.trim() || "",
    };
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {}; // Add validation logic here if necessary
    if (Object.keys(validationErrors).length === 0) {
      const success = await onSubmit(formData);
      if (success) {
        setFormData(INITIAL_FORM_DATA); // Reset form after successful submission
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {isProcessing && <p>Processing image...</p>}
          {image && <image src={image} alt="Uploaded Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}
        </div>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div>
          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div>
          <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </div>
        <div>
          <label>State</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} />
        </div>
        <div>
          <label>ZIP</label>
          <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
        </div>
        <button type="submit">{buttonText}</button>
      </form>
    </div>
  );
};

export default LeadForm;
