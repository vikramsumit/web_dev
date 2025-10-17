'use client';
import React, { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [shaking, setShaking] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const emailValid = /\S+@\S+\.\S+/.test(email);
    const passwordValid = password.trim().length >= 6;
    const match = password === confirmPassword;
    const nameValid = name.trim().length > 1;
    return emailValid && passwordValid && match && nameValid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setSubmitted(false);
    }, 2000);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-8 font-sans">
      <section className="w-full max-w-md">
        <div
          className={`relative rounded-2xl border bg-white/3 border-white/6 p-7 shadow-2xl text-slate-100 backdrop-blur-md transform transition-all duration-150 ${
            submitted ? 'scale-99 ring-2 ring-emerald-300/20' : ''
          } ${shaking ? 'animate-shake border-rose-400/25' : ''} animate-floatIn`}
        >
          <form id="register-form" onSubmit={handleSubmit} noValidate className="grid gap-3">
            <h2 className="text-white text-lg font-semibold">Create an Account</h2>

            {/* Name Input */}
            <div className="relative flex items-center gap-3 bg-white/2 rounded-xl p-3 border border-white/5 focus-within:border-indigo-500/90 focus-within:shadow-md transition">
              <span className="text-slate-400 flex-none" aria-hidden>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="7" r="4" />
                  <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
                </svg>
              </span>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full bg-transparent border-none text-slate-100 placeholder-slate-400 outline-none text-sm"
              />
            </div>

            {/* Email Input */}
            <div className="relative flex items-center gap-3 bg-white/2 rounded-xl p-3 border border-white/5 focus-within:border-indigo-500/90 focus-within:shadow-md transition">
              <span className="text-slate-400 flex-none" aria-hidden>
                <svg width="18" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full bg-transparent border-none text-slate-100 placeholder-slate-400 outline-none text-sm"
              />
            </div>

            {/* Password Input */}
            <div className="relative flex items-center gap-3 bg-white/2 rounded-xl p-3 border border-white/5 focus-within:border-indigo-500/90 focus-within:shadow-md transition">
              <span className="text-slate-400 flex-none" aria-hidden>
                <svg width="16" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full bg-transparent border-none text-slate-100 placeholder-slate-400 outline-none text-sm"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative flex items-center gap-3 bg-white/2 rounded-xl p-3 border border-white/5 focus-within:border-indigo-500/90 focus-within:shadow-md transition">
              <span className="text-slate-400 flex-none" aria-hidden>
                <svg width="16" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 15l-3-3m0 0l3-3m-3 3h12" />
                </svg>
              </span>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="w-full bg-transparent border-none text-slate-100 placeholder-slate-400 outline-none text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl py-2 px-4 font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 shadow-lg hover:translate-y-[-2px] transition-transform"
            >
              Register
            </button>

            <div className="text-center text-sm text-slate-400 mt-1">
              <p>Already have an account? <a href="./login" className="text-sky-300 hover:underline">Login</a></p>
            </div>

            <div className="min-h-[1.25rem] mt-1" aria-live="polite">
              {shaking && <span className="inline-block text-sm px-2 py-1 rounded-md bg-rose-600/10 text-rose-200">Please fill all fields correctly</span>}
              {submitted && <span className="inline-block text-sm px-2 py-1 rounded-md bg-emerald-400/10 text-emerald-100">Registration successful!</span>}
            </div>
          </form>
        </div>
      </section>

      <style jsx>{`
        @keyframes floatIn {
          from { transform: translateY(18px) scale(.994); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes shakeAnim {
          0% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
        .animate-floatIn { animation: floatIn .6s cubic-bezier(.2,.9,.2,1); }
        .animate-shake { animation: shakeAnim .56s cubic-bezier(.36,.07,.19,.97); }
        .scale-99 { transform: scale(.99); }
      `}</style>
    </main>
  );
}
