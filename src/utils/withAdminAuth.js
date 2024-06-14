"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAdminAuth = (WrappedComponent) => {
  const Component = (props) => {
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

  Component.displayName = `withAdminAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return Component;
};

export default withAdminAuth;
