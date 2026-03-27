import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { MarkExtension } from '@remirror/core';
import { MarkExtensionSpec } from '@remirror/core';
import { MarkSpecOverride } from '@remirror/core';
import { Palette } from '@remirror/extension-text-color';
import { PrimitiveSelection } from '@remirror/core';
import { Static } from '@remirror/core';

declare interface HighlightCommandOptions {
    selection?: PrimitiveSelection;
}

declare interface TextHighlightAttributes {
    /**
     * The highlight color.
     *
     * @defaultValue ''
     */
    highlight?: string;
}
export { TextHighlightAttributes }
export { TextHighlightAttributes as TextHighlightAttributes_alias_1 }

/**
 * Add a highlight color to the selected text (or text within a specified
 * range).
 */
declare class TextHighlightExtension extends MarkExtension<TextHighlightOptions> {
    get name(): "textHighlight";
    createTags(): ("formattingMark" | "fontStyle")[];
    createMarkSpec(extra: ApplySchemaAttributes, override: MarkSpecOverride): MarkExtensionSpec;
    /**
     * Set the text highlight color value for the selected text.
     */
    setTextHighlight(highlight: string, options?: HighlightCommandOptions): CommandFunction;
    /**
     * Remove the highlight mark from the selection.
     */
    removeTextHighlight(options?: HighlightCommandOptions): CommandFunction;
}
export { TextHighlightExtension }
export { TextHighlightExtension as TextHighlightExtension_alias_1 }

declare interface TextHighlightOptions {
    /**
     * The default highlight value.
     *
     * @defaultValue ''
     */
    defaultHighlight?: Static<string>;
    /**
     * The color palette which is a function that returns a list of colors and
     * labels for help with ui. It is completely optional and you are free to use
     * use whatever colors you choose.
     */
    palette?: Palette;
}
export { TextHighlightOptions }
export { TextHighlightOptions as TextHighlightOptions_alias_1 }

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      textHighlight: TextHighlightExtension;
    }
  }
}
