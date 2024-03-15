"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Animation from "@/components/Animation";
import Link from "next/link";
import Airdrop from "@/components/Airdrop";
import { Connection, PublicKey } from "@solana/web3.js";
// import { connectWallet, sendSwapTransaction } from "@/lib/solana";

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
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);

  // Explicitly define the ref type as HTMLAudioElement | null
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    // Since we've now correctly typed the ref, TypeScript knows that .play() is a valid method
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    }
  };
  const [showInfo, setShowInfo] = useState(false);
  const [showAirdrop, setShowAirdrop] = useState(false);

  const [jackpotMode, setJackpotMode] = useState(false);

  // Function to handle background click
  const handleBackgroundClick = () => {
    setShowInfo(false);
    setShowAirdrop(false);
  };

  // Function to stop event propagation
  const handlePopupClick = (event: any) => {
    event.stopPropagation();
  };

  const connection = new Connection("https://api.devnet.solana.com");
  const targetWalletAddress = "YOUR_TARGET_WALLET_ADDRESS";
  const amountToTransfer = 100000000; //.1 in sol

  const [buttonClicked, setButtonClicked] = useState(false);

  const goUp = async () => {
    try {
      // const publicKey = await connectWallet();
      // const txid = await sendSwapTransaction(
      //   publicKey,
      //   connection,
      //   targetWalletAddress,
      //   amountToTransfer
      // );
      // console.log("Transaction ID:", txid);
      // if (txid) {

      // }
      playAudio();
      setJackpotMode(true);
      setButtonClicked(true);
    } catch (error) {
      alert("accept transaction to make updot go up");
    }
  };

  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      {/* Animation background */}
      <div className="absolute inset-0 z-0">
        <Animation jackpotMode={jackpotMode} setJackpotMode={setJackpotMode} />
      </div>

      {/* Content on top */}
      <div className="relative flex flex-col items-center justify-between w-full z-10">
        <div className="flex w-full justify-between px-4 py-2">
          <h1
            className="text-[55px] font-bold cursor-pointer hover:opacity-80"
            onClick={() => setShowInfo(!showInfo)}
          >
            updot
          </h1>
          {}
          <button
            className="text-[20px] font-bold cursor-pointer hover:opacity-80 "
            onClick={goUp}
          >
            {(buttonClicked && "going up 3/20") || "make go up"}
          </button>
          {/* Hidden audio element */}
          <audio ref={audioRef} src="jackpot.mp3" preload="auto" />
        </div>
        <div className="flex w-full justify-between px-4 py-2">
          <button
            className="text-[20px] font-bold cursor-pointer hover:opacity-80"
            onClick={() => setShowAirdrop(!showAirdrop)}
          >
            get free
          </button>
          <Link
            href="https://onlinetherapy.go2cloud.org/aff_c?offer_id=2&aff_id=3546&source=updot"
            target="_blank"
            rel="noreferrer"
          >
            <button className="text-[20px] font-bold cursor-pointer hover:opacity-80">
              make go down
            </button>
          </Link>
        </div>
      </div>
      {showInfo && (
        <div
          className="absolute inset-0 z-20 bg-[#00000080] flex justify-center items-center p-4"
          onClick={handleBackgroundClick}
        >
          <div
            className="w-full max-w-[350px] flex flex-col items-center justify-start bg-gray-800/80 p-4"
            onClick={handlePopupClick}
          >
            <h1>updot</h1>
            <p className="pt-6">make dot go up. it fun.</p>
            <div className="w-full justify-center flex">
              <Link
                href="https://twitter.com/updotsol"
                target="_blank"
                rel="noreferrer"
              >
                <p className="p-6 text-green-600">tweeter</p>
              </Link>
              <Link
                href="https://dexscreener.com/solana?rankBy=liquidity&order=desc&maxAge=1"
                target="_blank"
                rel="noreferrer"
              >
                <p className="p-6 text-blue-800">dexscreener</p>
              </Link>
            </div>
          </div>
        </div>
      )}
      {showAirdrop && (
        <div
          className="absolute inset-0 z-20 bg-[#00000080] flex justify-center items-center p-4"
          onClick={handleBackgroundClick}
        >
          <div
            className="w-full max-w-[350px] flex flex-col items-center justify-start bg-gray-800/80 p-4"
            onClick={handlePopupClick}
          >
            <Airdrop />
          </div>
        </div>
      )}
    </div>
  );
}
