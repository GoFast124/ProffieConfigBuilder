import type { BoardProfile, BoardVersion } from '../../types/config';

export const BOARD_PROFILES: Record<BoardVersion, BoardProfile> = {
  v1: {
    id: 'v1',
    label: 'ProffieBoard V1',
    maxBlades: 2,
    defaultLedCount: 130,
    powerPins: ['bladePowerPin2', 'bladePowerPin3'],
    bladePin: 'bladePin',
    dataPin: 'bladePin',
  },
  'v2.2': {
    id: 'v2.2',
    label: 'ProffieBoard V2.2',
    maxBlades: 4,
    defaultLedCount: 144,
    powerPins: ['bladePowerPin2', 'bladePowerPin3'],
    bladePin: 'bladePin',
    dataPin: 'bladePin',
  },
  'v3.9': {
    id: 'v3.9',
    label: 'ProffieBoard V3.9',
    maxBlades: 6,
    defaultLedCount: 144,
    powerPins: ['bladePowerPin2', 'bladePowerPin3'],
    bladePin: 'bladePin',
    dataPin: 'bladePin',
  },
  lite: {
    id: 'lite',
    label: 'Proffieboard Lite',
    maxBlades: 2,
    defaultLedCount: 130,
    powerPins: ['bladePowerPin2'],
    bladePin: 'bladePin',
    dataPin: 'bladePin',
  },
};

export function getBoardProfile(version: BoardVersion): BoardProfile {
  return BOARD_PROFILES[version];
}

export const BOARD_OPTIONS = Object.values(BOARD_PROFILES);
