// import {
//   Connection,
//   PublicKey,
//   SystemProgram,
//   Transaction,
//   sendAndConfirmTransaction,
// } from "@solana/web3.js";

// // Helper function to detect the Solana wallet provider
// const getWalletProvider = () => {
//   if ("solana" in window) {
//     const provider = (window as any).solana;
//     if (provider.isPhantom) {
//       return provider;
//     }
//   }
//   throw new Error("No Solana wallet provider found");
// };

// // Helper function to validate the target wallet address
// const validateWalletAddress = (address: string) => {
//   try {
//     const publicKey = new PublicKey(address);
//     return publicKey;
//   } catch (error) {
//     throw new Error("Invalid wallet address");
//   }
// };

// export const connectWallet = async () => {
//   try {
//     const provider = getWalletProvider();
//     const { publicKey } = await provider.connect({ onlyIfTrusted: true });
//     return publicKey;
//   } catch (error) {
//     if (error.message === "User rejected the request") {
//       console.error("Wallet connection rejected by user");
//       // Optionally, you can display a user-friendly message or take appropriate action
//     } else {
//       console.error("Error connecting to wallet:", error);
//       throw error;
//     }
//   }
// };

// export const sendSwapTransaction = async (
//   publicKey: PublicKey,
//   connection: Connection,
//   targetWalletAddress: string,
//   amount: number
// ) => {
//   try {
//     const targetPublicKey = validateWalletAddress(targetWalletAddress);

//     const transaction = new Transaction().add(
//       SystemProgram.transfer({
//         fromPubkey: publicKey,
//         toPubkey: targetPublicKey,
//         lamports: amount,
//       })
//     );

//     const { blockhash } = await connection.getRecentBlockhash();
//     transaction.recentBlockhash = blockhash;
//     transaction.feePayer = publicKey;

//     const signed = await (window as any).solana.signTransaction(transaction);
//     const txid = await sendAndConfirmTransaction(connection, signed, [], {
//       commitment: "confirmed",
//     });

//     console.log("Transaction ID:", txid);
//     return txid;
//   } catch (error) {
//     console.error("Error sending transaction:", error);
//     throw error;
//   }
// };
