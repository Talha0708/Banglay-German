'use client';

import React, { useId } from 'react';

export type AdSlot = '300x250' | '320x50' | '728x90' | 'native';

interface AdBannerProps {
  slot?: AdSlot;
  className?: string;
  showLabel?: boolean;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slot = '300x250',
  className = '',
  showLabel = true,
}) => {
  const adId = useId();

  if (slot === 'native') {
    const nativeSrcDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; background: transparent; font-family: system-ui, sans-serif; }
  </style>
</head>
<body>
  <div id="container-5362fbf7fab73a9956f831a759aa134a"></div>
  <script async="async" data-cfasync="false" src="https://pl32224959.profitableratecpmnetwork.com/5362fbf7fab73a9956f831a759aa134a/invoke.js"></script>
</body>
</html>`;

    return (
      <div className={`w-full flex flex-col items-center justify-center my-4 overflow-hidden ${className}`}>
        {showLabel && (
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 mb-1 tracking-wider">
            বিজ্ঞাপন
          </span>
        )}
        <div className="w-full max-w-[360px] rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/60 shadow-xs flex justify-center">
          <iframe
            id={`ad-${adId}`}
            title="Banglay German Native Ad"
            srcDoc={nativeSrcDoc}
            className="w-full min-h-[160px] border-0 overflow-hidden"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </div>
    );
  }

  // Dimension mapping
  let width = 300;
  let height = 250;
  let key = 'bb0243f59677bc67ce0083a2613dce05';

  if (slot === '320x50') {
    width = 320;
    height = 50;
    key = 'c3b0a4e831d086fec11775652b6d57d1';
  } else if (slot === '728x90') {
    width = 728;
    height = 90;
    key = 'ae35c4734fc4e06ad72eff2d633204ae';
  }

  const iframeSrcDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key' : '${key}',
      'format' : 'iframe',
      'height' : ${height},
      'width' : ${width},
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="https://www.highrevenueformat.com/${key}/invoke.js"></script>
</body>
</html>`;

  return (
    <div className={`w-full flex flex-col items-center justify-center my-4 overflow-hidden ${className}`}>
      {showLabel && (
        <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 mb-1 tracking-wider">
          বিজ্ঞাপন
        </span>
      )}
      <div
        className="rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/60 shadow-xs flex items-center justify-center"
        style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }}
      >
        <iframe
          id={`ad-${adId}`}
          title={`Banglay German Ad ${width}x${height}`}
          srcDoc={iframeSrcDoc}
          width={width}
          height={height}
          className="border-0 overflow-hidden"
          style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
};
