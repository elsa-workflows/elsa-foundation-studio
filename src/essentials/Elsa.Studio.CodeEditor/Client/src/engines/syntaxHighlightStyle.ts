import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import type { Tag } from "@lezer/highlight";
import type { StudioCodeSyntaxKind } from "../types";
import { studioCodeSyntaxClass, studioCodeSyntaxKinds } from "./syntaxTokens";

const syntaxTags: Readonly<Record<StudioCodeSyntaxKind, readonly Tag[]>> = {
  keyword: [tags.keyword, tags.self, tags.controlKeyword, tags.definitionKeyword, tags.moduleKeyword, tags.modifier],
  operator: [tags.operator, tags.punctuation, tags.separator],
  literal: [tags.literal, tags.bool, tags.null, tags.atom],
  number: [tags.number, tags.integer, tags.float],
  string: [tags.string, tags.character, tags.attributeValue, tags.regexp, tags.escape],
  comment: [tags.comment, tags.lineComment, tags.blockComment, tags.docComment],
  variable: [tags.variableName],
  property: [tags.propertyName, tags.attributeName],
  type: [tags.typeName, tags.className, tags.namespace],
  tag: [tags.tagName],
  // Keep the modifier after `variable` so function identifiers use the more specific role.
  function: [tags.function(tags.variableName), tags.function(tags.propertyName)]
};

export const studioCodeHighlightStyle = HighlightStyle.define(
  studioCodeSyntaxKinds.flatMap(kind => syntaxTags[kind].map(tag => ({
    tag,
    class: studioCodeSyntaxClass(kind)
  })))
);
