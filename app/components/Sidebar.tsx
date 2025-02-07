"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function Sidebar({
  navigation,
}: {
  navigation: NavigationItem[];
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopExpanded, setDesktopExpanded] = useState(true); // 控制桌面版 Sidebar 展開/折疊

  return (
    <>
      {/* 🔹 Mobile Sidebar (小螢幕) */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          className="p-2 text-gray-500"
          onClick={() => setSidebarOpen(true)}
        >
          <Bars3Icon className="size-6" />
        </button>
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-4">
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4"
              >
                <XMarkIcon className="size-6" />
              </button>
              <nav className="mt-10 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      "block px-4 py-2 rounded",
                      item.current
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-700"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* 🔹 Desktop Sidebar (大螢幕，可折疊) */}
      <aside
        className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col bg-gray-900 text-white p-4 z-40 transition-all duration-300 ${
          desktopExpanded ? "w-64" : "w-20"
        }`}
      >
        {/* Sidebar Header + Toggle Button */}
        <div className="flex items-center justify-between mb-6">
          {desktopExpanded && <h2 className="text-lg font-bold">Dashboard</h2>}
          <button
            onClick={() => setDesktopExpanded(!desktopExpanded)}
            className="p-2 rounded hover:bg-gray-700"
          >
            {desktopExpanded ? (
              <XMarkIcon className="size-6" />
            ) : (
              <Bars3Icon className="size-6" />
            )}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="space-y-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                "flex items-center gap-3 px-4 py-2 rounded",
                "text-gray-400 hover:bg-gray-700"
              )}
            >
              <item.icon className="size-6" />
              {desktopExpanded && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
