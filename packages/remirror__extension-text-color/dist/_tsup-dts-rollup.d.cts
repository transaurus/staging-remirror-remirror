import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { Helper } from '@remirror/core';
import { I18nFormatter } from '@remirror/core';
import { MarkExtension } from '@remirror/core';
import { MarkExtensionSpec } from '@remirror/core';
import { MarkSpecOverride } from '@remirror/core';
import { PrimitiveSelection } from '@remirror/core';
import { Static } from '@remirror/core';
import { TupleOf } from '@remirror/core';

declare interface ColorPalette {
    black: ColorWithLabel;
    white: ColorWithLabel;
    transparent: ColorWithLabel;
    hues: HuePaletteMap;
}
export { ColorPalette }
export { ColorPalette as ColorPalette_alias_1 }

declare interface ColorWithLabel {
    label: string;
    color: string;
}
export { ColorWithLabel }
export { ColorWithLabel as ColorWithLabel_alias_1 }

declare type ColorWithLabelTuple = TupleOf<ColorWithLabel, 10>;
export { ColorWithLabelTuple }
export { ColorWithLabelTuple as ColorWithLabelTuple_alias_1 }

declare const CSS_VAR_REGEX: RegExp;
export { CSS_VAR_REGEX }
export { CSS_VAR_REGEX as CSS_VAR_REGEX_alias_1 }

declare interface HuePalette {
    label: string;
    hues: ColorWithLabelTuple;
}
export { HuePalette }
export { HuePalette as HuePalette_alias_1 }

declare type HuePaletteMap = Record<keyof Remirror.ThemeHue, HuePalette> & Record<string, HuePalette>;
export { HuePaletteMap }
export { HuePaletteMap as HuePaletteMap_alias_1 }

/**
 * Create a palette the `t` method provided for internalization.
 */
declare type Palette = (t: I18nFormatter) => ColorPalette;
export { Palette }
export { Palette as Palette_alias_1 }

/**
 * The default color palette which uses css properties to update the colors.
 */
declare function palette(t: I18nFormatter): ColorPalette;
export { palette }
export { palette as palette_alias_1 }

declare interface SetTextColorOptions {
    selection?: PrimitiveSelection;
}
export { SetTextColorOptions }
export { SetTextColorOptions as SetTextColorOptions_alias_1 }

declare const setTextColorOptions: Remirror.CommandDecoratorOptions;
export { setTextColorOptions }
export { setTextColorOptions as setTextColorOptions_alias_1 }

declare const TEXT_COLOR_ATTRIBUTE = "data-text-color-mark";
export { TEXT_COLOR_ATTRIBUTE }
export { TEXT_COLOR_ATTRIBUTE as TEXT_COLOR_ATTRIBUTE_alias_1 }

declare interface TextColorAttributes {
    /**
     * The color of the text. This can be a color value like `red` `#fff`
     * `rgb(0,0,0)` or a computed property like `--rmr-color-primary`.
     *
     * @defaultValue ''
     */
    color?: string;
}
export { TextColorAttributes }
export { TextColorAttributes as TextColorAttributes_alias_1 }

/**
 * Wraps text with a styled span using the color css property. The name of the wrapper tag should be configurable.
 */
declare class TextColorExtension extends MarkExtension<TextColorOptions> {
    get name(): "textColor";
    createTags(): ("formattingMark" | "fontStyle")[];
    createMarkSpec(extra: ApplySchemaAttributes, override: MarkSpecOverride): MarkExtensionSpec;
    /**
     * Set the text color value for the selected text.
     *
     * To remove the color you can set the value to null.
     */
    setTextColor(color: string, options?: SetTextColorOptions): CommandFunction;
    /**
     * Remove the color mark from the selection.
     */
    removeTextColor(options?: SetTextColorOptions): CommandFunction;
    /**
     * Get the color from the provided string. The string can be a computed
     * property as well.
     */
    getHexColor(color: string): Helper<string>;
}
export { TextColorExtension }
export { TextColorExtension as TextColorExtension_alias_1 }

declare interface TextColorOptions {
    /**
     * The default color value.
     *
     * @defaultValue 'inherit'
     */
    defaultColor?: Static<string>;
    /**
     * The color palette which is a function that returns a list of colors and
     * labels for help with ui. It is completely optional and you are free to use use whatever colors
     * you choose.
     */
    palette?: Palette;
}
export { TextColorOptions }
export { TextColorOptions as TextColorOptions_alias_1 }

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      textColor: TextColorExtension;
    }
  }
}
