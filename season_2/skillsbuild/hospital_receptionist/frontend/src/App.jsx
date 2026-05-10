import { useEffect, useRef, useState } from "react";
import ChatMessage from "./components/ChatMessage";
import PatientSummaryCard from "./components/PatientSummaryCard";
import WardBadge from "./components/WardBadge";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const emptySummary = {
  name: null,
  age: null,
  query: null,
  ward: "Pending",
};

async function postJson(path, body) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body !== undefined) {
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, requestOptions);

  if (!response.ok) {
    const fallbackMessage = "Something went wrong while contacting the backend.";

    try {
      const errorPayload = await response.json();
      throw new Error(errorPayload.detail || fallbackMessage);
    } catch (error) {
      throw new Error(error.message || fallbackMessage);
    }
  }

  return response.json();
}

export default function App() {
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState([]);
  const [summary, setSummary] = useState(emptySummary);
  const [stage, setStage] = useState("awaiting_name");
  const [isComplete, setIsComplete] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const viewportRef = useRef(null);

  useEffect(() => {
    startIntake();
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages]);

  async function startIntake() {
    setLoading(true);
    setError("");

    try {
      const payload = await postJson("/api/chat/start");
      setSessionId(payload.session_id);
      setSummary(payload.patient_summary);
      setStage(payload.stage);
      setIsComplete(payload.is_complete);
      setMessages([{ role: "assistant", content: payload.assistant_message }]);
      setInput("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || sending || !sessionId) {
      return;
    }

    const patientMessage = { role: "patient", content: trimmedInput };
    setMessages((current) => [...current, patientMessage]);
    setInput("");
    setSending(true);
    setError("");

    try {
      const payload = await postJson("/api/chat/message", {
        session_id: sessionId,
        message: trimmedInput,
      });

      setMessages((current) => [
        ...current,
        { role: "assistant", content: payload.assistant_message },
      ]);
      setSummary(payload.patient_summary);
      setStage(payload.stage);
      setIsComplete(payload.is_complete);
    } catch (requestError) {
      setMessages((current) => current.slice(0, -1));
      setInput(trimmedInput);
      setError(requestError.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen px-4 py-8 text-ink sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.32em] text-calm">
              Hospital Assistant
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
              A calm intake desk that gathers patient details and routes each case to the right ward.
            </h1>
          </div>

          <div className="flex items-center gap-3 rounded-full border border-white/70 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Current ward
            </span>
            <WardBadge ward={summary.ward} />
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <PatientSummaryCard summary={summary} stage={stage} isComplete={isComplete} />

          <div className="glass-panel flex min-h-[720px] flex-col rounded-[28px] border border-white/70 shadow-card">
            <div className="border-b border-line/70 px-6 py-5">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Chat Intake
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The assistant asks one hospital-appropriate question at a time: name, age, then the main concern.
              </p>
            </div>

            <div ref={viewportRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
              {messages.map((message, index) => (
                <ChatMessage
                  key={`${message.role}-${index}`}
                  role={message.role}
                  content={message.content}
                />
              ))}

              {loading ? (
                <div className="rounded-2xl border border-dashed border-line bg-white/60 px-4 py-5 text-sm text-slate-500">
                  Starting a new intake session...
                </div>
              ) : null}
            </div>

            <div className="border-t border-line/70 px-5 py-5 sm:px-6">
              {error ? (
                <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Your reply
                  </span>
                  <input
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={
                      isComplete
                        ? "Start a new intake to continue"
                        : "Type the patient's answer here"
                    }
                    disabled={loading || sending || isComplete}
                    className="w-full rounded-2xl border border-line bg-white px-4 py-4 text-sm text-ink outline-none transition focus:border-calm focus:ring-4 focus:ring-calm/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                  />
                </label>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={loading || sending || isComplete || !input.trim()}
                    className="rounded-full bg-calm px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    {sending ? "Sending..." : "Send response"}
                  </button>

                  <button
                    type="button"
                    onClick={startIntake}
                    disabled={loading || sending}
                    className="rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-calm hover:text-calm disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Start new intake
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
