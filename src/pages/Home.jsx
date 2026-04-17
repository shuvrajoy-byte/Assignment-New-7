import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data.json`)
      .then(res => res.json())
      .then(data => {
        setFriends(data);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
    </div>
  );


  const totalFriends = friends.length;
  const onTrackCount = friends.filter(f => f.status === 'on-track').length;
  const overdueCount = friends.filter(f => f.status === 'overdue').length;
  const almostDueCount = friends.filter(f => f.status === 'almost-due').length;
  
  const attentionCount = overdueCount; 

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <section className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-display font-bold text-[#1F2937] mb-4">
          Friends to keep close in your life
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-8">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="bg-[#244D3F] text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto font-medium shadow-sm hover:shadow-md transition">
          <UserPlus size={18} /> Add a Friend
        </button>
      </section>

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[ 
          {l: 'Total Friends', v: totalFriends}, 
          {l: 'On-Track', v: onTrackCount}, 
          {l: 'Nearby Attention', v: attentionCount}, 
          {l: 'Interactions/Month', v: '12'} 
        ]
        .map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-50 text-center shadow-sm">
            <div className="text-2xl font-bold text-gray-800">{s.v}</div>
            <div className="text-[11px] tracking-wider text-gray-400 font-medium">{s.l}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-8 text-gray-800">Your Friends</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {friends.map(friend => (
          <Link 
            to={`/friend/${friend.id}`} 
            key={friend.id} 
            className="bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center group"
          >
            
            <div className="mb-4">
              <img src={friend.picture} alt="" className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm" />
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-0.5">{friend.name}</h3>
            <p className="text-[11px] text-gray-400 mb-4">{friend.days_since_contact}d ago</p>

            
            <div className="flex flex-wrap justify-center gap-1.5 mb-4">
              {friend.tags.map(tag => (
                <span key={tag} className="bg-[#DCFCE7] text-[#575858] text-[9px] font-bold px-2.5 py-1 rounded-md uppercase">
                  {tag}
                </span>
              ))}
            </div>

            
            <div className={`text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase min-w-[90px] ${
              friend.status === 'overdue' ? 'bg-[#EF4444]' : 
              friend.status === 'almost-due' ? 'bg-[#F59E0B]' : 
              'bg-[#244D3F]'
            }`}>
              {friend.status.replace('-', ' ')}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}