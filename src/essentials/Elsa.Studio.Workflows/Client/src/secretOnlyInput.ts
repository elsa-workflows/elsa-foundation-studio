import type { StudioActivityInputDescriptor } from "@elsa-workflows/studio-sdk";
import type { ActivityNode } from "./workflowTypes";
import { acceptsOnlySecretReference, getInputPropertyName, isEmptyExpressionValue } from "./activityProperties";

// Kept out of `activityProperties.ts`, which ships in the Workflows entry chunk: only the properties panel
// needs this, and it loads deferred.

/**
 * Clearing a secret-only input unbinds it: the property is removed from the activity, so nothing is
 * serialized for it and no empty value pretends to be one. Returns the unbound activity, or `null` when
 * `nextValue` is not a clear of a secret-only input (the caller then writes it as usual).
 */
export function clearSecretOnlyInput(activity: ActivityNode, descriptor: StudioActivityInputDescriptor, nextValue: unknown): ActivityNode | null {
  if (!acceptsOnlySecretReference(descriptor) || !isEmptyExpressionValue(nextValue)) return null;
  const { [getInputPropertyName(descriptor)]: _unbound, ...rest } = activity;
  void _unbound;
  return rest as ActivityNode;
}
