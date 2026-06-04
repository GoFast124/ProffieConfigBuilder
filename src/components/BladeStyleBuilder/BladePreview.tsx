import { useEffect, useRef } from 'react';
import type { BladeStyleConfig } from '../../types/config';

function extractColorFromRaw(raw: string): string | null {
  const argMatch = raw.match(/BASE_COLOR_ARG,\s*Rgb<(\d+),\s*(\d+),\s*(\d+)>/);
  if (argMatch) return rgbToHex(+argMatch[1], +argMatch[2], +argMatch[3]);
  const all = [...raw.matchAll(/Rgb<(\d+),\s*(\d+),\s*(\d+)>/g)];
  for (const m of all) {
    const r = +m[1], g = +m[2], b = +m[3];
    if (r + g + b > 30 && !(r > 200 && g > 200 && b > 200)) return rgbToHex(r, g, b);
  }
  if (all.length) return rgbToHex(+all[0][1], +all[0][2], +all[0][3]);
  return null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => Math.min(255, v).toString(16).padStart(2, '0')).join('');
}

function effectLabel(style: BladeStyleConfig): string {
  if (style.rawStyle.trim()) return 'Raw';
  if (style.gradient) return 'Gradient';
  const map: Record<string, string> = {
    none: 'Solid', unstable: 'Unstable', fire: 'Fire',
    shimmer: 'Shimmer', rainbow: 'Rainbow', strobe: 'Strobe',
  };
  return map[style.effect] ?? style.effect;
}

interface Props {
  style: BladeStyleConfig;
}

export function BladePreview({ style }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Store latest style in a ref so the animation loop always reads current values
  // without needing to restart the loop on every change
  const styleRef = useRef(style);
  styleRef.current = style;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width;
    const H = canvas.height;
    let rafId = 0;
    let cancelled = false;

    function parseHex(hex: string): [number, number, number] {
      const c = (hex ?? '#000000').replace('#', '').padEnd(6, '0');
      return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)];
    }

    function rgba(hex: string, alpha: number, bright = 1): string {
      const [r, g, b] = parseHex(hex);
      return `rgba(${Math.round(r * bright)},${Math.round(g * bright)},${Math.round(b * bright)},${alpha})`;
    }

    function drawBlade(colorFn: (y: number, t: number) => string, t: number) {
      ctx.clearRect(0, 0, W, H);
      const bladeW = 18;
      const hilt = H - 28;
      const bladeTop = 14;

      for (let y = bladeTop; y < hilt; y++) {
        const progress = (y - bladeTop) / (hilt - bladeTop);
        const taper = progress < 0.12 ? progress / 0.12 : 1;
        const w = bladeW * taper;
        const x0 = (W - w) / 2;
        ctx.fillStyle = colorFn(progress, t);
        ctx.fillRect(x0, y, w, 1);
      }

      // Hilt cap
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect((W - bladeW - 6) / 2, hilt, bladeW + 6, 28, 4);
      ctx.fill();
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.roundRect((W - bladeW - 4) / 2, hilt + 2, bladeW + 4, 3, 1);
      ctx.fill();

      // Soft glow bloom
      const glowColor = colorFn(0.5, t);
      for (const [spread, alpha] of [[22, 0.18], [12, 0.28]] as [number, number][]) {
        const grad = ctx.createRadialGradient(
          W / 2, (bladeTop + hilt) / 2, 0,
          W / 2, (bladeTop + hilt) / 2, spread + (hilt - bladeTop) / 2
        );
        grad.addColorStop(0, glowColor.replace(/[\d.]+\)$/, `${alpha})`));
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }
    }

    function frame(ts: number) {
      if (cancelled) return;
      const t = ts / 1000;

      // Read current style values fresh from ref every frame
      const s = styleRef.current;
      const isRaw = !!s.rawStyle.trim();
      const baseColor = isRaw ? (extractColorFromRaw(s.rawStyle) ?? s.baseColor) : s.baseColor;
      const effect = isRaw ? 'raw' : s.gradient ? 'gradient' : s.effect;
      const gradientColor = s.gradientColor;
      const brightness = s.brightness / 100;

      if (effect === 'rainbow') {
        drawBlade((y) => `hsl(${(y * 360 + t * 60) % 360}, 100%, ${50 * brightness}%)`, t);

      } else if (effect === 'gradient') {
        drawBlade((y) => {
          const [r1, g1, b1] = parseHex(baseColor);
          const [r2, g2, b2] = parseHex(gradientColor);
          return `rgba(${Math.round((r1 + (r2 - r1) * y) * brightness)},${Math.round((g1 + (g2 - g1) * y) * brightness)},${Math.round((b1 + (b2 - b1) * y) * brightness)},1)`;
        }, t);

      } else if (effect === 'unstable' || effect === 'raw') {
        drawBlade((y) => {
          const noise = Math.sin(y * 12 + t * 8) * 0.5 + Math.sin(y * 31 - t * 13) * 0.3 + Math.sin(t * 5) * 0.2;
          const flicker = 0.55 + noise * 0.45;
          return rgba(baseColor, 1, brightness * Math.max(0.1, flicker));
        }, t);

      } else if (effect === 'fire') {
        drawBlade((y) => {
          // heat=1 at hilt (y=1), heat=0 at tip (y=0)
          const heat = Math.max(0, 1 - y * 1.05);
          const flicker = 0.78 + Math.sin(y * 18 + t * 11) * 0.12 + Math.sin(t * 6.5 + y * 7) * 0.10;
          const intensity = Math.min(1, heat * flicker * 1.3) * brightness;
          const [br, bg, bb] = parseHex(baseColor);
          // Keep hue of base color, just scale brightness — no hue shifting
          const r = Math.min(255, Math.round(br * intensity));
          const g = Math.min(255, Math.round(bg * intensity));
          const b = Math.min(255, Math.round(bb * intensity));
          return `rgba(${r},${g},${b},${0.1 + heat * 0.9})`;
        }, t);

      } else if (effect === 'shimmer') {
        drawBlade((y) => {
          const wave = 0.75 + Math.sin(y * 10 - t * 4) * 0.25;
          return rgba(baseColor, 1, brightness * wave);
        }, t);

      } else if (effect === 'strobe') {
        const on = Math.sin(t * Math.PI * 15) > 0;
        drawBlade(() => rgba(baseColor, 1, on ? brightness : 0.05), t);

      } else {
        drawBlade(() => rgba(baseColor, 1, brightness), t);
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  // Single stable loop — reads style via ref, no restarts needed
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <canvas
        ref={canvasRef}
        width={54}
        height={220}
        className="rounded-sm"
        style={{ imageRendering: 'pixelated' }}
      />
      <span className="text-xs text-slate-500">{effectLabel(style)}</span>
    </div>
  );
}
