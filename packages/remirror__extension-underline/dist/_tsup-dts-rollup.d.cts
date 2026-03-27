import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { KeyBindingProps } from '@remirror/core';
import { MarkExtension } from '@remirror/core';
import { MarkExtensionSpec } from '@remirror/core';
import { MarkSpecOverride } from '@remirror/core';
import { PrimitiveSelection } from '@remirror/core';

export declare const toggleUnderlineOptions: Remirror.CommandDecoratorOptions;

/**
 * Add underline formatting support to the editor.
 */
declare class UnderlineExtension extends MarkExtension {
    get name(): "underline";
    createTags(): ("formattingMark" | "fontStyle")[];
    createMarkSpec(extra: ApplySchemaAttributes, override: MarkSpecOverride): MarkExtensionSpec;
    /**
     * Toggle the underline formatting of the selected text.
     *
     * This command is provided by the `UnderlineExtension`.
     */
    toggleUnderline(selection?: PrimitiveSelection): CommandFunction;
    /**
     * Attach the keyboard shortcut for formatting the text.
     */
    shortcut(props: KeyBindingProps): boolean;
}
export { UnderlineExtension }
export { UnderlineExtension as UnderlineExtension_alias_1 }

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      underline: UnderlineExtension;
    }
  }
}
