import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { KeyBindingProps } from '@remirror/core';
import { MarkExtension } from '@remirror/core';
import { MarkExtensionSpec } from '@remirror/core';
import { MarkSpecOverride } from '@remirror/core';

declare class SupExtension extends MarkExtension {
    get name(): "sup";
    createTags(): ("formattingMark" | "fontStyle")[];
    createMarkSpec(extra: ApplySchemaAttributes, override: MarkSpecOverride): MarkExtensionSpec;
    /**
     * Toggle the subscript formatting of the selected text.
     */
    toggleSuperscript(): CommandFunction;
    /**
     * Attach the keyboard shortcut for making text bold to this mark and also to
     * the `toggleBold` command.
     */
    shortcut(props: KeyBindingProps): boolean;
}
export { SupExtension }
export { SupExtension as SupExtension_alias_1 }

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      sup: SupExtension;
    }
  }
}
