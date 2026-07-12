import {
  type CSSProperties,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";

export interface AnchoredPopoverOptions {
  gap?: number;
  viewportPadding?: number;
  maxHeight?: number;
  minWidth?: number;
}

export interface AnchoredPopoverPosition {
  placement: "top" | "bottom";
  top: number;
  left: number;
  width: number;
  maxHeight: number;
}

export interface AnchoredPopoverProps extends AnchoredPopoverOptions {
  anchorRef: RefObject<HTMLElement | null>;
  open: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
  onDismiss?(): void;
}

const defaultOptions: Required<AnchoredPopoverOptions> = {
  gap: 6,
  viewportPadding: 8,
  maxHeight: 240,
  minWidth: 0
};

export function calculateAnchoredPopoverPosition(
  anchor: DOMRect,
  popover: Pick<DOMRect, "width" | "height">,
  viewport: { width: number; height: number },
  options: AnchoredPopoverOptions = {}
): AnchoredPopoverPosition {
  const settings = { ...defaultOptions, ...options };
  const availableBelow = Math.max(0, viewport.height - settings.viewportPadding - anchor.bottom - settings.gap);
  const availableAbove = Math.max(0, anchor.top - settings.viewportPadding - settings.gap);
  const desiredHeight = Math.min(popover.height, settings.maxHeight);
  const placement = availableBelow >= desiredHeight || availableBelow >= availableAbove ? "bottom" : "top";
  const availableHeight = placement === "bottom" ? availableBelow : availableAbove;
  const maxHeight = Math.min(settings.maxHeight, availableHeight);
  const maxWidth = Math.max(0, viewport.width - settings.viewportPadding * 2);
  const width = Math.min(maxWidth, Math.max(settings.minWidth, anchor.width, popover.width));
  const left = clamp(anchor.left, settings.viewportPadding, Math.max(settings.viewportPadding, viewport.width - settings.viewportPadding - width));
  const renderedHeight = Math.min(popover.height, maxHeight);
  const top = placement === "bottom"
    ? anchor.bottom + settings.gap
    : anchor.top - settings.gap - renderedHeight;

  return { placement, top, left, width, maxHeight };
}

export function AnchoredPopover({
  anchorRef,
  open,
  children,
  className,
  id,
  onDismiss,
  ...options
}: AnchoredPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<AnchoredPopoverPosition | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    const popover = popoverRef.current;
    if (!anchor || !popover) return;

    const anchorRect = anchor.getBoundingClientRect();
    if (anchorRect.width === 0 && anchorRect.height === 0) return;
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    if (!isVisible(anchorRect, viewport)) {
      onDismiss?.();
      return;
    }

    setPosition(calculateAnchoredPopoverPosition(
      anchorRect,
      popover.getBoundingClientRect(),
      viewport,
      optionsRef.current
    ));
  }, [anchorRef, onDismiss]);

  useLayoutEffect(() => {
    if (!open) {
      setPosition(null);
      return;
    }
    updatePosition();
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const handleViewportChange = () => updatePosition();
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);

    const observer = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(handleViewportChange);
    if (anchorRef.current) observer?.observe(anchorRef.current);
    if (popoverRef.current) observer?.observe(popoverRef.current);

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
      observer?.disconnect();
    };
  }, [anchorRef, open, updatePosition]);

  useEffect(() => {
    if (!open || !onDismiss) return;
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && !anchorRef.current?.contains(target) && !popoverRef.current?.contains(target)) onDismiss();
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [anchorRef, onDismiss, open]);

  if (!open || typeof document === "undefined") return null;

  const style: CSSProperties = {
    position: "fixed",
    zIndex: 1000,
    top: position?.top ?? 0,
    left: position?.left ?? 0,
    width: position?.width,
    maxHeight: position?.maxHeight,
    visibility: position ? "visible" : "hidden"
  };

  return createPortal(
    <div
      ref={popoverRef}
      id={id}
      className={["studio-anchored-popover", className].filter(Boolean).join(" ")}
      data-placement={position?.placement}
      style={style}
    >
      {children}
    </div>,
    document.body
  );
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function isVisible(rect: DOMRect, viewport: { width: number; height: number }) {
  return rect.bottom > 0 && rect.right > 0 && rect.top < viewport.height && rect.left < viewport.width;
}
