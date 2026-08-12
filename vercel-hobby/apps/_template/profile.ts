export const APP = {
  id: "myapp",
  name: "My Application",
  settingsKey: "settings.latest",
  snapKind: "settings",
} as const;

/** Replace with this app's JSON blob. */
export type AppSettings = {
  version: 1;
  savedAt: string;
};
