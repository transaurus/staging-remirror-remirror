import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { InputRule } from '@remirror/core';
import { KeyBindingProps } from '@remirror/core';
import { MarkExtension } from '@remirror/core';
import { MarkExtensionSpec } from '@remirror/core';
import { MarkSpecOverride } from '@remirror/core';
import { PrimitiveSelection } from '@remirror/core';
import { Static } from '@remirror/core';

/**
 * When added to your editor it will provide the `toggleBold` command which makes the
 * text under the cursor / or at the provided position range bold.
 */
declare class BoldExtension extends MarkExtension<BoldOptions> {
    get name(): "bold";
    createTags(): ("formattingMark" | "fontStyle")[];
    createMarkSpec(extra: ApplySchemaAttributes, override: MarkSpecOverride): MarkExtensionSpec;
    createInputRules(): InputRule[];
    /**
     * Toggle the bold styling on and off. Remove the formatting if any
     * matching bold formatting within the selection or provided range.
     */
    toggleBold(selection?: PrimitiveSelection): CommandFunction;
    /**
     * Set the bold formatting for the provided range.
     */
    setBold(selection?: PrimitiveSelection): CommandFunction;
    /**
     * Remove the bold formatting from the provided range.
     */
    removeBold(selection?: PrimitiveSelection): CommandFunction;
    /**
     * Attach the keyboard shortcut for making text bold to this mark and also to
     * the `toggleBold` command.
     */
    shortcut(props: KeyBindingProps): boolean;
}
export { BoldExtension }
export { BoldExtension as BoldExtension_alias_1 }

declare interface BoldOptions {
    /**
     * Optionally set the font weight property for this extension.
     */
    weight?: Static<FontWeightProperty>;
}
export { BoldOptions }
export { BoldOptions as BoldOptions_alias_1 }

declare type FontWeightProperty = '-moz-initial' | 'inherit' | 'initial' | 'revert' | 'unset' | 'bold' | 'normal' | 'bolder' | 'lighter' | number;

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      bold: BoldExtension;
    }
  }
}
