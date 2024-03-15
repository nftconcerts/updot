import Link from "next/link";
import React, { useState } from "react";

function isValidSolanaAddress(address: string) {
  if (!address || address.length < 32 || address.length > 44) {
    return false;
  }

  // Base58 character set for validation
  const base58Chars =
    "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

  // Check each character of the address
  for (let i = 0; i < address.length; i++) {
    if (!base58Chars.includes(address[i])) {
      return false; // Contains an invalid character
    }
  }

  return true; // All checks passed
}

const Airdrop = () => {
  const [confirmed, setConfirmed] = useState(0);
  const [wallet, setWallet] = useState("");
  const [tweet, setTweet] = useState("");

  const share = async () => {
    // ga.event({
    //   action: "share",
    //   params: {
    //     user: userData.uid,
    //   },
    // });
    const shareData = {
      title: "updot - make dot go up. it fun.",
      url: `https://updotsol.com`,
      text: `make the dot go up!`,
      image: "https://updotsol.com/updot-share.jpg",
    };
    if (navigator["share"]) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      //copy to clipboard
      navigator.clipboard.writeText("https://goupdot.com");
      alert("Share URL Copied to Clipboard!");
    }
  };

  const submit = async (e: any) => {
    e.preventDefault();
    if (!tweet.startsWith("https://twitter.com")) {
      alert("Invalid tweet link - use https://twitter.com/... link");
      return;
    }
    if (!isValidSolanaAddress(wallet)) {
      alert(
        "Invalid solana wallet address - .sol names not supported yet. copy full solana address."
      );
      return;
    }
    setConfirmed(1);
    try {
      const response = await fetch("/api/airdrop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tweet: tweet,
          wallet: wallet,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setConfirmed(2);
      } else {
        alert("error with submission. please try again later.");
      }
    } catch (error) {
      alert("error with submission. please try again later.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4">
      {confirmed === 0 && (
        <div className="flex flex-col w-full items-center text-center">
          <p className="pt-6 flex w-full justify-center text-center">
            share tweet = free updot
          </p>
          <div className="flex w-full justify-center">
            <Link
              href="https://twitter.com/intent/tweet?text=i%20made%20%24updot%20go%20up%0A%0Ait%20was%20fun.%20thanks%20%40updotsol%0A%0Ahttps%3A%2F%2Fupdotsol.com"
              className="w-full"
              target="_blank"
              rel="noreferrer"
            >
              <button className="mt-4 p-2 border-2 mb-4 border-green-500 text-green-500 w-full hover:bg-green-700/20 transition-all cursor-pointer">
                tweet $updot
              </button>
            </Link>
          </div>
          <form
            className="w-full flex flex-col items-center text-center"
            onSubmit={submit}
          >
            <input
              type="text"
              placeholder="link to tweet"
              className="p-2 w-full text-[#222]"
              onChange={(e) => setTweet(e.target.value)}
            />
            <input
              type="text"
              placeholder="wallet address"
              className="mt-4 p-2 w-full text-[#222]"
              onChange={(e) => setWallet(e.target.value)}
            />
            <input
              type="submit"
              value="claim $updot"
              className="mt-4 p-2 bg-[#111] w-full hover:bg-green-700 transition-all cursor-pointer"
            />
          </form>
        </div>
      )}
      {confirmed == 1 && (
        <p className="pt-6 animate-pulse">submitting airdrop...</p>
      )}
      {confirmed == 2 && (
        <div className="flex flex-col w-full text-center items-center">
          <p className="pt-6">airdrop submission confirmed</p>
          <p className="pt-6">dropping 4/1/24</p>
          <p className="pt-6">more views = more updot</p>
          <button
            className="mt-4 mb-4 p-2 bg-[#111] w-full hover:bg-green-700 transition-all cursor-pointer"
            onClick={share}
          >
            {" "}
            share
          </button>
        </div>
      )}
    </div>
  );
};

export default Airdrop;
