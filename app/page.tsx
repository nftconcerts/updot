"use client";
import { useState, useRef, useEffect } from "react";
import { WalletConnectionProvider } from "@/components/WalletContext";
import Homepage from "@/components/Homepage";

export default function Home() {
  useEffect(() => {
    function adjustVH() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    adjustVH();
    window.addEventListener("resize", adjustVH);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", adjustVH);
  });

  return (
    <WalletConnectionProvider>
      <Homepage />
    </WalletConnectionProvider>
  );
}
