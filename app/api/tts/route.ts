import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// In-memory audio cache for frequent words and phrases
const audioCache = new Map<string, { buffer: Buffer; contentType: string }>();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const rawText = searchParams.get('text') || '';
  const text = rawText.trim();

  if (!text) {
    return NextResponse.json({ error: 'Text parameter is required' }, { status: 400 });
  }

  // Cap length to reasonable sentence size
  const sanitizedText = text.slice(0, 300);
  const cacheKey = sanitizedText.toLowerCase();

  // Return from in-memory cache if available
  if (audioCache.has(cacheKey)) {
    const cached = audioCache.get(cacheKey)!;
    return new NextResponse(new Uint8Array(cached.buffer), {
      status: 200,
      headers: {
        'Content-Type': cached.contentType,
        'Cache-Control': 'public, max-age=604800, immutable',
      },
    });
  }

  // 1. Try Gemini 3.8 Flash Lite TTS if GEMINI_API_KEY is configured
  if (process.env.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: sanitizedText,
                speechMetadata: {
                  style: 'Clear, natural, native German pronunciation for language learners',
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const buffer = Buffer.from(base64Audio, 'base64');
        audioCache.set(cacheKey, { buffer, contentType: 'audio/wav' });

        return new NextResponse(new Uint8Array(buffer), {
          status: 200,
          headers: {
            'Content-Type': 'audio/wav',
            'Cache-Control': 'public, max-age=604800, immutable',
          },
        });
      }
    } catch (geminiErr) {
      console.warn('Gemini TTS failed, falling back to neural audio proxy:', geminiErr);
    }
  }

  // 2. High-quality neural audio proxy (same natural German voice as Chrome/PC Google Deutsch)
  try {
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      sanitizedText
    )}&tl=de&client=tw-ob`;

    const res = await fetch(ttsUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Referer: 'https://translate.google.com/',
      },
    });

    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      audioCache.set(cacheKey, { buffer, contentType: 'audio/mpeg' });

      return new NextResponse(new Uint8Array(buffer), {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=604800, immutable',
        },
      });
    }
  } catch (proxyErr) {
    console.error('Audio proxy fetch error:', proxyErr);
  }

  return NextResponse.json({ error: 'Failed to generate audio' }, { status: 502 });
}
