import { BoxSelect, FileSelect } from "@/db/schema";

export type BoxWithFiles = BoxSelect & {
  files?: FileSelect[];
};
