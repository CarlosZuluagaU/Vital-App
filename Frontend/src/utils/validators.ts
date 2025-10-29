export function isValidEmail(email: string): boolean {
  const e = email.trim();
  // Simple y efectiva: algo@algo.algo (sin espacios)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export type PasswordCheck = {
  ok: boolean;
  errors: string[];
};

export function validatePassword(pwd: string): PasswordCheck {
  const errors: string[] = [];
  if (pwd.length < 8) errors.push("Mínimo 8 caracteres.");
  if (/\s/.test(pwd)) errors.push("No puede contener espacios.");
  if (!/[A-Z]/.test(pwd)) errors.push("Debe incluir al menos 1 mayúscula.");
  if (!/[a-z]/.test(pwd)) errors.push("Debe incluir al menos 1 minúscula.");
  if (!/[0-9]/.test(pwd)) errors.push("Debe incluir al menos 1 dígito.");
  return { ok: errors.length === 0, errors };
}

export function passwordsMatch(a: string, b: string): boolean {
  return a === b;
}
