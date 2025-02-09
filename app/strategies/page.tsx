"use client";
import StrategyCard from "../components/StrategyCard";
import { useTradingAlgo } from "../hooks/useTradingAlgo";
import { useEffect, useState } from "react";

type Strategy = {
  id: number;
  uid: string;
  owner: string;
  name: string;
  subscriptionFee: number;
  subscriberCount: number;
  subscriptionPeriod: string;
  profitability: number;
  risk: number;
  ROI: number;
  status: string;
};

const mockStrategies = [
  {
    id: 1000,
    uid: "f732e251-da78-44ef-88ec-31b5729f859f",
    owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    name: "Golden Cross Strategy",
    subscriptionFee: 50,
    subscriberCount: 1200,
    subscriptionPeriod: "month",
    profitability: 30.5,
    risk: 5.0,
    ROI: 12.3,
    status: "High Profit",
  },
  {
    id: 1001,
    uid: "b8d7e251-da78-44ef-88ec-31b5729f859g",
    owner: "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
    name: "MACD Strategy",
    subscriptionFee: 7,
    subscriberCount: 800,
    subscriptionPeriod: "week",
    profitability: 25.5,
    risk: 9.2,
    ROI: 10.3,
    status: "High Risk",
  },
  {
    id: 1002,
    uid: "a8d7e251-da78-44ef-88ec-31b5729f859k",
    owner: "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",
    name: "RSI Strategy",
    subscriptionFee: 2,
    subscriberCount: 2000,
    subscriptionPeriod: "day",
    profitability: 4.5,
    risk: 1.0,
    ROI: 8.3,
    status: "HOT",
  },
];

export default function StrategiesPage() {
  const [strategies, setStrategies] = useState<Strategy[]>(mockStrategies);
  const [loading, setLoading] = useState<boolean>(true);
  const { getAllStrategies, isContractReady } = useTradingAlgo();

  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        if (isContractReady) {
          const result = await getAllStrategies();
          console.log("Fetched strategies:", result);
          // This is for demo purposes only
          // TODO: Remove mock data and use real data from the contract
          setStrategies((prev) => {
            // 避免重複添加相同的策略
            const mergedStrategies = [...prev, ...result].filter(
              (value, index, self) =>
                index === self.findIndex((s) => s.uid === value.uid)
            );

            return mergedStrategies;
          });
        }
      } catch (error) {
        console.error("Failed to fetch strategies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStrategies();
  }, [isContractReady, getAllStrategies]);

  const handleSubscribe = (id: number) => {
    console.log(`Subscribing to strategy ${id}`);
  };

  // 如果合約還沒準備好，顯示載入中
  if (!isContractReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-500">
          Initializing contract...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Top Trading Strategies</h1>
          <p className="text-gray-600 text-xl">
            Discover high-performing trading strategies from expert providers
          </p>
        </div>

        <div className="mb-10 flex gap-4 flex-wrap">
          <select className="bg-white px-4 py-2 rounded-lg border">
            <option>Sort by Return</option>
            <option>Sort by Popularity</option>
            <option>Sort by Risk</option>
          </select>
          <input
            type="text"
            placeholder="Search by strategy owner..."
            className="bg-white px-4 py-2 rounded-lg border flex-1 min-w-[300px]"
          />
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading strategies...</div>
        ) : strategies.length === 0 ? (
          <div className="text-center text-gray-500">No strategies found.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strategies.map((strategy) => (
              <StrategyCard
                key={strategy.uid}
                strategy={strategy}
                onSubscribe={handleSubscribe}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
