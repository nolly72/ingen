"use client";
import { X, User, Briefcase, Calendar, Clock, ChevronRight } from 'lucide-react';

export default function CreateBookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Overlay с сильным размытием */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Сама карточка окна */}
      <div className="bg-white w-full max-w-xl rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] relative z-10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <div className="p-10">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-black tracking-tighter text-slate-900">Новый заказ</h2>
            <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-2xl transition-all active:scale-90">
              <X className="w-8 h-8 text-slate-400 stroke-[3px]" />
            </button>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-500 ml-2">Клиент</label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                <input type="text" placeholder="Имя Фамилия" className="w-full pl-16 pr-8 py-5 bg-slate-50 rounded-3xl font-bold text-slate-900 outline-none focus:ring-4 ring-indigo-500/10 transition-all border-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Услуга</label>
                <div className="relative">
                  <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <select className="w-full pl-16 pr-8 py-5 bg-slate-50 rounded-3xl font-bold text-slate-900 outline-none appearance-none cursor-pointer border-none">
                    <option>Разработка</option>
                    <option>Дизайн</option>
                    <option>Аудит</option>
                  </select>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Дата</label>
                <div className="relative">
                  <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="date" className="w-full pl-16 pr-8 py-5 bg-slate-50 rounded-3xl font-bold text-slate-900 outline-none border-none" />
                </div>
              </div>
            </div>

            <button className="w-full btn-primary py-6 text-base flex items-center justify-center gap-4 group">
              <span>Забронировать слот</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
