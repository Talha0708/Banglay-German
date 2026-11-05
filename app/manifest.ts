import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Banglay German',
    short_name: 'Banglay German',
    description: 'বাংলায় জার্মান - Learn German in Bengali, from alphabet to complete CEFR A1',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#042f2e',
    theme_color: '#0f766e',
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
