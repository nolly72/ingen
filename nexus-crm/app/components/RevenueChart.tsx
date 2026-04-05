"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Пн', total: 42000 },
  { name: 'Вт', total: 38000 },
  { name: 'Ср', total: 55000 },
  { name: 'Чт', total: 49000 },
  { name: 'Пт', total: 72000 },
  { name: 'Сб', total: 85000 },
  { name: 'Вс', total: 78000 },
];

export default function RevenueChart() {
  return (
    <div className="h-[320px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 800}}
            dy={15}
          />
          <YAxis hide={true} domain={['dataMin - 10000', 'dataMax + 10000']} />
          <Tooltip 
            cursor={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '5 5' }}
            contentStyle={{ 
              borderRadius: '20px', 
              border: 'none', 
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
              padding: '15px 20px'
            }}
            itemStyle={{ fontWeight: 900, color: '#0f172a', fontSize: '16px' }}
            labelStyle={{ fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}
            formatter={(value: number) => [`₽ ${value.toLocaleString()}`, 'Выручка']}
          />
          <Area 
            type="monotone" 
            dataKey="total" 
            stroke="#6366f1" 
            strokeWidth={4} 
            fillOpacity={1} 
            fill="url(#colorTotal)" 
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
