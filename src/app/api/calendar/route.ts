import { NextResponse } from 'next/server';
import { matches } from '@/data/matches';
import { matchesToICS } from '@/lib/ical';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const ics = matchesToICS(matches);
    return new NextResponse(ics, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'attachment; filename="mundial2026.ics"',
        'Cache-Control': 'public, max-age=1800',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Error generando calendario' }, { status: 500 });
  }
}
