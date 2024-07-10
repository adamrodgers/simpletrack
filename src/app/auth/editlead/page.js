"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LeadForm from "../../../components/LeadForm";
import { toast, Toaster } from "react-hot-toast";

function EditLeadComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
          setError("Failed to load contact data. Please try again.");
          toast.error("Failed to load contact data");
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchContact();
  }, [id]);

  const handleSubmit = async (formData) => {
    const updatePromise = fetch(`/api/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    toast.promise(updatePromise, {
      loading: "Updating contact...",
      success: (response) => {
        if (response.ok) {
          router.push("/auth/signin");
          return "Contact updated successfully!";
        } else {
          throw new Error("Failed to update contact");
        }
      },
      error: "Failed to update contact",
    });

    try {
      const response = await updatePromise;
      return response.ok;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!formData) return <div>No contact data found</div>;

  return <LeadForm initialFormData={formData} onSubmit={handleSubmit} buttonText="Save Changes" title="Edit Lead" />;
}

export default function EditLead() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={<div>Loading...</div>}>
        <EditLeadComponent />
      </Suspense>
    </>
  );
}
