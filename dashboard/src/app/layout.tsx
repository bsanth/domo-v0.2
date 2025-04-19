"use client";

import { Roboto_Mono } from "next/font/google";
import ThemeProvider from "@/theme/ThemeProvider";
import "@fontsource/roboto-mono/300.css";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/roboto-mono/500.css";
import "@fontsource/roboto-mono/700.css";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Domo Dashboard</title>
        <meta name="description" content="Dashboard for Domo system" />
      </head>
      <body className={robotoMono.variable}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
