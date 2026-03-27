import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { EditorView } from '@remirror/pm';
import { LiteralUnion } from '@remirror/core';
import { NodeExtension } from '@remirror/core';
import { NodeExtensionSpec } from '@remirror/core';
import { NodeSpecOverride } from '@remirror/core';
import { NodeView } from '@remirror/pm';
import { NodeViewMethod } from '@remirror/core';
import { ProsemirrorAttributes } from '@remirror/core';
import { ProsemirrorNode } from '@remirror/pm';
import { ResizableNodeView } from 'prosemirror-resizable-view';
import { Shape } from '@remirror/core';
import { Static } from '@remirror/core';

declare interface CreateYouTubeIframeProps {
    /**
     * The video id (dQw4w9WgXcQ) or full link
     * (https://www.youtube.com/watch?v=dQw4w9WgXcQ).
     */
    video: string;
    /**
     * The number os seconds in to start at.
     * @defaultValue 0
     */
    startAt?: number;
    /**
     * When true will show the player controls.
     *
     * @defaultValue true
     */
    showControls?: boolean;
    /**
     * According to YouTube: _When you turn on privacy-enhanced mode, YouTube
     * won't store information about visitors on your website unless they play the
     * video._
     *
     * @defaultValue true
     */
    enhancedPrivacy?: boolean;
}

declare type IframeAttributes = ProsemirrorAttributes<{
    src: string;
    frameBorder?: number | string;
    allowFullScreen?: 'true' | boolean;
    width?: number;
    height?: number;
    type?: LiteralUnion<'youtube', string>;
}>;
export { IframeAttributes }
export { IframeAttributes as IframeAttributes_alias_1 }

/**
 * An extension for the remirror editor.
 */
declare class IframeExtension extends NodeExtension<IframeOptions> {
    get name(): "iframe";
    createTags(): "block"[];
    createNodeViews(): NodeViewMethod | Record<string, NodeViewMethod>;
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec;
    /**
     * Add a custom iFrame to the editor.
     */
    addIframe(attributes: IframeAttributes): CommandFunction;
    /**
     * Add a YouTube embedded iFrame to the editor.
     */
    addYouTubeVideo(props: CreateYouTubeIframeProps): CommandFunction;
    /**
     * Update the iFrame source for the currently selected video.
     */
    updateIframeSource(src: string): CommandFunction;
    /**
     * Update the YouTube video iFrame.
     */
    updateYouTubeVideo(props: CreateYouTubeIframeProps): CommandFunction;
}
export { IframeExtension }
export { IframeExtension as IframeExtension_alias_1 }

declare interface IframeOptions {
    /**
     * The default source to use for the iframe.
     */
    defaultSource?: Static<string>;
    /**
     * The class to add to the iframe.
     *
     * @defaultValue 'remirror-iframe'
     */
    class?: Static<string>;
    /**
     * Enable resizing.
     *
     * If true, the iframe node will be rendered by `nodeView` instead of `toDOM`.
     *
     * @defaultValue false
     */
    enableResizing: boolean;
}
export { IframeOptions }
export { IframeOptions as IframeOptions_alias_1 }

/**
 * ResizableIframeView is a NodeView for iframe. You can resize the iframe by
 * dragging the handle over the iframe.
 */
export declare class ResizableIframeView extends ResizableNodeView implements NodeView {
    readonly options: IframeOptions;
    constructor(node: ProsemirrorNode, view: EditorView, getPos: () => number, iframeOptions: IframeOptions);
    createElement({ node, options }: {
        node: ProsemirrorNode;
        options?: Shape;
    }): HTMLIFrameElement;
}

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      iframe: IframeExtension;
    }
  }
}
