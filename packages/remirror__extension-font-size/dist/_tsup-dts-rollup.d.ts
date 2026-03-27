import { ApplySchemaAttributes } from '@remirror/core';
import { Array1 } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { DomSizeUnit } from '@remirror/core';
import { Helper } from '@remirror/core';
import { KeyBindingProps } from '@remirror/core';
import { MarkExtension } from '@remirror/core';
import { MarkExtensionSpec } from '@remirror/core';
import { MarkSpecOverride } from '@remirror/core';
import { ParsedDomSize } from '@remirror/core';
import { PrimitiveSelection } from '@remirror/core';
import { Static } from '@remirror/core';

export declare const decreaseFontSizeOptions: Remirror.CommandDecoratorOptions;

export declare const FONT_SIZE_ATTRIBUTE = "data-font-size-mark";

export declare interface FontSizeAttributes {
    /**
     * The font size.
     *
     * @defaultValue ''
     */
    size?: string;
}

/**
 * Add a font size to the selected text (or text within a specified range).
 */
declare class FontSizeExtension extends MarkExtension<FontSizeOptions> {
    get name(): "fontSize";
    createTags(): ("formattingMark" | "fontStyle")[];
    createMarkSpec(extra: ApplySchemaAttributes, override: MarkSpecOverride): MarkExtensionSpec;
    private getFontSize;
    /**
     * Set the text size color value for the selected text.
     */
    setFontSize(size: string | number, options?: SizeCommandOptions): CommandFunction;
    increaseFontSize(options?: SizeCommandOptions): CommandFunction;
    decreaseFontSize(options?: SizeCommandOptions): CommandFunction;
    /**
     * Remove the size mark from the selection.
     */
    removeFontSize(options?: SizeCommandOptions): CommandFunction;
    /**
     * Handle exiting the mark forwards.
     */
    increaseFontSizeShortcut(props: KeyBindingProps): boolean;
    /**
     * Handle exiting the mark forwards.
     */
    decreaseFontSizeShortcut(props: KeyBindingProps): boolean;
    /**
     * Get the font size at the current selection (or provided custom selection).
     * Returns an array of parsed font size tuples if there are multiple sizes in
     * the non-empty selection.
     */
    getFontSizeForSelection(position?: PrimitiveSelection): Helper<Array1<ParsedDomSize>>;
    getFontSizeFromDom(position?: PrimitiveSelection): Helper<ParsedDomSize>;
}
export { FontSizeExtension }
export { FontSizeExtension as FontSizeExtension_alias_1 }

export declare interface FontSizeOptions {
    /**
     * The default size value.
     *
     * @defaultValue ''
     */
    defaultSize?: Static<string>;
    /**
     * The default unit to use for the font sizes.
     *
     * @defaultValue 'pt'
     */
    unit?: DomSizeUnit;
    /**
     * The amount to increment the font by when the font size is incremented.
     *
     * A function can be passed if you would like the increment level to be
     * influenced by the current font size. A larger increment can be set for
     * larger sizes.
     *
     * @param parsedSize - the size as a tuple of size and unit.
     * @param direction - `-1` when decreasing the value and `+1` when increasing
     * the value.
     */
    increment?: number | ((parsedSize: ParsedDomSize, direction: -1 | 1) => number);
    /**
     * The maximum font size.
     */
    max?: number;
    /**
     * The minimum font size.
     */
    min?: number;
    /**
     * The nearest multiple to round the font size to. This can be `1` to only
     * accept whole number or `0.5` to accept both whole numbers and numbers
     * ending in `.5`.
     *
     * It is advisable to only set values that produce whole numbers when divided
     * by 1.
     *
     * @defaultValue 0.5
     */
    roundingMultiple?: number;
}

export declare const increaseFontSizeOptions: Remirror.CommandDecoratorOptions;

export declare const setFontSizeOptions: Remirror.CommandDecoratorOptions;

declare interface SizeCommandOptions {
    selection?: PrimitiveSelection;
}

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      fontSize: FontSizeExtension;
    }
  }
}
