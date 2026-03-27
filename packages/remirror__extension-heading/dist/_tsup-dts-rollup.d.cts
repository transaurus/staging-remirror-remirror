import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { InputRule } from '@remirror/core';
import { KeyBindings } from '@remirror/core';
import { NamedShortcut } from '@remirror/core';
import { NodeExtension } from '@remirror/core';
import { NodeExtensionSpec } from '@remirror/core';
import { NodePasteRule } from '@remirror/pm/paste-rules';
import { NodeSpecOverride } from '@remirror/core';
import { ProsemirrorAttributes } from '@remirror/core';
import { Static } from '@remirror/core';

declare class HeadingExtension extends NodeExtension<HeadingOptions> {
    get name(): "heading";
    createTags(): ("formattingNode" | "block" | "textBlock")[];
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec;
    /**
     * Toggle the heading for the current block. If you don't provide the
     * level it will use the options.defaultLevel.
     */
    toggleHeading(attrs?: HeadingExtensionAttributes): CommandFunction;
    /**
     * Dynamically create the shortcuts for the heading extension.
     */
    createKeymap(fn: (shortcut: string) => string[]): KeyBindings;
    createInputRules(): InputRule[];
    createPasteRules(): NodePasteRule[];
}
export { HeadingExtension }
export { HeadingExtension as HeadingExtension_alias_1 }

declare type HeadingExtensionAttributes = ProsemirrorAttributes<{
    /**
     * The heading size.
     */
    level?: number;
}>;
export { HeadingExtensionAttributes }
export { HeadingExtensionAttributes as HeadingExtensionAttributes_alias_1 }

declare interface HeadingOptions {
    /**
     * The numerical value of the supporting headings.
     *
     * @defaultValue `[1, 2, 3, 4, 5, 6]`
     */
    levels?: Static<number[]>;
    /**
     * The default level heading to use.
     *
     * @defaultValue 1
     */
    defaultLevel?: Static<number>;
}

declare interface HeadingOptions {
}
export { HeadingOptions }
export { HeadingOptions as HeadingOptions_alias_1 }

/**
 * The named shortcuts for the default 6 levels of commands.
 */
export declare const shortcuts: NamedShortcut[];

/**
 * Command options for the heading.
 */
export declare const toggleHeadingOptions: Remirror.CommandDecoratorOptions;

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      heading: HeadingExtension;
    }
  }
}
