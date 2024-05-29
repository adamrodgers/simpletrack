import useSWR from "swr";
import { useSession } from "next-auth/react";

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

export const useContacts = () => {
  const { data: session } = useSession();
  const { data, error, mutate } = useSWR(session ? `/api/contacts?userId=${session.user.id}` : null, fetcher);

  return {
    contacts: data,
    error,
    revalidate: mutate,
  };
};
