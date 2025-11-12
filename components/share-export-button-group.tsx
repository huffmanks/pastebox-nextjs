"use client";

import { ChevronDownIcon, CopyIcon, FileCodeIcon, ImageIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { useCopy } from "@/hooks/use-copy";
import { downloadBase64File, downloadSvgFile, svgToBase64Png } from "@/lib/download";

import ShareButton from "@/components/share-button";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  url: string;
  svgs: {
    darkSvg: string;
    lightSvg: string;
  };
}

export default function ShareExportButtonGroup({ url, svgs }: Props) {
  const { copy } = useCopy();
  const { resolvedTheme } = useTheme();

  const svg = resolvedTheme === "light" ? svgs.lightSvg : svgs.darkSvg;

  async function handleCopyQrCode() {
    try {
      await copy(svg);

      toast.success("Copied SVG to clipboard.");
    } catch (_error) {
      toast.error("Copying SVG failed.");
    }
  }

  function downloadSvgQrCode() {
    downloadSvgFile({ svg, fileName: "pastebox-qr-code.svg" });
    toast.success("Downloaded pastebox-qr-code.svg");
  }

  async function downloadPngQrCode() {
    const base64 = await svgToBase64Png({ svg, width: 512, height: 512 });
    downloadBase64File({ base64, fileName: "pastebox-qr-code.png" });
    toast.success("Downloaded pastebox-qr-code.png");
  }

  return (
    <ButtonGroup className="w-[calc(100%-41px)]">
      <ShareButton url={url} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="cursor-pointer">
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="[--radius:1rem]">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleCopyQrCode}>
              <CopyIcon />
              <span>Copy SVG</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={downloadSvgQrCode}>
              <FileCodeIcon />
              <span>Download SVG</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={downloadPngQrCode}>
              <ImageIcon />
              <span>Download PNG</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
