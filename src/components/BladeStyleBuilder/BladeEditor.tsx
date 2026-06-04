import { useState } from 'react';
import type { BladeStyleConfig, EffectType, ClashEffectType } from '../../types/config';
import { generateStyleString, STYLE_EFFECT_LABELS, CLASH_EFFECT_LABELS } from '../../lib/proffie/styleTemplates';
import { BladePreview } from './BladePreview';

function Slider({ label, value, min, max, onChange }: {
  label: string; value: number; min: number; max: number; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs text-slate-400 mb-1">
        <span>{label}</span><span>{value}%</span>
      </div>
      <input type="range" min={min} max={max} value={value}
        onChange={e => onChange(parseInt(e.target.value))}
        className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-sky-500" />
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={e => onChange(e.target.value)}
          className="w-10 h-10 rounded-lg border border-slate-600 bg-slate-900 cursor-pointer p-0.5" />
        <input type="text" value={value.toUpperCase()}
          onChange={e => { const v = e.target.value; if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(v); }}
          className="flex-1 bg-slate-900 border border-slate-600 rounded-md px-3 py-1.5 text-sm font-mono text-slate-100 focus:outline-none focus:border-sky-500" />
      </div>
    </div>
  );
}

interface Props {
  style: BladeStyleConfig;
  label: string;
  uiMode: 'beginner' | 'advanced';
  onChange: (style: BladeStyleConfig) => void;
}

export function BladeEditor({ style, label, uiMode, onChange }: Props) {
  const [localMode, setLocalMode] = useState<'beginner' | 'advanced'>(uiMode);

  function patch(partial: Partial<BladeStyleConfig>) {
    // If the user edits visual controls, clear any rawStyle override
    const clearRaw = localMode === 'beginner' && !('rawStyle' in partial)
      ? { rawStyle: '' }
      : {};
    onChange({ ...style, ...clearRaw, ...partial });
  }

  const previewStyle = generateStyleString(style);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden" style={{ contain: 'layout' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full shadow-lg"
            style={{ backgroundColor: style.baseColor, boxShadow: `0 0 8px ${style.baseColor}` }} />
          <span className="text-sm font-medium text-slate-200">{label}</span>
        </div>
        <div className="flex items-center gap-1 bg-slate-900 rounded-lg p-0.5">
          <button onClick={() => {
            setLocalMode('beginner');
            // Clear rawStyle so visual controls drive the preview
            if (style.rawStyle) patch({ rawStyle: '' });
          }}
            className={`text-xs px-2.5 py-1 rounded-md transition-colors ${localMode === 'beginner' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
            Visual
          </button>
          <button onClick={() => setLocalMode('advanced')}
            className={`text-xs px-2.5 py-1 rounded-md transition-colors ${localMode === 'advanced' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
            Raw
          </button>
        </div>
      </div>

      <div className="flex gap-4 p-4">
        {/* Blade preview — fixed width column */}
        <div className="shrink-0 flex flex-col items-center pt-1">
          <BladePreview style={style} />
        </div>

        {/* Controls */}
        <div className="flex-1 min-w-0 space-y-4">
        {localMode === 'beginner' ? (
          <>
            <ColorField label="Base Color" value={style.baseColor} onChange={v => patch({ baseColor: v })} />

            <div>
              <label className="block text-xs text-slate-400 mb-1">Blade Effect</label>
              <select
                value={style.gradient ? 'gradient' : style.effect}
                onChange={e => {
                  const v = e.target.value;
                  if (v === 'gradient') patch({ gradient: true, effect: 'none' });
                  else patch({ gradient: false, effect: v as EffectType });
                }}
                className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
              >
                {Object.entries(STYLE_EFFECT_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

            {style.gradient && (
              <ColorField label="Gradient End Color" value={style.gradientColor} onChange={v => patch({ gradientColor: v })} />
            )}

            <div className="border-t border-slate-700 pt-4 space-y-3">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Clash &amp; Swing</p>
              <ColorField label="Clash Color" value={style.clashColor} onChange={v => patch({ clashColor: v })} />
              <div>
                <label className="block text-xs text-slate-400 mb-1">Clash Effect</label>
                <select value={style.clashEffect} onChange={e => patch({ clashEffect: e.target.value as ClashEffectType })}
                  className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500">
                  {Object.entries(CLASH_EFFECT_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={style.swingColorShift}
                  onChange={e => patch({ swingColorShift: e.target.checked })}
                  className="w-4 h-4 accent-sky-500" />
                <span className="text-sm text-slate-300">Swing color shift</span>
              </label>
            </div>

            <div className="border-t border-slate-700 pt-4">
              <Slider label="Brightness" value={style.brightness} min={10} max={100} onChange={v => patch({ brightness: v })} />
            </div>
          </>
        ) : (
          <div>
            <label className="block text-xs text-slate-400 mb-2">Proffie Style String</label>
            <textarea
              value={style.rawStyle || previewStyle}
              onChange={e => patch({ rawStyle: e.target.value })}
              rows={10} spellCheck={false}
              className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-2 text-xs font-mono text-green-300 focus:outline-none focus:border-sky-500 resize-none"
              placeholder="StylePtr<...>()"
            />
            {style.rawStyle && (
              <button onClick={() => patch({ rawStyle: '' })}
                className="mt-2 text-xs text-slate-500 hover:text-red-400 transition-colors">
                Clear override → use visual settings
              </button>
            )}
          </div>
        )}

        <div className="border-t border-slate-700 pt-3">
          <p className="text-xs text-slate-500 mb-1">Generated style</p>
          <div className="bg-slate-950 rounded-md p-2 text-xs font-mono text-green-400 break-all leading-relaxed max-h-20 overflow-y-auto">
            {previewStyle}
          </div>
        </div>
        </div>{/* end controls */}
      </div>{/* end flex gap-4 */}
    </div>
  );
}
