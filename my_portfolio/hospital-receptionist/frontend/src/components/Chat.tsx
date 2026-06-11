import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatProps {
  conversationId: string;
  onSummaryUpdate: (summary: any) => void;
  onWardUpdate: (ward: string | null) => void;
}

export default function Chat({ conversationId, onSummaryUpdate, onWardUpdate }: ChatProps) {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hello! I\'m your AI hospital receptionist. How can I assist you today?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const res = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input, conversation_id: conversationId })
    });

    const data = await res.json();
    setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    onSummaryUpdate(data.patient_summary);
    onWardUpdate(data.ward);
    setLoading(false);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${msg.role === 'user' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 border rounded-2xl px-5 py-3 focus:outline-none focus:border-teal-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 rounded-2xl flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}