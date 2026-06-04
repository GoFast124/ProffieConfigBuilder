import { useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import type { FontPreset, BladeConfig, BladeStyleConfig, SoundSlotFile } from '../../types/config';
import { DEFAULT_BLADE_STYLE } from '../../types/config';
import { BladeEditor } from '../BladeStyleBuilder/BladeEditor';
import {
  scanDirectory,
  parseFileList,
  getMissingRequiredSlots,
  PROFFIE_SOUND_SLOTS,
} from '../../lib/proffie/soundFontParser';
import { PRESET_LIBRARY, PRESET_CATEGORIES } from '../../lib/proffie/presetLibrary';

interface Props {
  fonts: FontPreset[];
  blades: BladeConfig[];
  uiMode: 'beginner' | 'advanced';
  onChange: (fonts: FontPreset[]) => void;
}

const FILE_SYSTEM_ACCESS_SUPPORTED = 'showDirectoryPicker' in window;

function makeFont(bladeCount: number, overrides: Partial<FontPreset> = {}): FontPreset {
  return {
    id: nanoid(),
    name: 'New Font',
    bladeStyles: Array.from({ length: Math.max(bladeCount, 1) }, () => ({ ...DEFAULT_BLADE_STYLE })),
    folderName: '',
    slots: [],
    scanned: false,
    trackFile: '',
    ...overrides,
  };
}

// ── Sound folder section ──────────────────────────────────────────────────────

function SoundSection({ font, onUpdate }: { font: FontPreset; onUpdate: (patch: Partial<FontPreset>) => void }) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePickFolder() {
    if (!FILE_SYSTEM_ACCESS_SUPPORTED) { setError('Folder picker requires Chrome or Edge.'); return; }
    setError(null);
    setScanning(true);
    try {
      const dirHandle = await (window as any).showDirectoryPicker({ mode: 'read' });
      const files = await scanDirectory(dirHandle);
      const slotMap = parseFileList(files.map(f => f.split('/').pop() ?? f));
      const slots: SoundSlotFile[] = PROFFIE_SOUND_SLOTS.map(s => ({
        slot: s.slot, files: slotMap[s.slot] ?? [], selectedFile: slotMap[s.slot]?.[0] ?? null,
      }));
      onUpdate({ folderName: dirHandle.name, slots, scanned: true });
    } catch (err: any) {
      if (err?.name !== 'AbortError') setError(`Failed to read folder: ${err?.message ?? 'Unknown error'}`);
    } finally { setScanning(false); }
  }

  function updateSlot(slot: string, selectedFile: string | null) {
    onUpdate({ slots: font.slots.map(s => s.slot === slot ? { ...s, selectedFile } : s) });
  }

  const missing = font.scanned
    ? getMissingRequiredSlots(Object.fromEntries(font.slots.filter(s => s.selectedFile).map(s => [s.slot, [s.selectedFile!]])))
    : [];

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center gap-3 bg-slate-800/40 border-2 border-dashed border-slate-600 rounded-xl p-6">
        {font.scanned ? (
          <div className="text-center">
            <p className="text-slate-200 font-medium">📁 {font.folderName}</p>
            <p className="text-xs text-slate-500 mt-0.5">{font.slots.filter(s => s.selectedFile).length} / {PROFFIE_SOUND_SLOTS.length} slots mapped</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-slate-400 text-sm">No sound folder selected</p>
            <p className="text-xs text-slate-600 mt-0.5">Chrome / Edge only · read-only access</p>
          </div>
        )}
        <button onClick={handlePickFolder} disabled={scanning}
          className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-medium rounded-lg transition-colors">
          {scanning ? 'Scanning…' : font.scanned ? 'Change folder' : 'Choose Sound Folder'}
        </button>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1">Music track file (optional)</label>
        <input type="text" value={font.trackFile} onChange={e => onUpdate({ trackFile: e.target.value })}
          placeholder="tracks/song.wav"
          className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-1.5 text-sm font-mono text-slate-100 focus:outline-none focus:border-sky-500" />
      </div>

      {missing.length > 0 && (
        <div className="bg-amber-900/30 border border-amber-700/50 rounded-lg px-3 py-2 text-xs text-amber-300">
          <span className="font-medium">Missing required slots: </span>{missing.join(', ')}
        </div>
      )}

      {font.scanned && (
        <div className="space-y-1">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Slot Mapping</p>
          {PROFFIE_SOUND_SLOTS.map(slotDef => {
            const slotData = font.slots.find(s => s.slot === slotDef.slot);
            const found = slotData?.files ?? [];
            const selected = slotData?.selectedFile ?? null;
            return (
              <div key={slotDef.slot}
                className={`flex items-center gap-3 px-3 py-1.5 rounded-lg ${found.length > 0 ? 'bg-slate-800/50' : 'bg-slate-900/30 opacity-50'}`}>
                <span className="font-mono text-sky-400 w-16 shrink-0 text-xs">{slotDef.slot}</span>
                <span className="text-slate-400 flex-1 text-xs truncate">{slotDef.label}</span>
                {found.length === 0 ? (
                  <span className="text-xs text-slate-600">{slotDef.required ? '⚠ missing' : '—'}</span>
                ) : found.length === 1 ? (
                  <span className="text-xs text-green-400 font-mono truncate max-w-36">{found[0]}</span>
                ) : (
                  <select value={selected ?? ''} onChange={e => updateSlot(slotDef.slot, e.target.value || null)}
                    className="text-xs bg-slate-900 border border-slate-600 rounded px-2 py-1 text-slate-100 max-w-36">
                    <option value="">— unset —</option>
                    {found.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Preset library drawer ─────────────────────────────────────────────────────

function PresetLibrary({ bladeCount, onAdd }: { bladeCount: number; onAdd: (font: FontPreset) => void }) {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('fett263');

  const filtered = PRESET_LIBRARY.filter(p => p.category === activeCategory);

  function addPreset(presetId: string) {
    const preset = PRESET_LIBRARY.find(p => p.id === presetId);
    if (!preset) return;
    const styles = Array.from({ length: Math.max(bladeCount, 1) }, () => ({ ...preset.bladeStyle }));
    const font = makeFont(bladeCount, {
      name: preset.name,
      bladeStyles: styles,
      folderName: preset.folderSuggestion,
      trackFile: preset.trackSuggestion,
    });
    onAdd(font);
  }

  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/60 hover:bg-slate-800 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-200">Preset Library</span>
          <span className="text-xs text-slate-500">{PRESET_LIBRARY.length} styles</span>
        </div>
        <span className={`text-slate-400 text-xs transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {open && (
        <div className="bg-slate-900/60 border-t border-slate-700 p-4 space-y-3">
          {/* Category tabs */}
          <div className="flex gap-1">
            {PRESET_CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`text-xs px-3 py-1.5 rounded-md transition-colors font-medium ${activeCategory === cat.id ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200 border border-slate-700'}`}>
                {cat.label}
              </button>
            ))}
          </div>

          <p className="text-xs text-slate-500">
            {PRESET_CATEGORIES.find(c => c.id === activeCategory)?.description}
          </p>

          {/* Preset grid */}
          <div className="grid grid-cols-2 gap-2">
            {filtered.map(preset => (
              <div key={preset.id}
                className="group relative bg-slate-800/60 border border-slate-700 rounded-lg p-3 hover:border-slate-500 transition-colors">
                <div className="flex items-start gap-2 mb-1.5">
                  <div className="w-3 h-3 rounded-full mt-0.5 shrink-0"
                    style={{ backgroundColor: preset.previewColor, boxShadow: `0 0 6px ${preset.previewColor}` }} />
                  <span className="text-sm font-medium text-slate-200 leading-tight">{preset.name}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-2">{preset.description}</p>
                {preset.folderSuggestion && (
                  <p className="text-xs font-mono text-sky-600 mb-2 truncate">📁 {preset.folderSuggestion}</p>
                )}
                <button
                  onClick={() => addPreset(preset.id)}
                  className="w-full text-xs py-1.5 rounded-md bg-slate-700 hover:bg-sky-600 text-slate-300 hover:text-white transition-colors font-medium"
                >
                  + Add to config
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function FontPresetsManager({ fonts, blades, uiMode, onChange }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(fonts[0]?.id ?? null);
  const [activeTab, setActiveTab] = useState<'style' | 'sounds'>('style');
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragSrcId = useRef<string | null>(null);

  const selectedFont = fonts.find(f => f.id === selectedId) ?? null;

  function addFont(font?: FontPreset) {
    const f = font ?? makeFont(blades.length);
    onChange([...fonts, f]);
    setSelectedId(f.id);
  }

  function removeFont(id: string) {
    if (fonts.length <= 1) return;
    const next = fonts.filter(f => f.id !== id);
    onChange(next);
    if (selectedId === id) setSelectedId(next[0]?.id ?? null);
  }

  function updateFont(id: string, patch: Partial<FontPreset>) {
    onChange(fonts.map(f => f.id === id ? { ...f, ...patch } : f));
  }

  function updateBladeStyle(fontId: string, bladeIndex: number, style: BladeStyleConfig) {
    const font = fonts.find(f => f.id === fontId);
    if (!font) return;
    const bladeStyles = [...font.bladeStyles];
    bladeStyles[bladeIndex] = style;
    updateFont(fontId, { bladeStyles });
  }

  function syncedStyles(font: FontPreset): BladeStyleConfig[] {
    const styles = [...(font.bladeStyles ?? [])];
    while (styles.length < blades.length) styles.push({ ...DEFAULT_BLADE_STYLE });
    return styles.slice(0, blades.length);
  }

  function handleDragStart(id: string) {
    dragSrcId.current = id;
  }

  function handleDragOver(e: React.DragEvent, id: string) {
    e.preventDefault();
    if (dragSrcId.current !== id) setDragOverId(id);
  }

  function handleDrop(targetId: string) {
    const srcId = dragSrcId.current;
    if (!srcId || srcId === targetId) { setDragOverId(null); return; }
    const next = [...fonts];
    const from = next.findIndex(f => f.id === srcId);
    const to = next.findIndex(f => f.id === targetId);
    next.splice(to, 0, next.splice(from, 1)[0]);
    onChange(next);
    setDragOverId(null);
    dragSrcId.current = null;
  }

  function handleDragEnd() {
    setDragOverId(null);
    dragSrcId.current = null;
  }

  return (
    <div className="space-y-4">
      {/* Preset library — full width above the main panel */}
      <PresetLibrary bladeCount={blades.length} onAdd={addFont} />

      {/* Main two-panel layout */}
      <div className="flex gap-5 min-h-[500px]">
        {/* Left: font list */}
        <div className="w-48 shrink-0 flex flex-col gap-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Fonts</span>
            <button onClick={() => addFont()}
              className="text-xs px-2 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-md transition-colors">
              + Add
            </button>
          </div>

          {fonts.map((font, i) => (
            <div key={font.id}
              draggable
              onDragStart={() => handleDragStart(font.id)}
              onDragOver={e => handleDragOver(e, font.id)}
              onDrop={() => handleDrop(font.id)}
              onDragEnd={handleDragEnd}
              onClick={() => setSelectedId(font.id)}
              className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer border transition-colors select-none ${
                font.id === selectedId
                  ? 'bg-sky-600/20 border-sky-600/40 text-sky-300'
                  : dragOverId === font.id
                  ? 'border-sky-500/60 bg-sky-900/20 text-slate-200'
                  : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200 bg-slate-800/30'
              }`}>
              <span className="text-slate-600 group-hover:text-slate-400 cursor-grab active:cursor-grabbing text-xs shrink-0">⠿</span>
              <div className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: font.bladeStyles?.[0]?.baseColor ?? '#4fc3f7', boxShadow: `0 0 5px ${font.bladeStyles?.[0]?.baseColor ?? '#4fc3f7'}` }} />
              <span className="text-sm font-medium flex-1 truncate">{font.name || `Font ${i + 1}`}</span>
              {fonts.length > 1 && (
                <button onClick={e => { e.stopPropagation(); removeFont(font.id); }}
                  className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all text-xs">
                  ✕
                </button>
              )}
            </div>
          ))}

          {fonts.length === 0 && (
            <p className="text-xs text-slate-600 text-center py-4">No fonts yet</p>
          )}
        </div>

        {/* Right: editor */}
        {selectedFont ? (
          <div className="flex-1 min-w-0 space-y-4">
            <input type="text" value={selectedFont.name}
              onChange={e => updateFont(selectedFont.id, { name: e.target.value })}
              placeholder="Font name"
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 text-sm font-medium focus:outline-none focus:border-sky-500" />

            <div className="flex gap-1 bg-slate-900 rounded-lg p-1 border border-slate-700">
              <button onClick={() => setActiveTab('style')}
                className={`flex-1 text-sm py-1.5 rounded-md transition-colors font-medium ${activeTab === 'style' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                ⚡ Blade Style
              </button>
              <button onClick={() => setActiveTab('sounds')}
                className={`flex-1 text-sm py-1.5 rounded-md transition-colors font-medium ${activeTab === 'sounds' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                🔊 Sounds {selectedFont.scanned && <span className="ml-1 text-xs text-green-400">✓</span>}
              </button>
            </div>

            {activeTab === 'style' && (
              <div className="space-y-4">
                {blades.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-8">Add blades in the Hardware step first.</p>
                )}
                {syncedStyles(selectedFont).map((style, i) => (
                  <BladeEditor key={i} style={style}
                    label={blades.length === 1 ? 'Blade' : `Blade ${i + 1}`}
                    uiMode={uiMode}
                    onChange={s => updateBladeStyle(selectedFont.id, i, s)} />
                ))}
              </div>
            )}

            {activeTab === 'sounds' && (
              <SoundSection font={selectedFont} onUpdate={patch => updateFont(selectedFont.id, patch)} />
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-600 text-sm">
            Select a font to edit
          </div>
        )}
      </div>
    </div>
  );
}
