# ProffieAI — Proffie Config Builder

A web-based configuration tool for [ProffieOS](https://github.com/profezzorn/ProffieOS) lightsaber boards. Build, preview, and download your `config.h` file without writing a line of C++.

## Features

### Hardware Configuration
- Board selection: ProffieBoard V1, V2.2, V3.9, Lite
- Blade count and type per blade (WS2811, APA102, Simple LED, NeoPixel)
- Button count (1, 2, or 3)
- Volume, brightness, and feature flags (Audio, Motion, SD, OLED, Bluetooth, Serial, Battery announce)

### Font Presets
Each font preset is one entry in the generated `presets[]` array — a blade style paired with a sound folder.

- Add as many font presets as you need
- Drag to reorder (order matches the config)
- Preset Library with ready-to-use styles:
  - **Fett263 OS8** — Ninth Jedi, Fallen Order, Static, Kylo Ren, Unstable Blades (full `StylePtr<Layers<...>>` strings)
  - **Classic** — StyleNormal, StyleFire, StyleRainbow, StyleStrobe, AudioFlicker, Gradient, Pulsing

### Blade Style Builder
- **Visual mode** — color pickers, effect selector, clash/swing settings, brightness slider
- **Raw mode** — direct Proffie style string editor with live preview
- Effects: Solid, Unstable/Voltage Flicker, Fire, Shimmer, Gradient, Rainbow, Strobe
- Clash effects: Color Flash, Flare Burst, Spark Spray

### Animated Blade Preview
Live canvas preview updates as you edit — rendered per-effect:
- Solid glow, unstable per-pixel flicker, fire gradient, shimmer wave, two-color gradient, hue-rotating rainbow, strobe flash

### Sound Font Scanner
- Folder picker via the [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) (Chrome/Edge)
- Auto-detects ProffieOS slot names: `hum`, `out`, `in`, `clash`, `swing`, `blst`, `drag`, `force`, `preon`, and more
- Handles numbered variants (`clash1.wav`, `clash2.wav`)
- Warns on missing required slots, resolves ambiguous matches

### Config Preview & Export
- Live syntax-highlighted `config.h` output (updates as you edit)
- Copy to clipboard or download as `config.h`

### Save / Load Projects
- Save your full setup as a `.proffieai` file (plain JSON)
- Load it back in any browser session
- State also auto-persists to `localStorage`

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in Chrome or Edge.

> **Note:** The sound font folder picker requires Chrome or Edge (File System Access API). All other features work in any modern browser.

## Build

```bash
npm run build
```

Output goes to `dist/` — a static site that can be hosted anywhere.

## Stack

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [highlight.js](https://highlightjs.org) — config syntax highlighting
- [nanoid](https://github.com/ai/nanoid) — unique preset IDs
- HTML5 Canvas — animated blade preview
- HTML5 Drag and Drop — font reordering
- File System Access API — sound folder scanning

## Project Structure

```
src/
  components/
    HardwareConfig/       Board, blade, button and feature settings
    BladeStyleBuilder/    Visual editor + raw style editor + canvas preview
    FontPresetsManager/   Multi-font list with preset library
    ConfigPreview/        Syntax-highlighted output + download
  lib/proffie/
    boardProfiles.ts      Hardware specs per board version
    styleTemplates.ts     Beginner settings → Proffie style strings
    soundFontParser.ts    Folder scanner and slot mapper
    configGenerator.ts    Assembles the final config.h
    presetLibrary.ts      Built-in preset styles
  types/
    config.ts             Shared data model
```

## ProffieOS Compatibility

Generated configs target **ProffieOS 7/8** with `proffieboard_v3_config.h`. Style strings from the preset library are sourced from [Fett263's style library](https://www.fett263.com/fett263-proffieOS7-style-library.html).
