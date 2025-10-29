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
