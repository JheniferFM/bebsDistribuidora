import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function Carousel({ images = [], autoPlay = true, interval = 4000, showIndicators = true, showArrows = true, height = 280 }) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const total = safeImages.length;

  function next() { setIdx((i) => (i + 1) % total); }
  function prev() { setIdx((i) => (i - 1 + total) % total); }
  function goTo(i) { setIdx(i % total); }

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [interval, autoPlay, total]);

  if (!total) return null;

  return (
    <div className="carousel" style={{ height }}>
      <div className="carousel-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {safeImages.map((src, i) => (
          <div key={i} className="carousel-slide" style={{ height }}>
            <img className="carousel-img" src={src} alt="Bebs Distribuidora" />
          </div>
        ))}
      </div>
      {showArrows && total > 1 && (
        <>
          <button className="carousel-arrow left" onClick={prev} aria-label="Anterior">‹</button>
          <button className="carousel-arrow right" onClick={next} aria-label="Próximo">›</button>
        </>
      )}
      {showIndicators && total > 1 && (
        <div className="carousel-indicators">
          {safeImages.map((_, i) => (
            <button key={i} className={i === idx ? 'active' : ''} onClick={() => goTo(i)} aria-label={`Ir para slide ${i + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
}
