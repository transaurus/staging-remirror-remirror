import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { InputRule } from '@remirror/core';
import { NodeExtension } from '@remirror/core';
import { NodeExtensionSpec } from '@remirror/core';
import { NodeSpecOverride } from '@remirror/core';

/**
 * Adds a horizontal line to the editor.
 */
declare class HorizontalRuleExtension extends NodeExtension<HorizontalRuleOptions> {
    get name(): "horizontalRule";
    createTags(): "block"[];
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec;
    /**
     * Inserts a horizontal line into the editor.
     */
    insertHorizontalRule(): CommandFunction;
    createInputRules(): InputRule[];
    /**
     * Updates the transaction after a `horizontalRule` has been inserted to make
     * sure the currently selected node isn't a Horizontal Rule.
     *
     * This should only be called for empty selections.
     */
    private updateFromNodeSelection;
}
export { HorizontalRuleExtension }
export { HorizontalRuleExtension as HorizontalRuleExtension_alias_1 }

declare interface HorizontalRuleOptions {
    /**
     * The name of the node to insert after inserting a horizontalRule.
     *
     * Set to false to prevent adding a node afterwards.
     *
     * @defaultValue 'paragraph'
     */
    insertionNode?: string | false;
}
export { HorizontalRuleOptions }
export { HorizontalRuleOptions as HorizontalRuleOptions_alias_1 }

export declare const insertHorizontalRuleOptions: Remirror.CommandDecoratorOptions;

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      horizontalRule: HorizontalRuleExtension;
    }
  }
}
