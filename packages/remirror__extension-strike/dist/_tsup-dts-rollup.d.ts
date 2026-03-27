import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { InputRule } from '@remirror/core';
import { KeyBindingProps } from '@remirror/core';
import { MarkExtension } from '@remirror/core';
import { MarkExtensionSpec } from '@remirror/core';
import { MarkPasteRule } from '@remirror/pm/paste-rules';
import { MarkSpecOverride } from '@remirror/core';

/**
 * The extension for adding strike-through marks to the editor.
 */
declare class StrikeExtension extends MarkExtension {
    get name(): "strike";
    createTags(): ("formattingMark" | "fontStyle")[];
    createMarkSpec(extra: ApplySchemaAttributes, override: MarkSpecOverride): MarkExtensionSpec;
    /**
     * Toggle the strike through formatting annotation.
     */
    toggleStrike(): CommandFunction;
    /**
     * Attach the keyboard shortcut to format the text.
     */
    shortcut(props: KeyBindingProps): boolean;
    createInputRules(): InputRule[];
    createPasteRules(): MarkPasteRule[];
}
export { StrikeExtension }
export { StrikeExtension as StrikeExtension_alias_1 }

export declare const toggleStrikeOptions: Remirror.CommandDecoratorOptions;

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      strike: StrikeExtension;
    }
  }
}
