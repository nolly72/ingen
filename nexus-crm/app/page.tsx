"use client";
import { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Zap, 
  Plus, 
  Search, 
  Bell, 
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';
import RevenueChart from './components/RevenueChart';
import CreateBookingModal from './components/CreateBookingModal';

export default function Dashboard() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <CreateBookingModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      {/* ВЕРХНЯЯ ПАНЕЛЬ (Header) */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-2">
            Доброе утро, Алекс! <span className="animate-bounce inline-block">👋</span>
          </h1>
          <p className="text-slate-400 font-bold text-lg tracking-tight">
            Ваш бизнес вырос на <span className="text-emerald-500 font-black">+18.2%</span> за 7 дней.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Поиск по системе..." 
              className="w-full pl-14 pr-6 py-5 glass-card bg-white/50 border-none outline-none focus:ring-4 ring-indigo-500/10 font-bold text-slate-700"
            />
          </div>
          <button className="p-5 glass-card bg-white/80 hover:bg-white transition-all relative group">
            <Bell className="w-6 h-6 text-slate-600 group-hover:rotate-12 transition-transform" />
            <span className="absolute top-4 right-4 w-3.5 h-3.5 bg-rose-500 border-4 border-white rounded-full"></span>
          </button>
          <button 
            onClick={() => setModalOpen(true)}
            className="btn-primary flex items-center gap-3 whitespace-nowrap"
          >
            <Plus className="w-6 h-6 stroke-[3px]" />
            <span>Новый заказ</span>
          </button>
        </div>
      </header>

      {/* КАРТОЧКИ СТАТИСТИКИ */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {[
          { label: 'Выручка', val: '₽ 1.2M', growth: '+24%', icon: TrendingUp, color: 'indigo' },
          { label: 'Клиенты', val: '2,840', growth: '+12', icon: Users, color: 'emerald' },
          { label: 'Загрузка', val: '92%', growth: 'Max', icon: Zap, color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-8 group overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-500/5 blur-3xl rounded-full -mr-10 -mt-10`}></div>
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl group-hover:bg-${stat.color}-600 group-hover:text-white transition-all duration-500 shadow-sm`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <span className="flex items-center text-emerald-500 font-black bg-emerald-50 px-4 py-2 rounded-2xl text-xs tracking-widest">
                {stat.growth} <ArrowUpRight className="w-4 h-4 ml-1" />
              </span>
            </div>
            <p className="text-slate-400 font-black uppercase text-[11px] tracking-[0.2em] mb-1">{stat.label}</p>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.val}</h2>
          </div>
        ))}
      </section>

      {/* ГРАФИК И СПИСОК */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* График выручки */}
        <section className="lg:col-span-2 glass-card p-10 bg-white/80">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-indigo-600" /> Аналитика продаж
            </h3>
            <div className="flex gap-2">
              {['Неделя', 'Месяц'].map((t) => (
                <button key={t} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${t === 'Неделя' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <RevenueChart />
        </section>

        {/* Мини-список клиентов */}
        <section className="glass-card p-10">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Клиенты онлайн</h3>
          <div className="space-y-6">
            {[
              { name: 'Иван Петров', service: 'UI/UX Дизайн', status: 'In Work' },
              { name: 'Анна Сидорова', service: 'Аудит сайта', status: 'Done' },
              { name: 'Максим Белов', service: 'Разработка', status: 'Waiting' }
            ].map((client, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    {client.name[0]}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 leading-tight">{client.name}</h4>
                    <p className="text-slate-400 text-sm font-bold">{client.service}</p>
                  </div>
                </div>
                <MoreHorizontal className="text-slate-300 w-5 h-5" />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
