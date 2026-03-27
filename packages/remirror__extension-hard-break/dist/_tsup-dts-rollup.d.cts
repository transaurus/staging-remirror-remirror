import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { KeyBindings } from '@remirror/core';
import { NodeExtension } from '@remirror/core';
import { NodeExtensionSpec } from '@remirror/core';
import { NodeSpecOverride } from '@remirror/core';

/**
 * An extension which provides the functionality for inserting a `hardBreak`
 * `<br />` tag into the editor.
 *
 * @remarks
 *
 * It will automatically exit when used inside a `codeClock`. To
 * prevent problems occurring when the codeblock is the last node in the
 * doc, you should add the `TrailingNodeExtension` which automatically appends a
 * paragraph node to the last node.
 */
declare class HardBreakExtension extends NodeExtension {
    get name(): "hardBreak";
    createTags(): "inline"[];
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec;
    createKeymap(): KeyBindings;
    /**
     * Inserts a hardBreak `<br />` tag into the editor.
     */
    insertHardBreak(): CommandFunction;
}
export { HardBreakExtension }
export { HardBreakExtension as HardBreakExtension_alias_1 }

export declare interface HardBreakOptions {
    /**
     * The a collection of nodes where the hard break is not available.
     */
    excludedNodes?: string[];
}

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      hardBreak: HardBreakExtension;
    }
  }
}
