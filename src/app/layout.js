"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NavBar from "../components/NavBar";
import SessionChecker from "../components/SessionChecker";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <SessionChecker>
            <div className="flex h-screen">
              <NavBar />
              <div className="flex-1 overflow-auto">{children}</div>
            </div>
          </SessionChecker>
        </SessionProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
