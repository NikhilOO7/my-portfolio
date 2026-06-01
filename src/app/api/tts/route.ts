// src/app/api/tts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Hard cap to prevent abuse. tts-1 charges $15 / 1M chars, so 1000 chars
// per request keeps any single call under $0.02.
const MAX_CHARS = 1000;

export async function POST(req: NextRequest) {
  if (!openai) {
    return NextResponse.json({ error: 'TTS unavailable' }, { status: 503 });
  }
  try {
    const body = await req.json();
    const text = typeof body?.text === 'string' ? body.text.slice(0, MAX_CHARS).trim() : '';
    if (!text) {
      return NextResponse.json({ error: 'text required' }, { status: 400 });
    }

    const resp = await openai.audio.speech.create({
      model: 'tts-1',
      // "fable" is the British-male voice — the closest match to film J.A.R.V.I.S.
      voice: 'fable',
      input: text,
      // Slightly above 1.0 reads like a modern assistant — measured but
      // not lethargic. Anything ≤1.0 sounds slow next to live chat bots.
      speed: 1.1,
      response_format: 'mp3',
    });

    const buf = Buffer.from(await resp.arrayBuffer());
    return new NextResponse(buf, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-store',
        'Content-Length': String(buf.length),
      },
    });
  } catch (err) {
    console.error('TTS error', err);
    return NextResponse.json({ error: 'TTS failed' }, { status: 500 });
  }
}
