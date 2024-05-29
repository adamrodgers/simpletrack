import useSWR from "swr";

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
  const { data, error, mutate } = useSWR("/api/contacts", fetcher);
  return {
    contacts: data,
    error,
    revalidate: mutate,
  };
};
