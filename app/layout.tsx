import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "updot",
  description: "make dot go up. it fun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <title>updot</title>
        <meta name="description" content="make dot go up. it fun." />
        <meta property="og:title" content="updot" />
        <meta property="og:description" content="make dot go up. it fun" />
        <meta
          property="og:image"
          content="https://updotsol.com/updot-share.jpg"
        />
        <meta name="twitter:title" content="updot" />
        <meta name="twitter:description" content="make dot go up. it fun" />
        <meta
          name="twitter:image"
          content="https://updotsol.com/updot-share.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <html lang="en">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover useer-scalable=no"
          />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </>
  );
}
