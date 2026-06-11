import { NextResponse } from 'next/server';

const N8N_SCORES_URL =
  'https://n8n.95.216.212.187.sslip.io/webhook/mundial-scores';

export const revalidate = 0;

export async function GET() {
  try {
    const res = await fetch(N8N_SCORES_URL, {
      next: { revalidate: 30 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`n8n responded ${res.status}`);
    const scores = await res.json();
    return NextResponse.json(scores, {
      headers: { 'Cache-Control': 'public, max-age=30, stale-while-revalidate=60' },
    });
  } catch (err) {
    console.error('[scores]', err);
    return NextResponse.json([], { status: 200 });
  }
}
