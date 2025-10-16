// "use client";
// import { useSession, signIn, signOut } from "next-auth/react"

// export default function Component() {
//   const { data: session } = useSession()
//   if(session) {
//     return <>
//       Signed in as {session.user.email} <br/>
//       <button onClick={() => signOut()}>Sign out</button>
//     </>
//   }
//   return <>
//     Not signed in <br/>
//     <button onClick={() => signIn()}>Sign in</button>
//   </>
// }

"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [isHovering, setIsHovering] = useState(null);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (status === "authenticated") router.push("/");
  }, [status, router]);

  useEffect(() => {
    if (error) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  async function handleCredentialsSignIn(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error || "Invalid credentials");
    } else if (res?.ok) {
      router.push("/");
    }
  }

  async function handleOAuthSignIn(provider) {
    setLoading(true);
    setError("");
    await signIn(provider, { callbackUrl: "/" });
  }

  async function handleMagicLink() {
    if (!email) {
      setError("Please enter your email first");
      return;
    }

    setLoading(true);
    setError("");
    const res = await signIn("email", { email, redirect: false, callbackUrl: "/" });
    
    setLoading(false);
    if (res?.ok) {
      setMagicLinkSent(true);
      setTimeout(() => setMagicLinkSent(false), 5000);
    } else {
      setError("Failed to send magic link");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 mt-5 pt-16">
        <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 ring-1 ring-indigo-100 transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300 cursor-pointer">
              <span className="text-white font-semibold select-none">SV</span>
            </div>
          </div>

          <h1 className="text-2xl font-semibold mb-4 text-center text-slate-800">Welcome back</h1>
          <p className="text-center text-sm text-slate-500 mb-6">Sign in to continue to your dashboard</p>

          <div className="space-y-3">
            <button
              onClick={() => handleOAuthSignIn('google')}
              onMouseEnter={() => setIsHovering('google')}
              onMouseLeave={() => setIsHovering(null)}
              className={`w-full py-3 rounded-lg border border-slate-200 bg-white shadow-sm flex items-center justify-center gap-3 transition-all duration-300 ${
                isHovering === 'google' 
                  ? 'border-indigo-300 shadow-md -translate-y-0.5' 
                  : 'hover:border-indigo-200'
              } disabled:opacity-60`}
              disabled={loading}
            >
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br from-red-400 to-yellow-400 transition-transform duration-300 ${
                isHovering === 'google' ? 'scale-110' : ''
              }`} />
              <span className="text-slate-700 font-medium">Sign in with Google</span>
            </button>

            <button
              onClick={() => handleOAuthSignIn('github')}
              onMouseEnter={() => setIsHovering('github')}
              onMouseLeave={() => setIsHovering(null)}
              className={`w-full py-3 rounded-lg border border-slate-200 bg-white shadow-sm flex items-center justify-center gap-3 transition-all duration-300 ${
                isHovering === 'github' 
                  ? 'border-slate-800 shadow-md -translate-y-0.5' 
                  : 'hover:border-slate-400'
              } disabled:opacity-60`}
              disabled={loading}
            >
              <div className={`w-5 h-5 rounded-full bg-slate-800 transition-transform duration-300 ${
                isHovering === 'github' ? 'scale-110' : ''
              }`} />
              <span className="text-slate-700 font-medium">Sign in with GitHub</span>
            </button>
          </div>

          <div className="mt-6 flex items-center gap-2">
            <div className="flex-grow h-px bg-slate-200" />
            <span className="text-sm text-slate-400">or</span>
            <div className="flex-grow h-px bg-slate-200" />
          </div>

          <form onSubmit={handleCredentialsSignIn} className="mt-6 space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-slate-700 font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-lg bg-slate-50 border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all duration-300 hover:bg-white"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-slate-700 font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-lg bg-slate-50 border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all duration-300 hover:bg-white"
                  placeholder="Your password"
                />
              </div>
            </div>

            {error && (
              <div className={`p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm ${shake ? 'animate-shake' : ''}`}>
                {error}
              </div>
            )}

            {magicLinkSent && (
              <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm animate-pulse">
                Magic link sent! Check your email.
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-medium hover:from-indigo-700 hover:to-sky-600 disabled:opacity-60 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={handleMagicLink}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium disabled:opacity-60 transition-colors duration-300 hover:underline"
              disabled={loading || !email}
            >
              {loading ? "Sending..." : "Send magic link"}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <a href="/register" className="text-indigo-600 font-medium hover:text-indigo-700 underline transition-colors duration-300">
              Create one
            </a>
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-indigo-400 rounded-full mt-1.5 animate-pulse" />
              <p className="text-xs text-slate-600">
                <strong>Demo tip:</strong> Try signing in with any valid email format. The magic link feature will simulate sending a login link to your inbox.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}