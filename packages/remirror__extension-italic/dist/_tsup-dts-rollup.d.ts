import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { InputRule } from '@remirror/core';
import { KeyBindingProps } from '@remirror/core';
import { KeyBindings } from '@remirror/core';
import { MarkExtension } from '@remirror/core';
import { MarkExtensionSpec } from '@remirror/core';
import { MarkPasteRule } from '@remirror/pm/paste-rules';
import { MarkSpecOverride } from '@remirror/core';
import { PrimitiveSelection } from '@remirror/core';

/**
 * Add italic formatting to your editor.
 */
declare class ItalicExtension extends MarkExtension {
    get name(): "italic";
    createTags(): ("formattingMark" | "fontStyle")[];
    createMarkSpec(extra: ApplySchemaAttributes, override: MarkSpecOverride): MarkExtensionSpec;
    createKeymap(): KeyBindings;
    createInputRules(): InputRule[];
    createPasteRules(): MarkPasteRule[];
    /**
     * Toggle the italic formatting on the selected text.
     */
    toggleItalic(selection?: PrimitiveSelection): CommandFunction;
    /**
     * Attach the keyboard shortcut for formatting.
     */
    shortcut(props: KeyBindingProps): boolean;
}
export { ItalicExtension }
export { ItalicExtension as ItalicExtension_alias_1 }

export declare const toggleItalicOptions: Remirror.CommandDecoratorOptions;

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      italic: ItalicExtension;
    }
  }
}
