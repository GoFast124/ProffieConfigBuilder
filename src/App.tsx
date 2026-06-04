import { useState, useCallback, useRef } from 'react';
import { nanoid } from 'nanoid';
import type { ConfigState, HardwareConfigState, FontPreset } from './types/config';
import { DEFAULT_BLADE, DEFAULT_BLADE_STYLE, DEFAULT_HARDWARE_FEATURES } from './types/config';
import { HardwareConfig } from './components/HardwareConfig';
import { FontPresetsManager } from './components/FontPresetsManager';
import { ConfigPreview } from './components/ConfigPreview';

const STORAGE_KEY = 'proffieai_config_v2';

function makeDefaultFont(): FontPreset {
  return {
    id: nanoid(),
    name: 'Default Font',
    bladeStyles: [{ ...DEFAULT_BLADE_STYLE }],
    folderName: '',
    slots: [],
    scanned: false,
    trackFile: '',
  };
}

function defaultState(): ConfigState {
  return {
    hardware: {
      board: 'v3.9',
      blades: [{ ...DEFAULT_BLADE, id: nanoid(), style: { ...DEFAULT_BLADE_STYLE } }],
      features: { ...DEFAULT_HARDWARE_FEATURES },
    },
    fonts: [makeDefaultFont()],
    uiMode: 'beginner',
    activeStep: 0,
    activeFontId: null,
  };
}

function loadState(): ConfigState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migrate old state that had soundFont instead of fonts
      if (!parsed.fonts && parsed.soundFont) {
        parsed.fonts = [makeDefaultFont()];
        delete parsed.soundFont;
      }
      if (!parsed.hardware?.features) {
        parsed.hardware = { ...parsed.hardware, features: { ...DEFAULT_HARDWARE_FEATURES } };
      }
      return parsed;
    }
  } catch {}
  return defaultState();
}

const STEPS = [
  { id: 'hardware', label: 'Hardware', icon: '⚙️' },
  { id: 'fonts', label: 'Fonts', icon: '✨' },
  { id: 'preview', label: 'Preview & Export', icon: '📄' },
];

export default function App() {
  const [state, setState] = useState<ConfigState>(loadState);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const save = useCallback((next: ConfigState) => {
    setState(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  }, []);

  function setHardware(hardware: HardwareConfigState) {
    save({ ...state, hardware });
  }

  function setFonts(fonts: FontPreset[]) {
    save({ ...state, fonts });
  }

  function setStep(n: number) {
    save({ ...state, activeStep: n });
  }

  function setUiMode(uiMode: 'beginner' | 'advanced') {
    save({ ...state, uiMode });
  }

  function handleSaveProject() {
    const payload = JSON.stringify(state, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'proffie-config.proffieai';
    a.click();
    URL.revokeObjectURL(url);
    setSaveMsg('Saved!');
    setTimeout(() => setSaveMsg(null), 2000);
  }

  function handleLoadProject(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const loaded = JSON.parse(evt.target?.result as string) as ConfigState;
        // Basic sanity check
        if (!loaded.hardware || !loaded.fonts) throw new Error('Invalid file');
        save(loaded);
        setSaveMsg('Loaded!');
        setTimeout(() => setSaveMsg(null), 2000);
      } catch {
        setSaveMsg('Invalid file');
        setTimeout(() => setSaveMsg(null), 3000);
      }
    };
    reader.readAsText(file);
    // Reset so the same file can be reloaded
    e.target.value = '';
  }

  const step = state.activeStep;

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-slate-200 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-lg">
              ⚔️
            </div>
            <div>
              <h1 className="text-base font-semibold text-slate-100 leading-none">ProffieAI</h1>
              <p className="text-xs text-slate-500 mt-0.5">Proffie Config Builder</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Save / Load */}
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".proffieai,.json"
                onChange={handleLoadProject}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-xs px-3 py-1.5 rounded-md border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-slate-100 transition-colors"
              >
                Load Project
              </button>
              <button
                onClick={handleSaveProject}
                className="text-xs px-3 py-1.5 rounded-md border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-slate-100 transition-colors"
              >
                Save Project
              </button>
              {saveMsg && (
                <span className={`text-xs font-medium transition-opacity ${saveMsg === 'Invalid file' ? 'text-red-400' : 'text-green-400'}`}>
                  {saveMsg}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-slate-700" />

            {/* Mode toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Mode:</span>
              <div className="flex items-center gap-1 bg-slate-900 rounded-lg p-0.5 border border-slate-700">
                <button
                  onClick={() => setUiMode('beginner')}
                  className={`text-xs px-3 py-1.5 rounded-md transition-colors ${state.uiMode === 'beginner' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Beginner
                </button>
                <button
                  onClick={() => setUiMode('advanced')}
                  className={`text-xs px-3 py-1.5 rounded-md transition-colors ${state.uiMode === 'advanced' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Advanced
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-5xl w-full mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-44 shrink-0">
          <nav className="space-y-1 sticky top-8">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setStep(i)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                  i === step
                    ? 'bg-sky-600/20 text-sky-300 border border-sky-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className="text-base leading-none">{s.icon}</span>
                <span className="font-medium">{s.label}</span>
              </button>
            ))}
          </nav>

          {/* Font count badge */}
          {step === 1 && (
            <div className="mt-4 px-3 py-2 bg-slate-800/40 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-500">{state.fonts.length} font preset{state.fonts.length !== 1 ? 's' : ''}</p>
              <p className="text-xs text-slate-600 mt-0.5">Each = 1 preset in config</p>
            </div>
          )}

          <button
            onClick={() => { if (confirm('Reset all settings?')) save(defaultState()); }}
            className="mt-8 w-full text-xs text-slate-600 hover:text-red-400 transition-colors px-3 py-2 rounded-lg"
          >
            Reset all
          </button>
        </aside>

        {/* Main panel */}
        <main className="flex-1 min-w-0">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-100">{STEPS[step].label}</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {step === 0 && 'Select your board, configure buttons, features, and each blade.'}
              {step === 1 && 'Add font presets — each font has its own blade style and sound folder.'}
              {step === 2 && 'Review and download your config.h file.'}
            </p>
          </div>

          {step === 0 && (
            <HardwareConfig config={state.hardware} onChange={setHardware} />
          )}
          {step === 1 && (
            <FontPresetsManager
              fonts={state.fonts}
              blades={state.hardware.blades}
              uiMode={state.uiMode}
              onChange={setFonts}
            />
          )}
          {step === 2 && (
            <ConfigPreview state={state} />
          )}

          <div className="flex justify-between mt-8 pt-4 border-t border-slate-800">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="text-sm px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(Math.min(STEPS.length - 1, step + 1))}
              disabled={step === STEPS.length - 1}
              className="text-sm px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium transition-colors"
            >
              Next →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
