"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LeadForm from "../../../components/LeadForm";

function EditLeadComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [formData, setFormData] = useState(null);

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

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Contact updated successfully!");
        router.push("/auth/signin");
        return true;
      } else {
        alert("Failed to update contact");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update contact");
      return false;
    }
  };

  if (!formData) return <div>Loading...</div>;

  return <LeadForm initialFormData={formData} onSubmit={handleSubmit} buttonText="Save Changes" title="Edit Lead" />;
}

export default function EditLead() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditLeadComponent />
    </Suspense>
  );
}
