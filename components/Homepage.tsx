import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Animation from "@/components/Animation";
import Airdrop from "@/components/Airdrop";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";
import { Connection, PublicKey } from "@solana/web3.js";

const Homepage = () => {
  const { connect, connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

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

  const presale = async () => {
    if (!publicKey) {
      console.log("Wallet not connected");
      return;
    }

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey("HwRKDdwTqkS4fnWSqwP34BhF7FrPzoNx3ZmBzus9j8hP"),
        lamports: 0.5 * LAMPORTS_PER_SOL,
      })
    );

    try {
      const signature = await sendTransaction(transaction, connection);
      const confirmation = await connection.confirmTransaction(
        signature,
        "processed"
      );
      console.log("Transaction confirmed", confirmation);
      setJackpotMode(true);
      alert("you rock! updot presale confirmed.");
    } catch (error) {
      console.error("Transaction failed", error);
    }
  };
  useEffect(() => {
    console.log("Wallet connected status:", connected);
  }, [connected]);

  return (
    <>
      <div className="relative flex h-screen w-full overflow-hidden">
        {/* Animation background */}
        <div className="absolute inset-0 z-0">
          <Animation
            jackpotMode={jackpotMode}
            setJackpotMode={setJackpotMode}
          />
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
            {(buttonClicked && (
              <div className="flex flex-col items-center">
                <p className="text-[16px] font-bold mb-2">going up 3/20</p>
                {(connected && (
                  <button
                    onClick={presale}
                    className="text-[20px] font-bold mb-2 cursor-pointer bg-black/50 hover:bg-green-500 w-full px-4 py-2"
                  >
                    get presale
                  </button>
                )) || <WalletMultiButton />}
              </div>
            )) || (
              <button
                className="text-[20px] font-bold cursor-pointer hover:opacity-80 "
                onClick={goUp}
              >
                make go up
              </button>
            )}
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
    </>
  );
};

export default Homepage;
