import { EditorView } from 'prosemirror-view';
import { Node as Node_2 } from 'prosemirror-model';
import { NodeView } from 'prosemirror-view';

export declare const leftCornerHandle: string;

declare interface OptionShape {
    [key: string]: any;
}

export declare class ResizableHandle {
    #private;
    dom: HTMLDivElement;
    type: ResizableHandleType;
    constructor(type: ResizableHandleType);
    createHandle(type: ResizableHandleType): void;
    setHandleVisibility(visible: boolean): void;
    dataSetDragging(isDraging: boolean): void;
}

export declare enum ResizableHandleType {
    Right = 0,
    Left = 1,
    Bottom = 2,
    BottomRight = 3,
    BottomLeft = 4
}

/**
 * ResizableNodeView serves as a base NodeView for resizable element,
 * and cannot be directly instantiated.
 * With this base NodeView, you can resize the DOM element by dragging the handle over the image.
 *
 * @param node - the node which uses this nodeView. Must have `width` and `height` in the attrs.
 * @param view - the editor view used by this nodeView.
 * @param getPos - a utility method to get the absolute cursor position of the node.
 * @param aspectRatio? - to determine which type of aspect ratio should be used.
 * @param options? - extra options to pass to `createElement` method.
 * @param initialSize? - initial view size.
 */
declare abstract class ResizableNodeView implements NodeView {
    #private;
    dom: HTMLElement;
    readonly aspectRatio: ResizableRatioType;
    constructor({ node, view, getPos, aspectRatio, options, initialSize, }: {
        node: Node_2;
        view: EditorView;
        getPos: () => number;
        aspectRatio?: ResizableRatioType;
        options?: OptionShape;
        initialSize?: {
            width: number;
            height: number;
        };
    });
    /**
     * `createElement` - a method to produce the element DOM element for this prosemirror node.
     * The subclasses have to implement this abstract method.
     */
    abstract createElement(props: {
        node: Node_2;
        view: EditorView;
        getPos: () => number;
        options?: OptionShape;
    }): HTMLElement;
    createWrapper(node: Node_2, initialSize?: {
        width: number;
        height: number;
    }): HTMLElement;
    startResizing(e: MouseEvent, view: EditorView, getPos: () => number, handle: ResizableHandle): void;
    /**
     * `update` will be called by Prosemirror, when the view is updating itself.
     */
    update(node: Node_2): boolean;
    destroy(): void;
}
export { ResizableNodeView }
export { ResizableNodeView as ResizableNodeView_alias_1 }

declare enum ResizableRatioType {
    Fixed = 0,
    Flexible = 1
}
export { ResizableRatioType }
export { ResizableRatioType as ResizableRatioType_alias_1 }

export declare const rightCornerHandle: string;

export { }
