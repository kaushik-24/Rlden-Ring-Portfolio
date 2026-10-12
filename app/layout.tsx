import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dark Souls Portfolio",
  description: "Portfolio forged in code, reborn in design",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0a0808", color: "#c0b090" }}>{children}</body>
    </html>
  );
}
