"use client";

import { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import tradingAlgoArtifact from "../abis/TradingAlgoAVS.json";
const tradingAlgoABI = tradingAlgoArtifact.abi;
import { useAccount } from "wagmi";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export function useTradingAlgo() {
  const { isConnected } = useAccount();
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [isContractReady, setIsContractReady] = useState(false);

  // 初始化 Provider 和 Contract
  useEffect(() => {
    const initContract = async () => {
      if (
        typeof window !== "undefined" &&
        isConnected &&
        window.ethereum &&
        CONTRACT_ADDRESS
      ) {
        try {
          const _provider = new BrowserProvider(window.ethereum);
          const signer = await _provider.getSigner();
          const _contract = new Contract(
            CONTRACT_ADDRESS,
            tradingAlgoABI,
            signer
          );
          setProvider(_provider);
          setContract(_contract);
          setIsContractReady(true);
        } catch (error) {
          console.error("Contract initialization error:", error);
          setIsContractReady(false);
        }
      }
    };

    initContract();
  }, [isConnected]);

  // 🔹 1️⃣ 先把策略上傳到後端
  const uploadStrategy = async (
    file: File,
    strategy_name: string,
    strategy_provider: string,
    strategy_type: string,
    roi: number,
    profitability: number,
    risk: number
  ): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("strategy_code", file);
      formData.append("strategy_name", strategy_name);
      formData.append("strategy_provider", strategy_provider);
      formData.append("strategy_type", strategy_type);
      formData.append("roi", roi.toString());
      formData.append("profitability", profitability.toString());
      formData.append("risk", risk.toString());

      const res = await fetch(`${NEXT_PUBLIC_API_URL}/strategies`, {
        method: "POST",
        body: formData,
      });

      console.log("res", res);

      if (!res.ok) {
        throw new Error("Failed to upload strategy");
      }
      const data = await res.json();
      // Return the strategy_uid from backend response
      return data.ids[0];
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
      const tx = await contract.createStrategy(
        strategyUid,
        subscriptionFee,
        subscriptionPeriod,
        roi,
        profitability,
        risk
      );

      await tx.wait();
      console.log("✅ Strategy Created on Blockchain!");
    } catch (error) {
      console.error("❌ Error creating strategy:", error);
      throw error;
    }
  };

  const getAllStrategies = async () => {
    if (!contract) {
      console.error("❌ No contract found!");
      return [];
    }

    try {
      // 🔹 Step 1: Fetch strategies from the smart contract
      const strategies = await contract.getAllStrategies();

      // 🔹 Step 2: Fetch additional details from backend API
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/strategies`);
      const backendData = await res.json();

      // 🔹 Step 3: Convert data and merge with backend info
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
          subscriberCount: number;
        }) => {
          const backendStrategy = backendData.find(
            (b: { _id: string; strategy_name: string }) =>
              b._id === s.strategyUid
          );

          return {
            id: s.id, // Smart contract ID
            uid: s.strategyUid, // Matches `_id` from backend
            owner: s.provider, // Wallet address
            name: backendStrategy?.strategy_name || "Cool Strategy", // Default if not found
            subscriptionFee: Number(s.subscriptionFee), // Convert BigNumber to number
            subscriberCount: Number(s.subscriberCount),
            subscriptionPeriod: s.subscriptionPeriod,
            profitability: Number(s.profitability),
            risk: Number(s.risk),
            ROI: Number(s.roi),

            // 🔹 Step 4: Calculate status dynamically
            // TODO: Refactor this logic into a separate function
            status:
              s.profitability > 30
                ? "High Profit"
                : s.risk > 7
                ? "High Risk"
                : s.subscriberCount > 1000
                ? "Most Popular"
                : "Stable",
          };
        }
      );
    } catch (error) {
      console.error("❌ Error fetching strategies:", error);
      return [];
    }
  };

  const getMyStrategies = async () => {
    if (!contract) {
      console.error("❌ No contract found!");
      return [];
    }

    try {
      // 🔹 Step 1: 從智能合約獲取當前用戶的策略
      const strategies = await contract.getMyStrategies();

      // 🔹 Step 2: 從後端 API 獲取額外的策略資訊
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/strategies`);
      const backendData = await res.json();

      // 🔹 Step 3: 將數據轉換並與後端資訊合併
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
          subscriberCount: number;
        }) => {
          const backendStrategy = backendData.find(
            (b: { _id: string; strategy_name: string }) =>
              b._id === s.strategyUid
          );

          return {
            id: s.id, // Smart contract ID
            uid: s.strategyUid, // Matches `_id` from backend
            owner: s.provider, // Wallet address
            name: backendStrategy?.strategy_name || "My Strategy", // 預設名稱
            subscriptionFee: Number(s.subscriptionFee), // 轉換 `BigNumber` 為 `number`
            subscriberCount: Number(s.subscriberCount),
            subscriptionPeriod: s.subscriptionPeriod,
            profitability: Number(s.profitability),
            risk: Number(s.risk),
            ROI: Number(s.roi),

            // 🔹 Step 4: 動態計算 `status`
            status:
              s.profitability > 30
                ? "High Profit"
                : s.risk > 7
                ? "High Risk"
                : s.subscriberCount > 1000
                ? "Most Popular"
                : "Stable",
          };
        }
      );
    } catch (error) {
      console.error("❌ Error fetching my strategies:", error);
      return [];
    }
  };

  return {
    uploadStrategy,
    createStrategy,
    getAllStrategies,
    isContractReady,
    getMyStrategies,
  };
}
