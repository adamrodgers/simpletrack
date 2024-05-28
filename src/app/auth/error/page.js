"use client";

import { signOut } from "next-auth/react";

export default function Error() {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center justify-between bg-white p-8 rounded shadow-lg space-x-8 max-w-lg">
        <h1 className="text-xl font-medium text-black text-center">You are not authorized to view this page.</h1>
        <div className="border-l-2 border-gray-300 h-12"></div>
        <button onClick={handleSignOut}>Sign out</button>
        <button className="gsi-material-button" onClick={handleSignOut}>
          <div className="gsi-material-button-state"></div>
          <div className="gsi-material-button-content-wrapper">
            <span className="gsi-material-button-contents">Sign out</span>
            <span style={{ display: "none" }}>Sign out</span>
          </div>
        </button>
      </div>
    </div>
  );
}
