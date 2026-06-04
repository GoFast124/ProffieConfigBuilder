import type { BladeStyleConfig } from '../../types/config';

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return [r, g, b];
}

function scaleBrightness(hex: string, pct: number): string {
  const [r, g, b] = hexToRgb(hex);
  const s = pct / 100;
  return `Rgb<${Math.round(r * s)},${Math.round(g * s)},${Math.round(b * s)}>`;
}

function buildBaseLayer(style: BladeStyleConfig): string {
  const brightness = style.brightness;

  if (style.gradient) {
    const c1 = scaleBrightness(style.baseColor, brightness);
    const c2 = scaleBrightness(style.gradientColor, brightness);
    return `StyleGradientPtr<${c1},${c2}>()`;
  }

  const baseColor = scaleBrightness(style.baseColor, brightness);

  switch (style.effect) {
    case 'unstable':
      return `StylePtr<Layers<\n    ${baseColor},\n    AlphaL<Stripes<3000,3500,${baseColor},Rgb<0,0,0>>,SmoothStep<Scale<IsLessThan<BatteryLevel,Int<11000>>,Int<0>,Int<32768>>,Int<-4000>>>,\n    AlphaL<AudioFlicker<${baseColor},Rgb<0,0,0>>,Bump<Int<12000>,Int<18000>>>\n  >>()`;

    case 'fire': {
      const [r, g, b] = hexToRgb(style.baseColor);
      return `StylePtr<Layers<\n    StyleFire<BrownNoiseFlicker<${baseColor},Rgb<${Math.round(r*0.3)},${Math.round(g*0.3)},${Math.round(b*0.3)}>,300>,Rgba<${baseColor},0>\n  >>()`;
    }

    case 'shimmer':
      return `StylePtr<Layers<\n    ${baseColor},\n    AlphaL<Stripes<3000,3500,${baseColor},Rgb<0,0,0>>,Int<10000>>\n  >>()`;

    case 'rainbow':
      return `StylePtr<Rainbow<>>()`;

    case 'strobe':
      return `StylePtr<Strobe<${baseColor},Rgb<0,0,0>,50,1>>()`;

    default:
      return `StylePtr<Solid<${baseColor}>>()`;
  }
}

function wrapWithClash(inner: string, style: BladeStyleConfig): string {
  if (style.clashEffect === 'none') return inner;

  const clash = scaleBrightness(style.clashColor, style.brightness);

  // Strip the trailing ()> to inject Clash layer
  const base = inner.replace(/StylePtr<(.+)>\(\)$/, '$1');

  switch (style.clashEffect) {
    case 'flare':
      return `StylePtr<Layers<\n    ${base},\n    AlphaL<${clash},Bump<Int<16384>,Int<16384>>>\n  >>()`;
    case 'spark':
      return `StylePtr<Layers<\n    ${base},\n    AlphaL<Stripes<1500,5000,${clash},Rgb<0,0,0>>,Bump<Int<16384>,Int<16384>>>\n  >>()`;
    case 'color_change':
    default:
      return `StylePtr<Mix<IsOn,\n    ${base},\n    ${clash}\n  >>()`;
  }
}

export function generateStyleString(style: BladeStyleConfig): string {
  if (style.rawStyle.trim()) return style.rawStyle.trim();

  let result = buildBaseLayer(style);

  if (style.clashEffect !== 'none') {
    result = wrapWithClash(result, style);
  }

  return result;
}

export const STYLE_EFFECT_LABELS: Record<string, string> = {
  none: 'Solid',
  unstable: 'Unstable / Voltage Flicker',
  fire: 'Fire',
  shimmer: 'Shimmer',
  gradient: 'Gradient (two colors)',
  rainbow: 'Rainbow',
  strobe: 'Strobe',
};

export const CLASH_EFFECT_LABELS: Record<string, string> = {
  none: 'None',
  color_change: 'Color Flash',
  flare: 'Flare Burst',
  spark: 'Spark Spray',
};
