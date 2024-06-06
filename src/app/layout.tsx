import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Drawing App",
  description: "A simple drawing application using Next.js and react-konva.",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
