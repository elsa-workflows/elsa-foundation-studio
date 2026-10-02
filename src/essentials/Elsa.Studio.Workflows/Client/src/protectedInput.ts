import type { StudioActivityInputDescriptor, StudioExpressionDescriptor } from "@elsa-workflows/studio-sdk";
import type { ActivityNode } from "./workflowTypes";
import {
  acceptsOnlySecretReference,
  getInputPropertyName,
  isEmptyExpressionValue,
  planExpressionModeTransition,
  type ExpressionModeTransition
} from "./activityProperties";

// Rules for protected inputs: masked inputs, whose stored literal the properties panel, the canvas summary and the
// run inspector never show in clear text, and secret-only inputs, which bind only a Secret Reference. Kept out of
// `activityProperties.ts`, which ships in the Workflows entry chunk: only those deferred surfaces need these.

/** Whether the input is masked: it carries a password hint, or the activity declares it sensitive or secret-only. */
export function isMaskedInput(descriptor: StudioActivityInputDescriptor) {
  return descriptor.uiHint?.toLowerCase() === "password" || descriptor.isSensitive === true || acceptsOnlySecretReference(descriptor);
}

/**
 * Plans switching an input from one editing mode to another. A masked literal is never carried into another
 * syntax, where it would show as clear text: the target starts from its default, and discarding a stored value
 * asks first, like any other lossy switch. Every other switch is planned by `planExpressionModeTransition`.
 */
export function planInputSyntaxTransition(
  descriptor: StudioActivityInputDescriptor,
  sourceMode: StudioExpressionDescriptor["editingMode"],
  targetMode: StudioExpressionDescriptor["editingMode"],
  value: unknown,
  targetDefaultValue: unknown
): ExpressionModeTransition {
  if (isMaskedInput(descriptor) && sourceMode === "literal" && targetMode !== "literal") {
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
