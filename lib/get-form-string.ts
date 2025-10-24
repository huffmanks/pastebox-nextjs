export function getFormString(key: string, formData: FormData) {
  const val = formData.get(key);
  return typeof val === "string" ? val : val ? String(val) : null;
}
