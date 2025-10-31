export const EXPIRY_TIME = 24 * 60 * 60 * 1000;

export const slugOptions = {
  lower: true,
  strict: true,
  trim: true,
};

export const UPLOADS_DIR = process.env.NODE_ENV === "development" ? "public/uploads" : "uploads";
