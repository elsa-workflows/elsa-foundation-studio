import { Plus } from "lucide-react";

/**
 * The editorial layout's inline authoring entry point: a pill at the foot of the canvas that opens the
 * activity picker next to itself. It replaces reaching for a toolbox — together with the always-visible
 * "+" on every connection — so steps are added where the flow is being read.
 */
export function AddStepButton({ disabled, onOpen }: {
  disabled?: boolean;
  onOpen(anchor: { clientX: number; clientY: number }): void;
}) {
  return (
    <button
      type="button"
      className="wf-add-step"
      disabled={disabled}
      onClick={event => {
        const rect = event.currentTarget.getBoundingClientRect();
        onOpen({ clientX: rect.left + rect.width / 2, clientY: rect.top });
      }}
    >
      <Plus size={15} aria-hidden="true" /> Add step
    </button>
  );
}
