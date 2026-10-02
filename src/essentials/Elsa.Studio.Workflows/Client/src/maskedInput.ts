import type { StudioActivityInputDescriptor, StudioExpressionDescriptor } from "@elsa-workflows/studio-sdk";
import type { ActivityNode } from "./workflowTypes";
import {
  acceptsOnlySecretReference,
  getInputPropertyName,
  isEmptyExpressionValue,
  planExpressionModeTransition,
  type ExpressionModeTransition
} from "./activityProperties";

// Rules for masked inputs: an input with a password hint, or one the activity declares sensitive or secret-only.
// Secret-only inputs are a subset of masked inputs that bind only a Secret Reference; the properties panel gives
// them their own branch, the secret picker. Kept out of `activityProperties.ts`, which ships in the Workflows entry
// chunk: only deferred surfaces (the properties panel, the canvas summary and the run inspector) use these.

/** Whether the input is masked: it carries a password hint, or the activity declares it sensitive or secret-only. */
export function isMaskedInput(descriptor: StudioActivityInputDescriptor) {
  return descriptor.uiHint?.toLowerCase() === "password" || descriptor.isSensitive === true || acceptsOnlySecretReference(descriptor);
}

/**
 * Whether a masked input may show what it stores under an expression of this editing mode: only author code
 * (`text`: JavaScript, Liquid) and a reference by name (`reference`: Variable, Input, Secret). Under every other
 * mode, `literal`, `structured` such as Object, a syntax without a descriptor and any mode added later, the stored
 * value is the input's value itself and stays masked.
 */
export function showsMaskedValue(editingMode: StudioExpressionDescriptor["editingMode"] | undefined) {
  return editingMode === "text" || editingMode === "reference";
}

/**
 * Plans switching an input from one editing mode to another. A masked value is never carried into a syntax that
 * shows what it stores: the target starts from its default, and discarding a stored value asks first, like any
 * other lossy switch. Every other switch is planned by `planExpressionModeTransition`.
 */
export function planInputSyntaxTransition(
  descriptor: StudioActivityInputDescriptor,
  sourceMode: StudioExpressionDescriptor["editingMode"],
  targetMode: StudioExpressionDescriptor["editingMode"],
  value: unknown,
  targetDefaultValue: unknown
): ExpressionModeTransition {
  if (isMaskedInput(descriptor) && !showsMaskedValue(sourceMode) && showsMaskedValue(targetMode)) {
    return { requiresConfirmation: !isEmptyExpressionValue(value), nextValue: targetDefaultValue };
  }
  return planExpressionModeTransition(sourceMode, targetMode, descriptor.typeName, value, targetDefaultValue);
}

/**
 * Clearing a secret-only input unbinds it: the property is removed from the activity, so nothing is
 * serialized for it and no empty value pretends to be one. Returns the unbound activity, or `null` when
 * `nextValue` is not a clear of a secret-only input (the caller then writes it as usual).
 */
export function clearSecretOnlyInput(activity: ActivityNode, descriptor: StudioActivityInputDescriptor, nextValue: unknown): ActivityNode | null {
  if (!acceptsOnlySecretReference(descriptor) || !isEmptyExpressionValue(nextValue)) return null;
  const { [getInputPropertyName(descriptor)]: _unbound, ...rest } = activity;
  return rest as ActivityNode;
}
