/** Mirrors php/apps/fuwari.php */
export const FUWARI_APP = {
  id: "fuwari",
  name: "Fuwari REC",
  settingsKey: "settings.latest",
  snapKind: "settings",
} as const;

/** What Fuwari pushes as settings.latest — app-specific, not core. */
export type FuwariRemoteSettings = {
  version: 1;
  savedAt: string;
  master: {
    volume: number;
    pitchSemitones: number;
    formantDb: number;
    reverbMix: number;
    compressor: number;
    preset: string;
  };
  range?: {
    minHz: number | null;
    maxHz: number | null;
    minNote: string | null;
    maxNote: string | null;
  };
  mediaRange?: {
    minNote: string;
    maxNote: string;
    minHz: number;
    maxHz: number;
    spanSemitones: number;
    trackName: string;
    usedVocalIsolation: boolean;
  } | null;
  bpm: number;
};
