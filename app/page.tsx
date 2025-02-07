import Link from "next/link";
import Image from "next/image";

// app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Trading strategies that grow with your portfolio.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Traders around the world have executed millions of strategies with
            our platform. Start today and trade smarter with AI-powered
            solutions.
          </p>
        </div>
      </section>

      {/* Pricing/Role Cards Section */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Strategy Provider Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg h-full flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">STRATEGY PROVIDER</h3>
              <p className="text-gray-600 h-14">
                Everything you need to start providing strategies.
              </p>
            </div>

            <div className="flex-grow flex justify-center items-center">
              <Image
                src="/strategy.png"
                alt="Strategy"
                width={100}
                height={100}
                className="rounded-lg"
              />
            </div>

            <div className="mt-auto">
              <Link
                href="/strategyProvider"
                className="my-8 block w-full bg-black text-white py-2 rounded-lg text-center hover:bg-gray-800"
              >
                Create My Strategy
              </Link>
              <div className="space-y-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">
                    ✓ Upload trading algorithms
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">
                    ✓ Track strategy performance
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">✓ Earn from subscribers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Investor Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg h-full flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">INVESTOR</h3>
              <p className="text-gray-600 h-14">
                Access top-performing trading strategies.
              </p>
            </div>

            {/* 圖片 */}
            <div className="flex-grow flex justify-center items-center">
              <Image
                src="/invest.png"
                alt="Invest"
                width={100}
                height={100}
                className="rounded-lg"
              />
            </div>
            <Link
              href="/strategies"
              className="my-8 block w-full bg-black text-white py-2 rounded-lg text-center hover:bg-gray-800"
            >
              View Strategies
            </Link>

            <div className="mt-auto">
              <div className="space-y-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">
                    ✓ Browse strategy marketplace
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">✓ Auto-execute trades</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">
                    ✓ Real-time performance tracking
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Node Provider Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg h-full flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">NODE PROVIDER</h3>
              <p className="text-gray-600 h-14">
                Earn fees by running operator nodes.
              </p>
            </div>

            {/* 圖片 */}
            <div className="flex-grow flex justify-center items-center">
              <Image
                src="/node.png"
                alt="Node"
                width={100}
                height={100}
                className="rounded-lg"
              />
            </div>
            <Link
              href="/strategies"
              className="my-8 block w-full bg-black text-white py-2 rounded-lg text-center hover:bg-gray-800"
            >
              Create My Node
            </Link>

            <div className="mt-auto">
              <div className="space-y-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">✓ Run validator nodes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">
                    ✓ Execute trading strategies
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">✓ Earn transaction fees</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
