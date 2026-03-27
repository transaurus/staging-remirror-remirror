import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { InputRule } from '@remirror/core';
import { KeyBindingProps } from '@remirror/core';
import { NodeExtension } from '@remirror/core';
import { NodeExtensionSpec } from '@remirror/core';
import { NodeSpecOverride } from '@remirror/core';
import type { PasteRule } from '@remirror/pm/paste-rules';

/**
 * Add the blockquote block to the editor.
 */
declare class BlockquoteExtension extends NodeExtension {
    get name(): "blockquote";
    createTags(): ("formattingNode" | "block")[];
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec;
    /**
     * Toggle the blockquote for the current block.
     *
     * If none exists one will be created or the existing blockquote content will be
     * lifted out of the blockquote node.
     *
     * ```ts
     * commands.toggleBlockquote();
     * ```
     */
    toggleBlockquote(): CommandFunction;
    shortcut(props: KeyBindingProps): boolean;
    createInputRules(): InputRule[];
    createPasteRules(): PasteRule;
}
export { BlockquoteExtension }
export { BlockquoteExtension as BlockquoteExtension_alias_1 }

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      blockquote: BlockquoteExtension;
    }
  }
}
