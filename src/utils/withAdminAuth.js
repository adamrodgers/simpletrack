"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAdminAuth = (WrappedComponent) => {
  return (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "authenticated" && !session?.user?.isAdmin) {
        router.push("/auth/signin");
      }
    }, [status, session, router]);

    if (status === "loading") {
      return <p>Loading...</p>;
    }

    if (!session?.user?.isAdmin) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
