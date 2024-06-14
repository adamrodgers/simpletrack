"use client";

import withAdminAuth from "../../../utils/withAdminAuth";

const AdminPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-700">Admin Page</h1>
      <p className="text-gray-500">This is a placeholder for the Admin Page.</p>
    </div>
  );
};

export default withAdminAuth(AdminPage);
