import { useState } from 'react';
import { useTimeline } from '../context/TimelineContext';
import callImg from '../assets/call.png';
import textImg from '../assets/text.png';
import videoImg from '../assets/video.png';

export default function Timeline() {
  const { entries } = useTimeline();
  const [filter, setFilter] = useState('all');

  const filteredEntries = filter === 'all' 
    ? entries 
    : entries.filter(e => e.type === filter);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-display font-bold text-[#1a1a1a] mb-6">Timeline</h1>
        <div className="relative w-full md:w-64">
          <select 
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white appearance-none cursor-pointer outline-none focus:border-primary transition"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Filter timeline</option>
            <option value="call">Calls</option>
            <option value="text">Texts</option>
            <option value="video">Videos</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredEntries.length > 0 ? filteredEntries.map((entry) => (
          <div 
            key={entry.id} 
            className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-6 hover:shadow-md transition duration-200"
          >
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
              {entry.type === 'call' && <img src={callImg} alt="Call" className="w-8 h-8 object-contain" />}
              {entry.type === 'text' && <img src={textImg} alt="Text" className="w-8 h-8 object-contain" />}
              {entry.type === 'video' && <img src={videoImg} alt="Video" className="w-8 h-8 object-contain" />}
              {entry.type === 'meetup' && <span className="text-2xl">🤝</span>}
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 leading-tight">
                <span className="capitalize">{entry.type}</span> with {entry.friendName}
              </h3>
              <p className="text-sm text-gray-400 mt-1">{entry.date}</p>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
            No history found for this category.
          </div>
        )}
      </div>
    </div>
  );
}