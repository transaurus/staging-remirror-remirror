import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { MarkExtension } from '@remirror/core';
import { MarkExtensionSpec } from '@remirror/core';
import { MarkSpecOverride } from '@remirror/core';
import { ProsemirrorAttributes } from '@remirror/core';

declare type FontFamilyAttributes = ProsemirrorAttributes<{
    fontFamily?: string;
}>;
export { FontFamilyAttributes }
export { FontFamilyAttributes as FontFamilyAttributes_alias_1 }

/**
 * Add a font family to the selected text (or text within a specified range).
 */
declare class FontFamilyExtension extends MarkExtension {
    get name(): "fontFamily";
    createTags(): ("formattingMark" | "fontStyle")[];
    createMarkSpec(extra: ApplySchemaAttributes, override: MarkSpecOverride): MarkExtensionSpec;
    /**
     * Set the font family for the selected text.
     */
    setFontFamily(fontFamily: string): CommandFunction;
    /**
     * Set the font family for the selected text.
     */
    toggleFontFamily(fontFamily: string): CommandFunction;
}
export { FontFamilyExtension }
export { FontFamilyExtension as FontFamilyExtension_alias_1 }

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      fontFamily: FontFamilyExtension;
    }
  }
}
