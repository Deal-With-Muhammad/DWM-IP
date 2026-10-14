"use client";

import { useState } from "react";
import { Button, Tooltip, toast } from "@heroui/react";
import { Check, Copy } from "lucide-react";

import { trackEvent } from "@/lib/dwm";

export function CopyButton({
  value,
  label = "Copy",
  event,
  size = "md",
  variant = "secondary",
}: {
  value: string;
  label?: string;
  event?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (event) trackEvent(event);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.danger("Couldn't copy. Select the text and copy it manually.");
    }
  }

  return (
    <Tooltip delay={300}>
      <Button
        isIconOnly
        size={size}
        variant={variant}
        aria-label={`${label}: ${value}`}
        onPress={copy}
        className="rounded-full"
      >
        {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
      </Button>
      <Tooltip.Content>{copied ? "Copied!" : label}</Tooltip.Content>
    </Tooltip>
  );
}
