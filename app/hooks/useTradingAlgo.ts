"use client";

import { useState, useEffect } from "react";
import { BrowserProvider, Contract, parseEther } from "ethers";
import tradingAlgoArtifact from "../abis/TradingAlgoAVS.json";
const tradingAlgoABI = tradingAlgoArtifact.abi;
import { useAccount } from "wagmi";

const CONTRACT_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

export function useTradingAlgo() {
  const { address, isConnected } = useAccount();
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);

  // 初始化 Provider 和 Contract
  useEffect(() => {
    if (typeof window !== "undefined" && isConnected && window.ethereum) {
      const _provider = new BrowserProvider(window.ethereum);
      setProvider(_provider);
      _provider.getSigner().then((signer) => {
        const _contract = new Contract(
          CONTRACT_ADDRESS,
          tradingAlgoABI,
          signer
        );
        setContract(_contract);
      });
    }
  }, [isConnected]);

  // 🔹 1️⃣ 先把策略上傳到後端
  const uploadStrategy = async (file: File): Promise<string | null> => {
    try {
      // const formData = new FormData();
      // formData.append("strategy", file);

      // const res = await fetch("/api/upload-strategy", {
      //   method: "POST",
      //   body: formData,
      // });

      // if (!res.ok) {
      //   throw new Error("Failed to upload strategy");
      // }

      // const data = await res.json();
      // for demo purpose, return a fake strategy_uid
      return "123";
      // return data.strategy_uid; // 後端回傳的 strategy_uid
    } catch (error) {
      console.error("❌ Error uploading strategy:", error);
      return null;
    }
  };

  // 🔹 2️⃣ 創建策略到區塊鏈
  const createStrategy = async (
    strategyUid: string,
    subscriptionFee: number,
    subscriptionPeriod: string,
    roi: number,
    profitability: number,
    risk: number
  ) => {
    if (!contract) {
      console.error("❌ No contract found!");
      return;
    }

    try {
      const feeInWei = parseEther(subscriptionFee.toString()); // 轉換為 ETH（假設是以 ETH 為單位）

      const tx = await contract.createStrategy(
        strategyUid,
        feeInWei,
        subscriptionPeriod,
        roi,
        profitability,
        risk
      );

      await tx.wait();
      console.log("✅ Strategy Created on Blockchain!");
    } catch (error) {
      console.error("❌ Error creating strategy:", error);
    }
  };

  const getAllStrategies = async () => {
    if (!contract) {
      console.error("❌ No contract found!");
      return [];
    }

    try {
      const strategies = await contract.getAllStrategies();
      return strategies.map(
        (s: {
          id: number;
          provider: string;
          subscriptionFee: number;
          subscriptionPeriod: string;
          strategyUid: string;
          roi: number;
          profitability: number;
          risk: number;
          active: boolean;
        }) => ({
          id: s.id.toString(),
          provider: s.provider,
          subscriptionFee: s.subscriptionFee.toString(),
          subscriptionPeriod: s.subscriptionPeriod,
          strategyUid: s.strategyUid,
          roi: s.roi.toString(),
          profitability: s.profitability.toString(),
          risk: s.risk.toString(),
          active: s.active,
        })
      );
    } catch (error) {
      console.error("❌ Error fetching strategies:", error);
      return [];
    }
  };

  return { uploadStrategy, createStrategy, getAllStrategies };
}
