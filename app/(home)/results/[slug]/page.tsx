import Link from "next/link";

import { PackageCheckIcon, PackageSearchIcon } from "lucide-react";

import { createQrCode } from "@/actions/qr-code";

import CopyInput from "@/components/copy-input";
import ShareExportButtonGroup from "@/components/share-export-button-group";
import { Button } from "@/components/ui/button";

export default async function ResultsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const boxUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${slug}`;

  const svgs = await createQrCode(boxUrl);

  return (
    <section className="mx-auto max-w-xl">
      <PackageCheckIcon className="mb-6 size-20 [&>path:first-of-type]:stroke-green-500" />
      <h1 className="mb-1 text-xl font-bold">Box created successfully</h1>
      <p className="text-muted-foreground mb-4">You can now access it with the following link:</p>

      <CopyInput url={boxUrl} />

      {svgs && (
        <div className="flex flex-col items-center gap-12 rounded-sm p-1 sm:flex-row sm:border sm:p-4">
          <div>
            <>
              <div
                className="w-115 max-w-[calc(100vw-1rem)] overflow-hidden sm:-m-4 sm:size-64 sm:rounded-tl-sm sm:rounded-bl-sm dark:hidden"
                dangerouslySetInnerHTML={{
                  __html: svgs.lightSvg,
                }}
              />
              <div
                className="hidden w-115 max-w-[calc(100vw-1rem)] overflow-hidden sm:-m-4 sm:size-64 sm:rounded-tl-sm sm:rounded-bl-sm dark:block"
                dangerouslySetInnerHTML={{
                  __html: svgs.darkSvg,
                }}
              />
            </>
          </div>
          <div className="-order-1 w-full sm:order-1">
            <h2 className="mb-1 text-lg font-medium">View the box anywhere</h2>
            <p className="text-muted-foreground mb-4 text-sm">Scan, share or export the QR code.</p>

            <ShareExportButtonGroup
              url={boxUrl}
              svgs={svgs}
            />
            <Button
              className="mt-4 w-full cursor-pointer"
              aria-label="View your box."
              asChild>
              <Link href={`/${slug}`}>
                <PackageSearchIcon />
                <span>View</span>
              </Link>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
