import { BidiExtension } from '@remirror/extension-bidi';
import { BidiOptions } from '@remirror/extension-bidi';
import { BlockquoteExtension } from '@remirror/extension-blockquote';
import { BoldExtension } from '@remirror/extension-bold';
import { BoldOptions } from '@remirror/extension-bold';
import { BulletListExtension } from '@remirror/extension-list';
import { CodeBlockExtension } from '@remirror/extension-code-block';
import { CodeBlockOptions } from '@remirror/extension-code-block';
import { CodeExtension } from '@remirror/extension-code';
import { DropCursorExtension } from '@remirror/extension-drop-cursor';
import { DropCursorOptions } from '@remirror/extension-drop-cursor';
import { FindExtension } from '@remirror/extension-find';
import { FindOptions } from '@remirror/extension-find';
import { GapCursorExtension } from '@remirror/extension-gap-cursor';
import type { GetStaticAndDynamic } from '@remirror/core';
import { HardBreakExtension } from '@remirror/extension-hard-break';
import { HeadingExtension } from '@remirror/extension-heading';
import { HeadingOptions } from '@remirror/extension-heading';
import { HorizontalRuleExtension } from '@remirror/extension-horizontal-rule';
import { IframeExtension } from '@remirror/extension-embed';
import { ImageExtension } from '@remirror/extension-image';
import { ItalicExtension } from '@remirror/extension-italic';
import { LinkExtension } from '@remirror/extension-link';
import { LinkOptions } from '@remirror/extension-link';
import { OrderedListExtension } from '@remirror/extension-list';
import { ShortcutsExtension } from '@remirror/extension-shortcuts';
import { StrikeExtension } from '@remirror/extension-strike';
import { TaskListExtension } from '@remirror/extension-list';
import { TrailingNodeExtension } from '@remirror/extension-trailing-node';
import { TrailingNodeOptions } from '@remirror/extension-trailing-node';
import { UnderlineExtension } from '@remirror/extension-underline';

declare interface WysiwygOptions extends BidiOptions, BoldOptions, CodeBlockOptions, DropCursorOptions, FindOptions, HeadingOptions, LinkOptions, TrailingNodeOptions {
}
export { WysiwygOptions }
export { WysiwygOptions as WysiwygOptions_alias_1 }

/**
 * The union of types for all the extensions provided by the `wysiwygPreset`
 * function call.
 */
declare type WysiwygPreset = GapCursorExtension | HardBreakExtension | HorizontalRuleExtension | ImageExtension | ItalicExtension | StrikeExtension | UnderlineExtension | BlockquoteExtension | CodeExtension | LinkExtension | BidiExtension | BoldExtension | CodeBlockExtension | DropCursorExtension | HeadingExtension | FindExtension | TrailingNodeExtension | IframeExtension | BulletListExtension | OrderedListExtension | TaskListExtension | ShortcutsExtension;
export { WysiwygPreset }
export { WysiwygPreset as WysiwygPreset_alias_1 }

/**
 * Create the wysiwyg preset which includes all the more exotic extensions
 * provided by the `remirror` core library.
 */
declare function wysiwygPreset(options?: GetStaticAndDynamic<WysiwygOptions>): WysiwygPreset[];
export { wysiwygPreset }
export { wysiwygPreset as wysiwygPreset_alias_1 }

export { }
