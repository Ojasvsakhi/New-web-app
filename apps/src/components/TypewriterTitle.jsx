import React, { useState, useEffect } from 'react';

export default function TypewriterTitle({ prefix, highlight }) {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let timeoutId;
    let blinkTimeoutId;

    const typeRoutine = async () => {

      const stored = sessionStorage.getItem('pageTitleData');
      const current = { prefix, highlight };

      sessionStorage.setItem('pageTitleData', JSON.stringify(current));

      let oldPrefix = '';
      let oldHighlight = '';

      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          oldPrefix = parsed.prefix || '';
          oldHighlight = parsed.highlight || '';
        } catch (e) {}
      }

      const sleep = (ms) => new Promise(r => { timeoutId = setTimeout(r, ms); });

      if (isMounted) {
        setText1(oldPrefix);
        setText2(oldHighlight);
      }

      if (oldPrefix === prefix && oldHighlight === highlight) {
        blinkTimeoutId = setTimeout(() => {
          if (isMounted) setIsBlinking(false);
        }, 500); 
        return;
      }

      await sleep(100);

      for (let i = oldHighlight.length; i >= 0; i--) {
        if (!isMounted) return;
        setText2(oldHighlight.slice(0, i));
        await sleep(25);
      }

      for (let i = oldPrefix.length; i >= 0; i--) {
        if (!isMounted) return;
        setText1(oldPrefix.slice(0, i));
        await sleep(25);
      }

      await sleep(100);

      for (let i = 1; i <= prefix.length; i++) {
        if (!isMounted) return;
        setText1(prefix.slice(0, i));
        await sleep(35);
      }

      for (let i = 1; i <= highlight.length; i++) {
        if (!isMounted) return;
        setText2(highlight.slice(0, i));
        await sleep(35);
      }

      blinkTimeoutId = setTimeout(() => {
        if (isMounted) setIsBlinking(false);
      }, 500);
    };

    typeRoutine();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      clearTimeout(blinkTimeoutId);
    };
  }, [prefix, highlight]);

  return (
    <h1 className="mb-6 text-4xl md:text-5xl font-bold tracking-tight text-foreground min-h-[40px] md:min-h-[48px] flex items-center justify-center">
      <span>
        {text1}
        <span className="text-blue-600">{text2}</span>
        <span className={`inline-block w-[3px] h-[0.9em] bg-blue-600 ml-1 align-middle transition-opacity duration-500 ${isBlinking ? 'animate-pulse opacity-100' : 'opacity-0'}`}></span>
      </span>
    </h1>
  );
}