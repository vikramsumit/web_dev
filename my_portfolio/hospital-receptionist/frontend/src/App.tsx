import { useState } from 'react';
import { Stethoscope } from 'lucide-react';
import Chat from './components/Chat.tsx';
import PatientSummary from './components/PatientSummary.tsx';

function App() {
const [conversationId] = useState(`demo-${Date.now()}`); 
  const [summary, setSummary] = useState<any>(null);
  const [ward, setWard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[700px]">
        {/* Chat */}
        <div className="flex-1 flex flex-col">
          <div className="bg-teal-600 text-white p-6 flex items-center gap-3">
            <Stethoscope className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">AI Hospital Receptionist</h1>
              <p className="text-teal-100 text-sm">Always here to help • 24/7</p>
            </div>
          </div>
          <Chat conversationId={conversationId} onSummaryUpdate={setSummary} onWardUpdate={setWard} />
        </div>

        {/* Sidebar Summary */}
        <div className="w-full md:w-80 bg-gray-50 border-l p-6 flex flex-col">
          <PatientSummary summary={summary} ward={ward} />
        </div>
      </div>
    </div>
  );
}

export default App;