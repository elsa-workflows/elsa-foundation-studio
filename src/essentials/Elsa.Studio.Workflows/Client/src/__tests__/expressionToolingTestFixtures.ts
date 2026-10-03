import type {
  StudioExpressionAuthoringContext,
  StudioExpressionToolingCapabilities,
  StudioExpressionToolingDescriptor,
  StudioExpressionToolingResult,
  StudioExpressionToolingState
} from "@elsa-workflows/studio-sdk";

const allToolingCapabilities: StudioExpressionToolingCapabilities = {
  highlighting: true,
  completion: true,
  hover: true,
  signatures: true,
  formatting: false,
  localDiagnostics: true,
  semanticValidation: true
};

export function expressionToolingDescriptorResult(
  expressionType: string,
  descriptor: StudioExpressionToolingDescriptor
): StudioExpressionToolingResult<StudioExpressionToolingDescriptor[]> {
  return {
    state: "ready",
    contractVersion: 1,
    expressionType,
    data: [descriptor]
  };
}

export function expressionAuthoringContextResult(options: {
  state?: StudioExpressionToolingState;
  expressionType?: string;
  contextVersion?: string;
  semanticValidation?: boolean;
} = {}): StudioExpressionToolingResult<StudioExpressionAuthoringContext> {
  const contextVersion = options.contextVersion ?? "context-1";
  const data: StudioExpressionAuthoringContext = {
    version: contextVersion,
    workflowInputs: [],
    visibleVariables: [],
    visibleActivityOutputs: []
  };
  if (options.semanticValidation !== undefined) {
    data.capabilities = { ...allToolingCapabilities, semanticValidation: options.semanticValidation };
  }

  return {
    state: options.state ?? "ready",
    contractVersion: 1,
    expressionType: options.expressionType ?? "JavaScript",
    contextVersion,
    data
  };
}
