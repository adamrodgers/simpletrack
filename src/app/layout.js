"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import NavBar from "../components/NavBar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div className="flex h-screen">
            <NavBar />
            <div className="flex-1 overflow-auto">{children}</div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
