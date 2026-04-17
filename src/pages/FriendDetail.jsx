import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTimeline } from '../context/TimelineContext';
import toast from 'react-hot-toast';
import { Phone, MessageSquare, Video, Clock, Archive, Trash2, Edit2 } from 'lucide-react';

export default function FriendDetail() {
  const { id } = useParams();
  const { addEntry } = useTimeline();
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    fetch('/friends.json')
      .then(res => res.json())
      .then(data => setFriend(data.find(f => f.id === parseInt(id))));
  }, [id]);

  const handleAction = (type) => {
    addEntry(type, friend.name);
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} logged for ${friend.name}`);
  };

  if (!friend) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
      
      <div className="md:col-span-4 space-y-6">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
          <img src={friend.picture} alt="" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-50 object-cover" />
          <h2 className="text-2xl font-bold mb-1">{friend.name}</h2>
          
          
          <div className="flex flex-wrap justify-center gap-1.5 mb-3">
            {friend.tags.map(tag => (
              <span key={tag} className="bg-[#DCFCE7] text-[#15803D] text-[9px] font-bold px-2.5 py-1 rounded-md uppercase">
                {tag}
              </span>
            ))}
          </div>

          <span className={`text-[10px] uppercase font-bold px-4 py-1.5 rounded-full inline-block mb-4 text-white ${
              friend.status === 'overdue' ? 'bg-[#EF4444]' : 
              friend.status === 'almost-due' ? 'bg-[#F59E0B]' : 
              'bg-[#244D3F]'
            }`}>
            {friend.status.replace('-', ' ')}
          </span>

          <p className="text-sm text-gray-500 mb-6 italic">"{friend.bio}"</p>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
              <Clock size={16}/> Snooze 2 Weeks
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
              <Archive size={16}/> Archive
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-red-100 text-red-500 rounded-lg text-sm hover:bg-red-50">
              <Trash2 size={16}/> Delete
            </button>
          </div>
        </div>
      </div>

      
      <div className="md:col-span-8 space-y-6">
        
        <div className="grid grid-cols-3 gap-4">
           <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
              <div className="text-2xl font-bold">{friend.days_since_contact}</div>
              <div className="text-xs text-gray-400">Days Since Contact</div>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
              <div className="text-2xl font-bold">{friend.goal}</div>
              <div className="text-xs text-gray-400">Goal (Days)</div>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
              <div className="text-sm font-bold truncate leading-loose">{friend.next_due_date}</div>
              <div className="text-xs text-gray-400">Next Due Date</div>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-800">Relationship Goal</h3>
            <p className="text-sm text-gray-500">Connect every <span className="font-bold text-gray-900">{friend.goal} days</span></p>
          </div>
          <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 transition">Edit
          </button>
        </div>

        
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">Quick Check-In</h3>
          <div className="grid grid-cols-3 gap-4">
            <button onClick={() => handleAction('call')} className="flex flex-col items-center gap-2 py-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
              <Phone className="text-gray-600"/> <span className="text-sm font-medium">Call</span>
            </button>
            <button onClick={() => handleAction('text')} className="flex flex-col items-center gap-2 py-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
              <MessageSquare className="text-gray-600"/> <span className="text-sm font-medium">Text</span>
            </button>
            <button onClick={() => handleAction('video')} className="flex flex-col items-center gap-2 py-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
              <Video className="text-gray-600"/> <span className="text-sm font-medium">Video</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}