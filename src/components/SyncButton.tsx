'use client';

import { useState, useRef, useEffect } from 'react';

export default function SyncButton({ baseUrl }: { baseUrl: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
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
  const googleCalUrl = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(webcalUrl)}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(webcalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-green-200 transition-all hover:scale-105 active:scale-95 text-sm"
      >
        <span className="text-lg">📅</span>
        Agregar al Calendario
        <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-84 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 p-4 space-y-2.5" style={{ width: '340px' }}>
          <p className="text-xs text-gray-400 text-center font-medium uppercase tracking-wider pb-1">
            104 partidos · horarios en tu timezone
          </p>

          {/* Google Calendar — funciona en cualquier dispositivo */}
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl px-4 py-3 transition-colors group"
            onClick={() => setOpen(false)}
          >
            <span className="text-2xl shrink-0">📆</span>
            <div>
              <p className="font-bold text-blue-800 text-sm">Google Calendar</p>
              <p className="text-xs text-blue-500 mt-0.5">Abre directamente en Google Calendar</p>
            </div>
            <span className="ml-auto text-blue-400 text-xs">↗</span>
          </a>

          {/* iOS / macOS — webcal nativo */}
          <a
            href={webcalUrl}
            className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 transition-colors group"
            onClick={() => setOpen(false)}
          >
            <span className="text-2xl shrink-0">🍎</span>
            <div>
              <p className="font-bold text-gray-800 text-sm">iOS / macOS Calendar</p>
              <p className="text-xs text-gray-500 mt-0.5">Suscripción automática en iPhone, iPad, Mac</p>
            </div>
          </a>

          {/* Copiar enlace webcal para Outlook / otros */}
          <button
            onClick={copyLink}
            className="w-full flex items-center gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 transition-colors text-left"
          >
            <span className="text-2xl shrink-0">{copied ? '✅' : '🔗'}</span>
            <div>
              <p className="font-bold text-gray-800 text-sm">{copied ? '¡Enlace copiado!' : 'Copiar enlace webcal'}</p>
              <p className="text-xs text-gray-500 mt-0.5">Para Outlook, Thunderbird y otros</p>
            </div>
          </button>

          {/* Descargar .ics */}
          <a
            href={calUrl}
            download="mundial2026.ics"
            className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 transition-colors group"
            onClick={() => setOpen(false)}
          >
            <span className="text-2xl shrink-0">⬇️</span>
            <div>
              <p className="font-bold text-gray-800 text-sm">Descargar .ics</p>
              <p className="text-xs text-gray-500 mt-0.5">Importar manualmente en cualquier calendario</p>
            </div>
          </a>

          <p className="text-[11px] text-gray-400 text-center pt-1">
            Los horarios se ajustan a la zona horaria de tu dispositivo
          </p>
        </div>
      )}
    </div>
  );
}
