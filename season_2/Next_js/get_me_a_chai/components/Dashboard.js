// app/dashboard/page.jsx
"use client";

import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users to /login
//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/login");
//     }
//   }, [status, router]);

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
        <div className="animate-pulse text-center">
          <div className="h-6 w-48 bg-slate-700 rounded mb-3"></div>
          <div className="h-4 w-32 bg-slate-700 rounded"></div>
        </div>
      </main>
    );
  }

  // mock data for UI demonstration
  const stats = [
    { id: 1, label: "Active Fundraisers", value: 7 },
    { id: 2, label: "Total Donations", value: "₹ 1,24,560" },
    { id: 3, label: "Donors", value: 348 },
  ];

  const recent = [
    { id: 1, name: "Asha's Medical Fund", amount: "₹ 2,500", time: "2h ago" },
    { id: 2, name: "School Supplies Drive", amount: "₹ 1,200", time: "1d ago" },
    { id: 3, name: "Flood Relief", amount: "₹ 5,000", time: "3d ago" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-slate-300 mt-1">
              Welcome back{session?.user?.name ? `, ${session.user.name}` : ""} — manage your fundraisers and donors here.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/start-fundraising" className="inline-block">
              <button className="rounded-xl py-2 px-4 font-semibold shadow-lg hover:translate-y-[-2px] transition-transform bg-gradient-to-r from-teal-500 to-blue-600">
                Start Fundraising
              </button>
            </Link>

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-xl py-2 px-4 font-semibold shadow-lg hover:translate-y-[-2px] transition-transform bg-transparent border border-gray-600"
            >
              Sign out
            </button>
          </div>
        </header>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Overview & recent */}
          <section className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.id} className="bg-white/4 border border-white/6 rounded-2xl p-4">
                  <div className="text-sm text-slate-300">{s.label}</div>
                  <div className="mt-3 text-2xl font-semibold">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Recent donations */}
            <div className="bg-white/4 border border-white/6 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium">Recent Activity</h2>
                <Link href="/activity" className="text-sm text-slate-300 hover:underline">View all</Link>
              </div>

              <ul className="space-y-3">
                {recent.map((r) => (
                  <li key={r.id} className="flex items-center justify-between bg-transparent rounded-md p-2">
                    <div>
                      <div className="font-medium">{r.name}</div>
                      <div className="text-sm text-slate-400">{r.time}</div>
                    </div>
                    <div className="text-sm font-semibold">{r.amount}</div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Right: Quick actions / profile */}
          <aside className="space-y-6">
            <div className="bg-white/4 border border-white/6 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-slate-700 flex items-center justify-center text-xl">
                  {session?.user?.name?.[0]?.toUpperCase() ?? "U"}
                </div>
                <div>
                  <div className="font-medium">{session?.user?.name ?? session?.user?.email ?? "User"}</div>
                  <div className="text-sm text-slate-400">{session?.user?.email}</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2">
                <Link href="/profile" className="block">
                  <button className="w-full rounded-md py-2 px-3 font-medium bg-transparent border border-gray-600">
                    View Profile
                  </button>
                </Link>
                <Link href="/settings" className="block">
                  <button className="w-full rounded-md py-2 px-3 font-medium bg-transparent border border-gray-600">
                    Settings
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-white/4 border border-white/6 rounded-2xl p-4">
              <h3 className="font-medium mb-2">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/fundraisers" className="text-slate-300 hover:underline">Your fundraisers</Link></li>
                <li><Link href="/donors" className="text-slate-300 hover:underline">Donor list</Link></li>
                <li><Link href="/reports" className="text-slate-300 hover:underline">Reports</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
