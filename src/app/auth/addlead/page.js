"use client";

import { useSession } from "next-auth/react";
import LeadForm from "../../../components/LeadForm";

export default function AddLead() {
  const { data: session } = useSession();

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch("/api/contacts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId: session.user.id }),
      });

      if (response.ok) {
        alert("Contact added successfully!");
      } else {
        alert("Failed to add contact");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add contact");
    }
  };

  return <LeadForm onSubmit={handleSubmit} buttonText="Add Lead" title="Add New Lead" />;
}
