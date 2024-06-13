"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import NavBar from "../components/NavBar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../utils/fontawesome";

config.autoAddCss = false;

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
