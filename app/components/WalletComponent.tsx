"use client";

import { useAccount } from "wagmi";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownFundLink,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";

export default function WalletComponent() {
  const { address, isConnected } = useAccount(); // ✅ 獲取當前連接的錢包地址

  return (
    <Wallet>
      {/* 錢包連接按鈕 */}
      <ConnectWallet>
        {isConnected ? (
          <>
            <Avatar address={address} className="h-6 w-6" />{" "}
            {/* ✅ 傳入 address */}
            <Name address={address} /> {/* ✅ 傳入 address */}
          </>
        ) : (
          <span>Connect Wallet</span>
        )}
      </ConnectWallet>

      {/* 錢包下拉選單 */}
      {isConnected && (
        <WalletDropdown>
          <Identity
            address={address}
            className="px-4 pt-3 pb-2"
            hasCopyAddressOnClick
          >
            <Avatar address={address} />
            <Name address={address} />
            <Address address={address} />
            <EthBalance address={address} />
          </Identity>

          <WalletDropdownLink href="/dashboard">
            My Dashboard
          </WalletDropdownLink>
          {/* 預設的 Dropdown 結構 */}
          <WalletDropdownBasename />

          {/* 額外連結：跳轉至 Coinbase Wallet */}
          <WalletDropdownLink icon="wallet" href="https://keys.coinbase.com">
            Wallet
          </WalletDropdownLink>

          {/* 錢包充值按鈕 */}
          <WalletDropdownFundLink />

          {/* 斷開連接按鈕 */}
          <WalletDropdownDisconnect />
        </WalletDropdown>
      )}
    </Wallet>
  );
}
