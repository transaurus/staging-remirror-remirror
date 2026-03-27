import { PlainExtension } from '@remirror/core';
import { ProsemirrorPlugin } from '@remirror/core';

/**
 * Create a plugin that, when added to a ProseMirror instance,
 * shows a line indicator for where the drop target will be.
 *
 * @builtin
 */
declare class DropCursorExtension extends PlainExtension<DropCursorOptions> {
    get name(): "dropCursor";
    /**
     * Use the dropCursor plugin with provided options.
     */
    createExternalPlugins(): ProsemirrorPlugin[];
}
export { DropCursorExtension }
export { DropCursorExtension as DropCursorExtension_alias_1 }

declare interface DropCursorOptions {
    /**
     * Set the color of the cursor.
     *
     * @defaultValue 'black'
     */
    color?: string;
    /**
     * Set the precise width of the cursor in pixels.
     *
     * @defaultValue 1
     */
    width?: number;
}
export { DropCursorOptions }
export { DropCursorOptions as DropCursorOptions_alias_1 }

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      dropCursor: DropCursorExtension;
    }
  }
}
