'use client';

import { useState, useRef, useEffect } from 'react';

export default function SyncButton({ baseUrl }: { baseUrl: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const calUrl = `${baseUrl}/api/calendar`;
  const webcalUrl = calUrl.replace(/^https?/, 'webcal');

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-green-200 transition-all hover:scale-105 active:scale-95 text-sm"
      >
        <span className="text-lg">📅</span>
        Agregar al Calendario
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 p-4 space-y-3">
          <p className="text-xs text-gray-500 text-center font-medium uppercase tracking-wide">
            104 partidos · horarios en tu timezone
          </p>

          {/* Suscripción webcal */}
          <a
            href={webcalUrl}
            className="flex items-start gap-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl px-4 py-3 transition-colors group"
            onClick={() => setOpen(false)}
          >
            <span className="text-2xl mt-0.5">📲</span>
            <div>
              <p className="font-bold text-blue-800 text-sm group-hover:underline">Suscripción en vivo</p>
              <p className="text-xs text-blue-600 mt-0.5">
                iOS Calendar, Android, Google Calendar — se actualiza automáticamente
              </p>
            </div>
          </a>

          {/* Descarga .ics */}
          <a
            href={calUrl}
            download="mundial2026.ics"
            className="flex items-start gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 transition-colors group"
            onClick={() => setOpen(false)}
          >
            <span className="text-2xl mt-0.5">⬇️</span>
            <div>
              <p className="font-bold text-gray-800 text-sm group-hover:underline">Descargar .ics</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Importar manualmente en cualquier app de calendario
              </p>
            </div>
          </a>

          <p className="text-[11px] text-gray-400 text-center">
            Los horarios se convierten automáticamente a tu zona horaria
          </p>
        </div>
      )}
    </div>
  );
}
