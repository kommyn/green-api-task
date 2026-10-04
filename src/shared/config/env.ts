const raw = {
  VITE_API_BASE: import.meta.env.VITE_API_BASE,
};

const REQUIRED = ["VITE_API_BASE"] as const;

const missing = REQUIRED.filter((key) => !raw[key]);

if (missing.length > 0) {
  throw new Error(
    `Incorrect build configuration: missing ${missing.join(", ")} envs`,
  );
}

export const env = Object.freeze({
  apiBase: raw.VITE_API_BASE,
  isDev: import.meta.env.DEV,
});
