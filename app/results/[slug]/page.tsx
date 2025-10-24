import { headers } from "next/headers";

import { PackageCheckIcon } from "lucide-react";

import CopyInput from "@/components/copy-input";

export default async function ResultsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const h = await headers();
  const host = h.get("host");
  const protocol = h.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;

  const boxLink = `${baseUrl}/box/${slug}`;

  const res = await fetch(`${baseUrl}/api/qr?box_link=${encodeURIComponent(boxLink)}`, {
    cache: "no-store",
  });
  const svg = await res.text();

  return (
    <section className="mx-auto max-w-2xl">
      <PackageCheckIcon className="mb-4 size-20 [&>path:first-of-type]:stroke-green-500" />
      <h1 className="mb-2 text-xl font-bold">Box created successfully</h1>
      <p className="text-muted-foreground mb-6">You can now access it with the following link:</p>

      <CopyInput link={`${baseUrl}/box/${slug}`} />

      {svg && (
        <div className="flex h-48 w-120 max-w-full justify-between gap-12 rounded-sm border-2 p-4">
          <div
            className="-m-4 size-48"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
          <div>
            <h2 className="text-lg font-medium">Scan the QR code</h2>
          </div>
        </div>
      )}
    </section>
  );
}
