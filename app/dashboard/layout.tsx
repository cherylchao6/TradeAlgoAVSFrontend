// app/dashboard/layout.tsx
"use client";

import { ReactNode } from "react";
import Sidebar from "../components/Sidebar"; // 左側選單
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  { name: "Team", href: "/dashboard/team", icon: UsersIcon, current: false },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: FolderIcon,
    current: false,
  },
  {
    name: "Calendar",
    href: "/dashboard/calendar",
    icon: CalendarIcon,
    current: false,
  },
  {
    name: "Documents",
    href: "/dashboard/documents",
    icon: DocumentDuplicateIcon,
    current: false,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: ChartPieIcon,
    current: false,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar navigation={navigation} />
      <div className="flex-1 lg:pl-64 p-6">{children}</div>
    </div>
  );
}
