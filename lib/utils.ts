import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function castError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }

  if (error === null || error === undefined) {
    return new Error("Unknown error");
  }

  const isObject = typeof error === "object";

  if (isObject) {
    return Object.assign(new Error("Unknown error"), error);
  }

  return new Error(String(error));
}

export function getFormString(key: string, formData: FormData) {
  const val = formData.get(key);
  return typeof val === "string" ? val : val ? String(val) : null;
}

export function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(i ? 1 : 0)} ${sizes[i]}`;
}

export function pluralize(word: string, length: number) {
  if (length === 1) {
    return word;
  }

  const lowerWord = word.toLowerCase();

  if (
    lowerWord.endsWith("y") &&
    !["a", "e", "i", "o", "u"].includes(lowerWord.charAt(lowerWord.length - 2))
  ) {
    return `${word.slice(0, -1)}ies`;
  }

  if (lowerWord.endsWith("fe")) {
    return `${word.slice(0, -2)}ves`;
  }

  if (lowerWord.endsWith("f") && !lowerWord.endsWith("ff")) {
    return `${word.slice(0, -1)}ves`;
  }

  if (
    lowerWord.endsWith("s") ||
    lowerWord.endsWith("z") ||
    lowerWord.endsWith("x") ||
    lowerWord.endsWith("sh") ||
    lowerWord.endsWith("ch")
  ) {
    return `${word}es`;
  }

  return `${word}s`;
}

export function countNoteElements<T extends object>(data: T) {
  let count = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const traverse = (obj: any) => {
    if (typeof obj !== "object" || obj === null) {
      return;
    }

    if (Array.isArray(obj)) {
      for (const item of obj) {
        traverse(item);
      }
    } else {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (key === "text") {
            count++;
          }

          traverse(obj[key]);
        }
      }
    }
  };

  traverse(data);
  return count;
}

export function getRelativeTimeLeft(msLeft: number): string {
  if (msLeft <= 0) return "Time has expired";

  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  let diffMs = msLeft;

  const days = Math.floor(diffMs / DAY);
  diffMs -= days * DAY;

  const hours = Math.floor(diffMs / HOUR);
  diffMs -= hours * HOUR;

  const minutes = Math.floor(diffMs / MINUTE);
  diffMs -= minutes * MINUTE;

  const seconds = Math.floor(diffMs / SECOND);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (parts.length < 1 && seconds > 0) return "Less than a minute";

  return `${parts.join(" ")}`;
}
