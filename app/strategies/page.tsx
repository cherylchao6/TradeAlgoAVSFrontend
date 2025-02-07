// app/strategies/page.tsx
"use client";
import Link from "next/link";

// 假資料
const strategies = [
  {
    id: 1,
    name: "Golden Cross Strategy",
    owner: "Alice Smith",
    ownerId: "alice123",
    monthlyReturn: 30.5,
    subscribers: 1200,
    winRate: 78,
    riskScore: 7.8,
    fee: 149,
    status: "High Profit",
  },
  {
    id: 3,
    name: "AI Trend Prediction",
    owner: "Charlie Lee",
    ownerId: "charlie789",
    monthlyReturn: 1.8,
    subscribers: 2300,
    winRate: 89,
    riskScore: 2.3,
    fee: 299,
    status: "Hot",
  },
  {
    id: 2,
    name: "Momentum Scalping",
    owner: "Bob Johnson",
    ownerId: "bob456",
    monthlyReturn: -4.2,
    subscribers: 850,
    winRate: 42,
    riskScore: 9.1,
    fee: 99,
    status: "High Risk",
  },
];

export default function StrategiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Top Trading Strategies</h1>
          <p className="text-gray-600 text-xl">
            Discover high-performing trading strategies from expert providers
          </p>
        </div>

        {/* Filter Section */}
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

        {/* Strategy Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {strategy.name}
                    </h3>
                    <Link
                      href={`/user/${strategy.ownerId}`}
                      className="text-gray-600 hover:text-indigo-600"
                    >
                      By {strategy.owner}
                    </Link>
                  </div>
                  <span
                    className={classNames(
                      strategy.status === "High Profit"
                        ? "bg-green-100 text-green-800"
                        : strategy.status === "High Risk"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800",
                      "text-sm font-medium px-3 py-1 rounded-full"
                    )}
                  >
                    {strategy.status}
                  </span>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Monthly Return</p>
                    <p
                      className={`text-2xl font-bold ${
                        strategy.monthlyReturn < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {strategy.monthlyReturn}%
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Subscribers</p>
                    <p className="text-2xl font-bold">
                      {strategy.subscribers.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Win Rate</p>
                    <p className="text-2xl font-bold">{strategy.winRate}%</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Risk Score</p>
                    <p
                      className={`text-2xl font-bold ${
                        strategy.riskScore >= 7 ? "text-red-600" : ""
                      }`}
                    >
                      {strategy.riskScore}
                    </p>
                  </div>
                </div>

                {/* Subscription Price */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Subscription Fee</p>
                    <p className="text-2xl font-bold">
                      ${strategy.fee}{" "}
                      <span className="text-sm text-gray-500">/ month</span>
                    </p>
                  </div>
                  <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
