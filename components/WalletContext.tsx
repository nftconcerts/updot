import React from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");

const network = WalletAdapterNetwork.Devnet; // Change to 'Mainnet' in production

type Props = {
  children: React.ReactNode;
};
// Using React.FC to automatically include children with proper typing
export const WalletConnectionProvider = ({ children }: Props) => {
  // Setup wallets
  const wallets = React.useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint="https://silent-stylish-dream.solana-mainnet.quiknode.pro/8f3e8ca23f7fd756980c09074536ffb687536131/">
      {" "}
      {/* Use appropriate endpoint */}
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
