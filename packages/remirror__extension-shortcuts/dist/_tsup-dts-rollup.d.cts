import { InputRule } from '@remirror/core';
import { PlainExtension } from '@remirror/core';

/**
 * Replace characters with keyboard shortcuts
 *
 * Inspired by Tiptap's extension-typography
 */
declare class ShortcutsExtension extends PlainExtension<ShortcutsOptions> {
    get name(): "shortcuts";
    /**
     * Manage input rules for keyboard shortcuts
     */
    createInputRules(): InputRule[];
}
export { ShortcutsExtension }
export { ShortcutsExtension as ShortcutsExtension_alias_1 }

declare interface ShortcutsOptions {
}
export { ShortcutsOptions }
export { ShortcutsOptions as ShortcutsOptions_alias_1 }

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      template: ShortcutsExtension;
    }
  }
}
