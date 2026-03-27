import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { KeyBindingProps } from '@remirror/core';
import { MarkExtension } from '@remirror/core';
import { MarkExtensionSpec } from '@remirror/core';
import { MarkSpecOverride } from '@remirror/core';

declare class SubExtension extends MarkExtension {
    get name(): "sub";
    createTags(): ("formattingMark" | "fontStyle")[];
    createMarkSpec(extra: ApplySchemaAttributes, override: MarkSpecOverride): MarkExtensionSpec;
    /**
     * Toggle the subscript formatting of the selected text.
     */
    toggleSubscript(): CommandFunction;
    /**
     * Attach the keyboard shortcut for making text bold to this mark and also to
     * the `toggleBold` command.
     */
    shortcut(props: KeyBindingProps): boolean;
}
export { SubExtension }
export { SubExtension as SubExtension_alias_1 }

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      sub: SubExtension;
    }
  }
}
