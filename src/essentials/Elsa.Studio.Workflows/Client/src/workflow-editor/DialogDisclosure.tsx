import { useId, useState, type ReactNode } from "react";
import stylesUrl from "./DialogDisclosure.css?url&no-inline";

const stylesHref = import.meta.env.PROD && stylesUrl.startsWith("/")
  ? new URL(stylesUrl.slice(1), import.meta.url).href
  : stylesUrl;

export function DialogDisclosure({ title, hint, className, children }: {
  title: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return <>
    <link rel="stylesheet" href={stylesHref} />
    <section className={`wf-dialog-disclosure${className ? ` ${className}` : ""}`}>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)}>
        <span aria-hidden="true">{open ? "−" : "+"}</span>
        <strong>{title}</strong>
        {hint ? <span className="wf-dialog-disclosure-hint">{hint}</span> : null}
      </button>
      <div id={id} hidden={!open}>{children}</div>
    </section>
  </>;
}
