"use client";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut, 
  Zap,
  Star,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Дашборд', path: '/' },
    { icon: Users, label: 'Клиенты', path: '/clients' },
    { icon: Calendar, label: 'Записи', path: '/bookings' },
    { icon: BarChart3, label: 'Аналитика', path: '/stats' },
    { icon: Settings, label: 'Настройки', path: '/settings' },
  ];

  return (
    <aside className="w-[300px] h-screen glass-card rounded-none border-r border-slate-100 flex flex-col p-8 sticky top-0 z-50">
      
      {/* LOGO: Акцент на бренде */}
      <div className="flex items-center gap-4 mb-16 px-2">
        <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 rotate-3 group hover:rotate-0 transition-transform duration-500">
          <Zap className="text-white fill-current w-6 h-6" />
        </div>
        <div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 block leading-none">
            NEXUS<span className="text-indigo-600">.</span>
          </span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Business OS</span>
        </div>
      </div>

      {/* NAVIGATION: Жирные иконки и шрифты */}
      <nav className="flex-1 space-y-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.label} 
              href={item.path}
              className={`group flex items-center justify-between px-5 py-4 rounded-2xl font-extrabold transition-all duration-300 ${
                isActive 
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-[1.02]' 
                : 'text-slate-400 hover:bg-white hover:text-slate-900 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon className={`w-6 h-6 ${isActive ? 'text-white' : 'group-hover:text-indigo-600 transition-colors'}`} />
                <span className="text-[15px] tracking-tight">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
            </Link>
          );
        })}
      </nav>

      {/* PREMIUM CARD: Продажа твоих услуг */}
      <div className="mt-auto relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[32px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative p-6 bg-slate-900 rounded-[28px] overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Разработчик PRO</span>
            </div>
            <p className="text-white text-sm font-extrabold leading-tight mb-4">
              Нужен такой же крутой сервис?
            </p>
            <button className="w-full py-3 bg-white text-slate-900 rounded-xl text-[12px] font-black uppercase tracking-wider hover:bg-indigo-50 transition-colors shadow-lg active:scale-95">
              Связаться со мной
            </button>
          </div>
          {/* Декоративный фон */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-500/20 blur-3xl rounded-full"></div>
        </div>
      </div>

      {/* LOGOUT */}
      <button className="mt-8 flex items-center gap-4 px-6 text-slate-400 font-bold hover:text-rose-500 transition-colors group">
        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm uppercase tracking-widest">Выйти</span>
      </button>
    </aside>
  );
}
