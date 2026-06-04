export const PROFFIE_SOUND_SLOTS = [
  { slot: 'hum', label: 'Hum (idle)', required: true },
  { slot: 'out', label: 'Ignition', required: true },
  { slot: 'in', label: 'Retraction', required: true },
  { slot: 'boot', label: 'Boot', required: false },
  { slot: 'swing', label: 'Swing', required: false },
  { slot: 'clash', label: 'Clash', required: false },
  { slot: 'blst', label: 'Blaster deflect', required: false },
  { slot: 'lockup', label: 'Lockup', required: false },
  { slot: 'drag', label: 'Drag', required: false },
  { slot: 'force', label: 'Force', required: false },
  { slot: 'preon', label: 'Pre-ignition', required: false },
  { slot: 'pstoff', label: 'Post-retraction', required: false },
  { slot: 'slsh', label: 'Slash', required: false },
  { slot: 'stab', label: 'Stab', required: false },
  { slot: 'spin', label: 'Spin', required: false },
  { slot: 'pwroff', label: 'Power off button', required: false },
  { slot: 'battery', label: 'Battery level beep', required: false },
  { slot: 'font', label: 'Font announcement', required: false },
  { slot: 'track', label: 'Music track', required: false },
];

const SLOT_NAMES = new Set(PROFFIE_SOUND_SLOTS.map(s => s.slot));

function stripNumberSuffix(filename: string): string {
  return filename.replace(/\d+$/, '');
}

function isAudio(filename: string): boolean {
  return /\.(wav|mp3|ogg|flac)$/i.test(filename);
}

export interface ParsedSlotMap {
  [slot: string]: string[];
}

export function parseFileList(filenames: string[]): ParsedSlotMap {
  const result: ParsedSlotMap = {};

  for (const raw of filenames) {
    if (!isAudio(raw)) continue;
    const base = raw.replace(/\.(wav|mp3|ogg|flac)$/i, '').toLowerCase();
    const slotCandidate = stripNumberSuffix(base);

    if (SLOT_NAMES.has(slotCandidate)) {
      if (!result[slotCandidate]) result[slotCandidate] = [];
      result[slotCandidate].push(raw);
    }
  }

  return result;
}

export async function scanDirectory(
  dirHandle: FileSystemDirectoryHandle
): Promise<string[]> {
  const files: string[] = [];

  async function walk(handle: FileSystemDirectoryHandle, prefix = '') {
    for await (const [name, entry] of handle.entries()) {
      if (entry.kind === 'file') {
        files.push(prefix ? `${prefix}/${name}` : name);
      } else if (entry.kind === 'directory') {
        await walk(entry as FileSystemDirectoryHandle, prefix ? `${prefix}/${name}` : name);
      }
    }
  }

  await walk(dirHandle);
  return files;
}

export function getMissingRequiredSlots(slotMap: ParsedSlotMap): string[] {
  return PROFFIE_SOUND_SLOTS
    .filter(s => s.required && !slotMap[s.slot])
    .map(s => s.slot);
}
