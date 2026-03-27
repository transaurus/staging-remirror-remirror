import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { DelayedPromiseCreator } from '@remirror/core';
import { EditorView } from '@remirror/core';
import { EditorView as EditorView_2 } from '@remirror/pm';
import { NodeExtension } from '@remirror/core';
import { NodeExtensionSpec } from '@remirror/core';
import { NodeSpecOverride } from '@remirror/core';
import { NodeView } from '@remirror/pm';
import { NodeViewMethod } from '@remirror/core';
import { PasteRule } from '@remirror/pm/paste-rules';
import { PrimitiveSelection } from '@remirror/core';
import { ProsemirrorAttributes } from '@remirror/core';
import { ProsemirrorNode } from '@remirror/pm';
import { ResizableNodeView } from 'prosemirror-resizable-view';

declare type DelayedImage = DelayedPromiseCreator<ImageAttributes>;

declare interface FileWithProgress {
    file: File;
    progress: SetProgress;
}

declare type ImageAttributes = ProsemirrorAttributes<ImageExtensionAttributes>;
export { ImageAttributes }
export { ImageAttributes as ImageAttributes_alias_1 }

/**
 * The image extension for placing images into your editor.
 *
 * TODO ->
 * - Captions https://glitch.com/edit/#!/pet-figcaption?path=index.js%3A27%3A1 into a preset
 *
 * TODO => Split this into an image upload extension and image extension.
 * - Add a base64 image
 */
declare class ImageExtension extends NodeExtension<ImageOptions> {
    get name(): "image";
    createTags(): ("inline" | "media")[];
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec;
    insertImage(attributes: ImageAttributes, selection?: PrimitiveSelection): CommandFunction;
    /**
     * Insert an image once the provide promise resolves.
     */
    uploadImage(value: DelayedPromiseCreator<ImageAttributes>, onElement?: (element: HTMLElement) => void): CommandFunction;
    private fileUploadFileHandler;
    createPasteRules(): PasteRule[];
    createNodeViews(): NodeViewMethod | Record<string, NodeViewMethod>;
}
export { ImageExtension }
export { ImageExtension as ImageExtension_alias_1 }

declare interface ImageExtensionAttributes {
    align?: 'center' | 'end' | 'justify' | 'left' | 'match-parent' | 'right' | 'start';
    alt?: string;
    height?: string | number;
    width?: string | number;
    rotate?: string;
    src: string;
    title?: string;
    /** The file name used to create the image. */
    fileName?: string;
}
export { ImageExtensionAttributes }
export { ImageExtensionAttributes as ImageExtensionAttributes_alias_1 }

declare interface ImageOptions {
    createPlaceholder?: (view: EditorView, pos: number) => HTMLElement;
    updatePlaceholder?: (view: EditorView, pos: number, element: HTMLElement, progress: number) => void;
    destroyPlaceholder?: (view: EditorView, element: HTMLElement) => void;
    /**
     * The upload handler for the image extension.
     *
     * It receives a list of dropped or pasted files and returns a promise for the
     * attributes which should be used to insert the image into the editor.
     *
     * @param files - a list of files to upload.
     * @param setProgress - the progress handler.
     */
    uploadHandler?: (files: FileWithProgress[]) => DelayedImage[];
    /**
     * Enable resizing.
     *
     * If true, the image node will be rendered by `nodeView` instead of `toDOM`.
     *
     * @defaultValue false
     */
    enableResizing?: boolean;
    /**
     * When pasting mixed text and image content (usually from Microsoft Office products) the content on the clipboard is either:
     *
     * a. one large image: containing effectively a screenshot of the original content (an image with text in it).
     * b. HTML content: containing usable text, but images with file protocol URLs (which cannot be resolved due to browser security restrictions).
     *
     * If true, this will extract the text from the clipboard data, and drop the images.
     * If false, the "screenshot" image will be used and the text will be dropped.
     *
     * @defaultValue true
     */
    preferPastedTextContent?: boolean;
}
export { ImageOptions }
export { ImageOptions as ImageOptions_alias_1 }

/**
 * True when the provided file is an image file.
 */
declare function isImageFileType(file: File): boolean;
export { isImageFileType }
export { isImageFileType as isImageFileType_alias_1 }

/**
 * ResizableImageView is a NodeView for image. You can resize the image by
 * dragging the handle over the image.
 */
declare class ResizableImageView extends ResizableNodeView implements NodeView {
    constructor(node: ProsemirrorNode, view: EditorView_2, getPos: () => number);
    createElement({ node }: {
        node: ProsemirrorNode;
    }): HTMLImageElement;
}
export { ResizableImageView }
export { ResizableImageView as ResizableImageView_alias_1 }

/**
 * Set the progress.
 *
 * @param progress - a value between `0` and `1`.
 */
declare type SetProgress = (progress: number) => void;

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      image: ImageExtension;
    }

    interface BaseExtension {
      /**
       * Awesome stuff
       */
      a: string;
    }
  }
}
