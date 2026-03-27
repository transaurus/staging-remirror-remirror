import type { AcceptUndefined } from '@remirror/core';
import type { CommandFunction } from '@remirror/core';
import type { CreateExtensionPlugin } from '@remirror/core';
import type { IdentifierSchemaAttributes } from '@remirror/core';
import type { OnSetOptionsProps } from '@remirror/core';
import { PlainExtension } from '@remirror/core';
import type { PrimitiveSelection } from '@remirror/core';
import type { ProsemirrorAttributes } from '@remirror/core';
import type { Static } from '@remirror/core';

/**
 * An extension which adds bi-directional text support to your editor. This is
 * the best way to support languages which are read from right-to-left.
 */
declare class BidiExtension extends PlainExtension<BidiOptions> {
    get name(): "bidi";
    /**
     * Whether to ignore next updated.
     */
    private _ignoreNextUpdate;
    /**
     * Add the bidi property to the top level editor attributes `doc`.
     */
    createAttributes(): ProsemirrorAttributes;
    /**
     * Add the `dir` to all the inner node types.
     */
    createSchemaAttributes(): IdentifierSchemaAttributes[];
    /**
     * Create the plugin that ensures the node has the correct `dir` value on each
     * state update.
     */
    createPlugin(): CreateExtensionPlugin<boolean>;
    protected onSetOptions(props: OnSetOptionsProps<BidiOptions>): void;
    /**
     * Create the `SchemaAttributesObject`
     */
    private dir;
    /**
     * Get the direction of the text.
     */
    private getDirection;
    setTextDirection(dir: 'ltr' | 'rtl' | undefined, options?: SetTextDirectionOptions): CommandFunction;
}
export { BidiExtension }
export { BidiExtension as BidiExtension_alias_1 }

declare interface BidiOptions {
    /**
     * This is the direction that is used when the algorithm is not quite sure.
     */
    defaultDirection?: AcceptUndefined<'ltr' | 'rtl'>;
    /**
     * Whether or not the extension should automatically infer the direction as you type.
     *
     * @defaultValue false
     */
    autoUpdate?: boolean;
    /**
     * The names of the nodes to exclude.
     *
     * @defaultValue []
     */
    excludeNodes?: Static<string[]>;
}
export { BidiOptions }
export { BidiOptions as BidiOptions_alias_1 }

declare interface SetTextDirectionOptions {
    selection?: PrimitiveSelection;
}

export { }

declare global {
  namespace Remirror {
    interface Attributes {
      /**
       * This attribute grants control over bidirectional language support.
       */
      dir?: 'ltr' | 'rtl';

      /**
       * When truthy this should set the node to ignore any updates to the
       * direction of the text.
       */
      ignoreBidiAutoUpdate?: boolean;
    }

    interface AllExtensions {
      bidi: BidiExtension;
    }
  }
}
