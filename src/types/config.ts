export type BladeType = 'WS2811' | 'WS2812B' | 'APA102' | 'SIMPLE_LED' | 'NEOPIXEL';

export type EffectType = 'none' | 'unstable' | 'fire' | 'shimmer' | 'gradient' | 'rainbow' | 'strobe';

export type ClashEffectType = 'color_change' | 'flare' | 'spark' | 'none';

export interface BladeStyleConfig {
  baseColor: string;
  effect: EffectType;
  gradient: boolean;
  gradientColor: string;
  clashColor: string;
  clashEffect: ClashEffectType;
  swingColorShift: boolean;
  brightness: number;      // 0-100
  rawStyle: string;        // advanced mode override
}

export interface BladeConfig {
  id: string;
  ledCount: number;
  bladeType: BladeType;
  style: BladeStyleConfig;
}

export type BoardVersion = 'v1' | 'v2.2' | 'v3.9' | 'lite';

export interface BoardProfile {
  id: BoardVersion;
  label: string;
  maxBlades: number;
  defaultLedCount: number;
  powerPins: string[];
  bladePin: string;
  dataPin: string;
}

export interface HardwareFeatures {
  // Buttons
  numButtons: 1 | 2 | 3;
  // Audio / motion
  enableAudio: boolean;
  enableMotion: boolean;
  enableSD: boolean;
  // Display / connectivity
  enableOLED: boolean;
  enableBluetooth: boolean;
  enableSerial: boolean;
  // Battery
  batteryLevelOnStart: boolean;
  // Volume
  volume: number;  // 0.0 – 1.0, stored as 0–100 int in UI
}

export interface HardwareConfigState {
  board: BoardVersion;
  blades: BladeConfig[];
  features: HardwareFeatures;
}

// A font preset = one named preset entry in the config:
// a blade style per blade + a sound folder
export interface SoundSlotFile {
  slot: string;
  files: string[];
  selectedFile: string | null;
}

export interface FontPreset {
  id: string;
  name: string;
  // One style per blade (indexed to match hardware.blades)
  bladeStyles: BladeStyleConfig[];
  // Sound font
  folderName: string;
  slots: SoundSlotFile[];
  scanned: boolean;
  trackFile: string;
}

export interface ConfigState {
  hardware: HardwareConfigState;
  fonts: FontPreset[];
  uiMode: 'beginner' | 'advanced';
  activeStep: number;
  activeFontId: string | null;
}

// ── Defaults ────────────────────────────────────────────────────────────────

export const DEFAULT_BLADE_STYLE: BladeStyleConfig = {
  baseColor: '#4fc3f7',
  effect: 'none',
  gradient: false,
  gradientColor: '#ffffff',
  clashColor: '#ffffff',
  clashEffect: 'color_change',
  swingColorShift: false,
  brightness: 100,
  rawStyle: '',
};

export const DEFAULT_BLADE: Omit<BladeConfig, 'id'> = {
  ledCount: 144,
  bladeType: 'WS2811',
  style: DEFAULT_BLADE_STYLE,
};

export const DEFAULT_HARDWARE_FEATURES: HardwareFeatures = {
  numButtons: 2,
  enableAudio: true,
  enableMotion: true,
  enableSD: true,
  enableOLED: false,
  enableBluetooth: false,
  enableSerial: false,
  batteryLevelOnStart: true,
  volume: 100,
};
