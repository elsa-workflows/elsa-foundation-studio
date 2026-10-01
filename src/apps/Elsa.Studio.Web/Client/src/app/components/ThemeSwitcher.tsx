import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, Contrast, Moon, Palette, Sun, SunDim, type LucideIcon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { allThemeModes, getSupportedThemeModes, getThemeModeDefinition, isThemeMode, themeModeLabels, type ThemeMode } from "../themes/presets";
import "./ThemeSwitcher.css";

const modeIcons: Record<ThemeMode, LucideIcon> = {
  light: Sun,
  dark: Moon,
  dim: SunDim,
  "high-contrast": Contrast
};

// High contrast is an accessibility mode, so it stays in the menu rather than the quick control.
const quickModes: readonly ThemeMode[] = ["light", "dark", "dim"];

/** Compact radiogroup for the base modes; offers only the ones the current theme defines. */
function QuickModeToggle() {
  const { mode, setMode, supportedModes } = useTheme();
  const options = quickModes.filter(themeMode => supportedModes.includes(themeMode));
  const optionRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});

  if (options.length < 2) return null;

  // High contrast is not a quick option, so nothing is checked then; keep the group reachable by Tab.
  const tabStop = options.includes(mode) ? mode : options[0];

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const index = options.findIndex(themeMode => optionRefs.current[themeMode] === event.target);
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown" ? (index + 1) % options.length
      : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (index - 1 + options.length) % options.length
      : event.key === "Home" ? 0
      : event.key === "End" ? options.length - 1
      : -1;
    if (index < 0 || next < 0) return;
    event.preventDefault();
    setMode(options[next]);
    optionRefs.current[options[next]]?.focus();
  };

  return (
    <div className="theme-mode-toggle" role="radiogroup" aria-label="Colour mode" onKeyDown={handleKeyDown}>
      {options.map(themeMode => {
        const Icon = modeIcons[themeMode];
        return (
          <button
            key={themeMode}
            ref={element => { optionRefs.current[themeMode] = element; }}
            type="button"
            role="radio"
            className="theme-mode-toggle-option"
            data-mode={themeMode}
            aria-checked={mode === themeMode}
            aria-label={themeModeLabels[themeMode]}
            title={`${themeModeLabels[themeMode]} mode`}
            tabIndex={themeMode === tabStop ? 0 : -1}
            onClick={() => setMode(themeMode)}
          >
            <Icon size={16} aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}

export function ThemeSwitcher() {
  const { currentTheme, mode, setTheme, setMode, availableThemes, supportedModes } = useTheme();

  return (
    <div className="theme-switcher-container">
      <QuickModeToggle />

      {/* Theme Selector Dropdown (Radix: keyboard nav, Esc, focus trap/restore, ARIA menu) */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className="theme-selector-button"
            aria-label="Select theme"
            title={`Theme: ${currentTheme.name} · ${themeModeLabels[mode]}`}
          >
            <Palette size={18} />
            <span className="theme-selector-swatch" aria-hidden="true">
              {supportedModes.map(themeMode => (
                <span
                  key={themeMode}
                  className="theme-selector-swatch-dot"
                  style={{ backgroundColor: getThemeModeDefinition(currentTheme, themeMode)?.primary }}
                />
              ))}
            </span>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="theme-dropdown" align="end" sideOffset={8}>
            <DropdownMenu.Label className="theme-dropdown-header">
              <span className="theme-dropdown-title">Appearance</span>
            </DropdownMenu.Label>
            <DropdownMenu.RadioGroup
              className="theme-mode-group"
              value={mode}
              onValueChange={value => isThemeMode(value) && setMode(value)}
            >
              {allThemeModes.map(themeMode => {
                const Icon = modeIcons[themeMode];
                const available = supportedModes.includes(themeMode);
                return (
                  <DropdownMenu.RadioItem
                    key={themeMode}
                    value={themeMode}
                    className="theme-mode-item"
                    disabled={!available}
                    title={available ? themeModeLabels[themeMode] : `${currentTheme.name} has no ${themeModeLabels[themeMode].toLowerCase()} mode`}
                    // Keep the menu open so modes can be compared in place.
                    onSelect={event => event.preventDefault()}
                  >
                    <Icon size={16} aria-hidden="true" />
                    <span>{themeModeLabels[themeMode]}</span>
                  </DropdownMenu.RadioItem>
                );
              })}
            </DropdownMenu.RadioGroup>

            <DropdownMenu.Label className="theme-dropdown-header">
              <span className="theme-dropdown-title">Theme</span>
            </DropdownMenu.Label>
            <div className="theme-list">
              {availableThemes.map(theme => (
                <DropdownMenu.Item
                  key={theme.id}
                  className={`theme-item ${currentTheme.id === theme.id ? "active" : ""}`}
                  aria-label={theme.name}
                  onSelect={() => setTheme(theme.id)}
                  title={theme.description}
                >
                  <span className="theme-item-preview" aria-hidden="true">
                    {getSupportedThemeModes(theme).map(themeMode => (
                      <span
                        key={themeMode}
                        className={`theme-color-dot ${themeMode}`}
                        style={{ backgroundColor: getThemeModeDefinition(theme, themeMode)?.primary }}
                      />
                    ))}
                  </span>
                  <span className="theme-item-name">{theme.name}</span>
                  {currentTheme.id === theme.id && (
                    <Check size={16} className="theme-item-checkmark" aria-hidden="true" />
                  )}
                </DropdownMenu.Item>
              ))}
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
