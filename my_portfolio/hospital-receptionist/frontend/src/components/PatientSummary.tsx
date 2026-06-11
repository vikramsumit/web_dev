import { Badge } from './components/ui/badge';
import { User } from 'lucide-react';

export default function PatientSummary({ summary, ward }: { summary: any; ward: string | null }) {
  const getWardColor = (w: string) => {
    switch (w) {
      case 'Emergency Ward': return 'bg-red-500';
      case 'Mental Health Ward': return 'bg-purple-500';
      case 'General Ward': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-lg flex items-center gap-2">
        <User className="w-5 h-5" /> Patient Summary
      </h2>
      {summary && (
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          {summary.name && <div><span className="text-sm text-gray-500">Name:</span> <span className="font-medium">{summary.name}</span></div>}
          {summary.age && <div><span className="text-sm text-gray-500">Age:</span> <span className="font-medium">{summary.age}</span></div>}
          {summary.query && <div><span className="text-sm text-gray-500">Concern:</span> <span className="font-medium text-sm line-clamp-3">{summary.query}</span></div>}
          {ward && (
            <div>
              <span className="text-sm text-gray-500">Ward:</span>
              <Badge className={`mt-1 text-white ${getWardColor(ward)}`}>{ward}</Badge>
            </div>
          )}
        </div>
      )}
      {!summary && <p className="text-gray-400 text-sm">Details will appear here as you chat.</p>}
    </div>
  );
}
