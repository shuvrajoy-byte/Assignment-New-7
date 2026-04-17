import React from 'react';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

import { useTimeline } from '../context/TimelineContext';

export default function Stats() {
 
  const { getInteractionCounts } = useTimeline();
  const counts = getInteractionCounts();

  
  const chartData = [
    { name: 'Call', value: counts.call, color: '#244D35' },      
    { name: 'Text', value: counts.text, color: '#7F37F5' },      
    { name: 'Video', value: counts.video, color: '#37A163' },    
  ].filter(item => item.value > 0); 

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-display font-bold text-[#1a1a1a] mb-8">
        Friendship Analytics
      </h1>

      
      <div className="bg-white p-6 md:p-10 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-xs text-[#454646] font-semibold text-gray-400 mb-10 uppercase tracking-widest">
          By Interaction Type
        </h3>

       
        <div className="h-[300px] md:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%" 
                cy="50%"
                innerRadius="65%" 
                outerRadius="85%"
                paddingAngle={5} 
                dataKey="value"
              >
                
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              
              
              <Tooltip 
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle" 
                formatter={(value) => <span className="text-black font-medium ml-1">{value}</span>} 
               />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}