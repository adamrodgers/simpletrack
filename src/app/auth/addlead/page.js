"use client";

import { useSession } from "next-auth/react";
import LeadForm from "../../../components/LeadForm";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

export default function AddLead() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch("/api/contacts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId: session.user.id }),
      });

      if (response.ok) {
        toast.success("Contact added successfully!");
        return true;
      } else {
        toast.error("Failed to add contact");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add contact");
      return false;
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <LeadForm onSubmit={handleSubmit} buttonText="Add Lead" title="Add New Lead" />
    </>
  );
}
