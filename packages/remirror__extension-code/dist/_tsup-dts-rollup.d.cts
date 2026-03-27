import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { InputRule } from '@remirror/core';
import { KeyBindingProps } from '@remirror/core';
import { KeyBindings } from '@remirror/core';
import { MarkExtension } from '@remirror/core';
import { MarkExtensionSpec } from '@remirror/core';
import { MarkPasteRule } from '@remirror/pm/paste-rules';
import { MarkSpecOverride } from '@remirror/core';

/**
 * Add a `code` mark to the editor. This is used to mark inline text as a code
 * snippet.
 */
declare class CodeExtension extends MarkExtension {
    get name(): "code";
    createTags(): ("code" | "excludeFromInputRules")[];
    createMarkSpec(extra: ApplySchemaAttributes, override: MarkSpecOverride): MarkExtensionSpec;
    createKeymap(): KeyBindings;
    keyboardShortcut(props: KeyBindingProps): boolean;
    /**
     * Toggle the current selection as a code mark.
     */
    toggleCode(): CommandFunction;
    createInputRules(): InputRule[];
    createPasteRules(): MarkPasteRule[];
}
export { CodeExtension }
export { CodeExtension as CodeExtension_alias_1 }

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      code: CodeExtension;
    }
  }
}
