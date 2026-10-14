"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button, Tooltip } from "@heroui/react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- theme is only known on the client
  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <Tooltip delay={400}>
      <Button
        isIconOnly
        variant="ghost"
        size="sm"
        aria-label={label}
        onPress={() => setTheme(isDark ? "light" : "dark")}
        className="rounded-full"
      >
        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </Button>
      <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip>
  );
}
