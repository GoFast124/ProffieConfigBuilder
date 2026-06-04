import { nanoid } from 'nanoid';
import type { HardwareConfigState, BladeConfig, BoardVersion, BladeType, HardwareFeatures } from '../../types/config';
import { DEFAULT_BLADE, DEFAULT_BLADE_STYLE, DEFAULT_HARDWARE_FEATURES } from '../../types/config';
import { BOARD_OPTIONS, getBoardProfile } from '../../lib/proffie/boardProfiles';

interface Props {
  config: HardwareConfigState;
  onChange: (next: HardwareConfigState) => void;
}

const BLADE_TYPE_OPTIONS: { value: BladeType; label: string }[] = [
  { value: 'WS2811', label: 'WS2811 / WS2812B (NeoPixel strip)' },
  { value: 'APA102', label: 'APA102 (DotStar strip)' },
  { value: 'SIMPLE_LED', label: 'Simple RGB LED' },
  { value: 'NEOPIXEL', label: 'NeoPixel (single)' },
];

function Check({
  label,
  checked,
  onChange,
  description,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  description?: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative mt-0.5 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-4 h-4 rounded border border-slate-600 bg-slate-900 peer-checked:bg-sky-600 peer-checked:border-sky-600 transition-colors flex items-center justify-center">
          {checked && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8">
              <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
      <div>
        <span className="text-sm text-slate-200 group-hover:text-white transition-colors">{label}</span>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4 space-y-3">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
      {children}
    </div>
  );
}

export function HardwareConfig({ config, onChange }: Props) {
  const profile = getBoardProfile(config.board);
  const features: HardwareFeatures = config.features ?? DEFAULT_HARDWARE_FEATURES;

  function patchFeatures(patch: Partial<HardwareFeatures>) {
    onChange({ ...config, features: { ...features, ...patch } });
  }

  function setBoard(board: BoardVersion) {
    const p = getBoardProfile(board);
    const trimmedBlades = config.blades.slice(0, p.maxBlades);
    const updated = trimmedBlades.length ? trimmedBlades : [makeBlade(p.defaultLedCount)];
    onChange({ ...config, board, blades: updated });
  }

  function makeBlade(ledCount = profile.defaultLedCount): BladeConfig {
    return { ...DEFAULT_BLADE, id: nanoid(), ledCount, style: { ...DEFAULT_BLADE_STYLE } };
  }

  function addBlade() {
    if (config.blades.length >= profile.maxBlades) return;
    onChange({ ...config, blades: [...config.blades, makeBlade()] });
  }

  function removeBlade(id: string) {
    if (config.blades.length <= 1) return;
    onChange({ ...config, blades: config.blades.filter(b => b.id !== id) });
  }

  function updateBlade(id: string, patch: Partial<BladeConfig>) {
    onChange({ ...config, blades: config.blades.map(b => b.id === id ? { ...b, ...patch } : b) });
  }

  return (
    <div className="space-y-5">

      {/* Board */}
      <Section title="Board">
        <div>
          <select
            value={config.board}
            onChange={e => setBoard(e.target.value as BoardVersion)}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          >
            {BOARD_OPTIONS.map(b => (
              <option key={b.id} value={b.id}>{b.label}</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-slate-500">Supports up to {profile.maxBlades} blades · Default {profile.defaultLedCount} LEDs</p>
        </div>
      </Section>

      {/* Buttons */}
      <Section title="Buttons">
        <div className="flex gap-3">
          {([1, 2, 3] as const).map(n => (
            <button
              key={n}
              onClick={() => patchFeatures({ numButtons: n })}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                features.numButtons === n
                  ? 'bg-sky-600 border-sky-500 text-white'
                  : 'border-slate-600 text-slate-400 hover:border-slate-400 hover:text-slate-200'
              }`}
            >
              {n} Button{n > 1 ? 's' : ''}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500">
          {features.numButtons === 1 && 'Single power button only.'}
          {features.numButtons === 2 && 'Power + Aux (most common setup).'}
          {features.numButtons === 3 && 'Power + Aux + Aux2.'}
        </p>
      </Section>

      {/* Volume */}
      <Section title="Volume">
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Default volume</span>
            <span>{features.volume}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={features.volume}
            onChange={e => patchFeatures({ volume: parseInt(e.target.value) })}
            className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-sky-500"
          />
        </div>
      </Section>

      {/* Enable flags */}
      <Section title="Features">
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <Check
            label="Enable Audio"
            checked={features.enableAudio}
            onChange={v => patchFeatures({ enableAudio: v })}
            description="Sound playback via SD card"
          />
          <Check
            label="Enable Motion"
            checked={features.enableMotion}
            onChange={v => patchFeatures({ enableMotion: v })}
            description="Swing / clash / stab detection"
          />
          <Check
            label="Enable SD"
            checked={features.enableSD}
            onChange={v => patchFeatures({ enableSD: v })}
            description="Required for sound fonts"
          />
          <Check
            label="Battery level on boot"
            checked={features.batteryLevelOnStart}
            onChange={v => patchFeatures({ batteryLevelOnStart: v })}
            description="Announce charge % at startup"
          />
          <Check
            label="OLED Display"
            checked={features.enableOLED}
            onChange={v => patchFeatures({ enableOLED: v })}
            description="128×32 / 128×64 I²C screen"
          />
          <Check
            label="Bluetooth"
            checked={features.enableBluetooth}
            onChange={v => patchFeatures({ enableBluetooth: v })}
            description="BLE remote / app control"
          />
          <Check
            label="Serial / USB"
            checked={features.enableSerial}
            onChange={v => patchFeatures({ enableSerial: v })}
            description="Serial monitor + commands"
          />
        </div>
      </Section>

      {/* Blades */}
      <Section title={`Blades (${config.blades.length} / ${profile.maxBlades})`}>
        <div className="flex justify-end mb-1">
          <button
            onClick={addBlade}
            disabled={config.blades.length >= profile.maxBlades}
            className="text-xs px-3 py-1.5 rounded-md bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-500 text-white transition-colors"
          >
            + Add Blade
          </button>
        </div>

        <div className="space-y-3">
          {config.blades.map((blade, i) => (
            <div key={blade.id} className="bg-slate-900/60 border border-slate-700 rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-sky-400">Blade {i + 1}</span>
                {config.blades.length > 1 && (
                  <button
                    onClick={() => removeBlade(blade.id)}
                    className="text-xs text-slate-500 hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">LED Count</label>
                  <input
                    type="number"
                    min={1}
                    max={512}
                    value={blade.ledCount}
                    onChange={e => updateBlade(blade.id, { ledCount: parseInt(e.target.value) || 1 })}
                    className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Blade Type</label>
                  <select
                    value={blade.bladeType}
                    onChange={e => updateBlade(blade.id, { bladeType: e.target.value as BladeType })}
                    className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                  >
                    {BLADE_TYPE_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
