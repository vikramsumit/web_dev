export default function ChatMessage({ role, content }) {
  const isAssistant = role === "assistant";

  return (
    <div className={`message-enter flex ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div
        className={[
          "max-w-[85%] rounded-[24px] px-4 py-3 text-sm leading-6 shadow-sm md:max-w-[70%]",
          isAssistant
            ? "rounded-bl-md bg-white text-ink border border-line/70"
            : "rounded-br-md bg-calm text-white",
        ].join(" ")}
      >
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] opacity-70">
          {isAssistant ? "Reception" : "Patient"}
        </p>
        <p>{content}</p>
      </div>
    </div>
  );
}

