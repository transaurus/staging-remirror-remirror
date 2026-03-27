import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { EditorView } from '@remirror/pm/view';
import { InputRule } from '@remirror/core';
import { KeyBindingProps } from '@remirror/core';
import type { LiteralUnion } from '@remirror/core';
import { NodeExtension } from '@remirror/core';
import { NodeExtensionSpec } from '@remirror/core';
import { NodeSpecOverride } from '@remirror/core';
import { NodeType } from '@remirror/core';
import { NodeViewMethod } from '@remirror/core';
import { ProsemirrorAttributes } from '@remirror/core';
import { ProsemirrorNode } from '@remirror/core';
import type { Static } from '@remirror/core';

/**
 * Adds a callout to the editor.
 */
declare class CalloutExtension extends NodeExtension<CalloutOptions> {
    get name(): "callout";
    readonly tags: "block"[];
    /**
     * Defines the callout html structure.
     * Adds the returned DOM node form `renderEmoji`  into it.
     */
    createNodeViews(): NodeViewMethod;
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec;
    /**
     * Create an input rule that listens for input of 3 colons followed
     * by a valid callout type, to create a callout node
     * If the callout type is invalid, the defaultType callout is created
     */
    createInputRules(): InputRule[];
    /**
     * Toggle the callout at the current selection. If you don't provide the
     * type it will use the options.defaultType.
     *
     * If none exists one will be created or the existing callout content will be
     * lifted out of the callout node.
     *
     * ```ts
     * if (commands.toggleCallout.enabled()) {
     *   commands.toggleCallout({ type: 'success' });
     * }
     * ```
     */
    toggleCallout(attributes?: CalloutExtensionAttributes): CommandFunction;
    /**
     * Update the callout at the current position. Primarily this is used
     * to change the type.
     *
     * ```ts
     * if (commands.updateCallout.enabled()) {
     *   commands.updateCallout({ type: 'error' });
     * }
     * ```
     */
    updateCallout(attributes: CalloutExtensionAttributes, pos?: number): CommandFunction;
    handleEnterKey({ dispatch, tr }: KeyBindingProps): boolean;
    /**
     * Handle the backspace key when deleting content.
     */
    handleBackspace({ dispatch, tr }: KeyBindingProps): boolean;
}
export { CalloutExtension }
export { CalloutExtension as CalloutExtension_alias_1 }

declare interface CalloutExtensionAttributes extends ProsemirrorAttributes {
    /**
     * The type of callout, for instance `info`, `warning`, `error`, `success` or `blank`.
     *
     * @defaultValue 'info'
     */
    type?: LiteralUnion<'info' | 'warning' | 'error' | 'success' | 'blank', string>;
    /**
     * The emoji information of callout.
     *
     * @defaultValue ''
     */
    emoji?: string;
}
export { CalloutExtensionAttributes }
export { CalloutExtensionAttributes as CalloutExtensionAttributes_alias_1 }

/**
 * Options available to the [[`CalloutExtension`]].
 */
declare interface CalloutOptions {
    /**
     * The default callout type to use when none is provided.
     *
     * It is a property so it can change during the editor's life.
     *
     * @defaultValue 'info'
     */
    defaultType?: Static<string>;
    /**
     * The valid types for the callout node.
     *
     * @defaultValue ['info', 'warning' , 'error' , 'success', 'blank']
     */
    validTypes?: Static<string[]>;
    /**
     * The default emoji passed to attrsibute when none is provided.
     *
     * @defaultValue ''
     */
    defaultEmoji?: Static<string>;
    /**
     * The function passed into `calloutExtension` to render the emoji at the front.
     *
     */
    renderEmoji?: (node: ProsemirrorNode, view: EditorView, getPos: () => number) => HTMLElement;
}
export { CalloutOptions }
export { CalloutOptions as CalloutOptions_alias_1 }

export declare const dataAttributeEmoji = "data-callout-emoji";

export declare const dataAttributeType = "data-callout-type";

/**
 * The default emoji render function.
 */
export declare function defaultEmojiRender(node: ProsemirrorNode): HTMLElement;

/**
 * Get the callout type from the provided string.
 */
export declare function getCalloutType(value: string | null | undefined, validTypes: string[], defaultType: string): string;

/**
 * Check that the attributes exist and are valid for the codeBlock
 * updateAttributes.
 */
export declare function isValidCalloutExtensionAttributes(attributes: ProsemirrorAttributes): attributes is CalloutExtensionAttributes;

export declare const toggleCalloutOptions: Remirror.CommandDecoratorOptions;

/**
 * Updates the node attrs.
 *
 * This is used to update the type of the callout.
 */
export declare function updateNodeAttributes(type: NodeType): (attributes: CalloutExtensionAttributes, pos?: number) => CommandFunction;

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      callout: CalloutExtension;
    }
  }
}
