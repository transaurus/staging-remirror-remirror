import type { AcceptUndefined } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { Coords } from '@remirror/core';
import { CreateExtensionPlugin } from '@remirror/core';
import { DecorationSet } from '@remirror/pm/view';
import { FromToProps } from '@remirror/core';
import { Helper } from '@remirror/core';
import { OnSetOptionsProps } from '@remirror/core';
import { PlainExtension } from '@remirror/core';
import { Positioner } from '@remirror/extension-positioner';
import { PrimitiveSelection } from '@remirror/core';
import { Transaction } from '@remirror/core';
import { TransactionProps } from '@remirror/core';

export declare enum ActionType {
    ADD_ANNOTATION = 0,
    REDRAW_ANNOTATIONS = 1,
    REMOVE_ANNOTATIONS = 2,
    SET_ANNOTATIONS = 3,
    UPDATE_ANNOTATION = 4
}

export declare interface AddAnnotationAction<Type extends Annotation> {
    type: ActionType.ADD_ANNOTATION;
    from: number;
    to: number;
    annotationData: OmitTextAndPosition<Type>;
}

declare interface Annotation {
    /**
     * Unique identifier of the annotation
     */
    id: string;
    /**
     * Document position where the annotation starts.
     */
    from: number;
    /**
     * Document position where the annotation ends.
     */
    to: number;
    /**
     * Plain text of what is annotated, i.e. content between from->start.
     * This allows applications fetching the annotation to work with them without
     * having to query Prosemirror for the text.
     */
    text: string;
    /**
     * Classname added to the annotation when it's rendered. This can be used
     * e.g. to have annotations in different colors
     */
    className?: string;
}
export { Annotation }
export { Annotation as Annotation_alias_1 }

/**
 * This extension allows to annotate the content in your editor.
 *
 * Extend the Annotation interface to store application specific information
 * like tags or color.
 */
declare class AnnotationExtension<Type extends Annotation = Annotation> extends PlainExtension<AnnotationOptions<Type>> {
    get name(): "annotation";
    protected onSetOptions(props: OnSetOptionsProps<AnnotationOptions<Type>>): void;
    /**
     * Create the custom code block plugin which handles the delete key amongst
     * other things.
     */
    createPlugin(): CreateExtensionPlugin<AnnotationState<Type>>;
    /**
     * Adds an annotation spanning the currently selected content.
     *
     * In order to use this command make sure you have the
     * [[`AnnotationExtension`]] added to your editor.
     *
     * @param annotationData - the data for the provided annotation.
     */
    addAnnotation(annotationData: OmitTextAndPosition<Type>): CommandFunction;
    /**
     * Updates an existing annotation with a new value.
     *
     * In order to use this command make sure you have the
     * [[`AnnotationExtension`]] added to your editor.
     *
     * @param id - the annotation id to update.
     * @param annotationDataWithoutId - the annotation data without the id.
     */
    updateAnnotation(id: string, annotationDataWithoutId: Omit<OmitTextAndPosition<Type>, 'id'>): CommandFunction;
    /**
     * Removes a list of annotations.
     *
     * In order to use this command make sure you have the
     * [[`AnnotationExtension`]] added to your editor.
     *
     * @param annotationIds - the ids of the annotations to be removed.
     */
    removeAnnotations(annotationIds: string[]): CommandFunction;
    /**
     * Sets the annotation. Use this to initialize the extension based on loaded
     * data.
     *
     * In order to use this command make sure you have the
     * [[`AnnotationExtension`]] added to your editor.
     *
     * @param annotations - the initial annotation to be set.
     */
    setAnnotations(annotations: Array<OmitText<Type>>): CommandFunction;
    /**
     * Forcefully redraws the annotations
     *
     * Call this function if the styling of the annotations changes.
     *
     * @see
     * https://discord.com/channels/726035064831344711/745695557976195072/759715559477870603
     */
    redrawAnnotations(): CommandFunction;
    /**
     * @returns all annotations in the editor.
     *
     * In order to use this helper make sure you have the
     * [[`AnnotationExtension`]] added to your editor.
     */
    getAnnotations(): Helper<Type[]>;
    /**
     * @param pos - the position in the root document to find annotations.
     * @param includeEdges - whether to match annotations that start or end exactly on the given pos
     *
     * @returns all annotations at a specific position in the editor.
     *
     * In order to use this helper make sure you have the
     * [[`AnnotationExtension`]] added to your editor.
     */
    getAnnotationsAt(pos?: PrimitiveSelection, includeEdges?: boolean): Helper<Type[]>;
    /**
     * @param pos - the optional selection to check for, if left undefined it
     * default to the current selection
     *
     * @returns true if the selection includes an annotation or is included within
     * an annotation.
     *
     * In order to use this helper make sure you have the
     * [[`AnnotationExtension`]] added to your editor.
     */
    selectionHasAnnotation(pos?: PrimitiveSelection): Helper<boolean>;
    /**
     * Enrich text at annotation
     */
    private readonly enrichText;
}
export { AnnotationExtension }
export { AnnotationExtension as AnnotationExtension_alias_1 }

declare interface AnnotationOptions<Type extends Annotation = Annotation> extends ObsoleteOptions<ExternalMapOptions<Type>> {
    /**
     * Method to calculate styles for a segment with one or more annotations
     *
     * @remarks
     *
     * This can be used e.g. to assign different shades of a color depending on
     * the amount of annotations in a segment.
     */
    getStyle?: GetStyle<Type>;
    /**
     * Allows to format the text returned for each annotation.
     *
     * When `blockSeparator` is given, it will be inserted whenever a new
     * block node is started.
     *
     * @see ProsemirrorNode.textBetween
     */
    blockSeparator?: AcceptUndefined<string>;
    getStore?: () => AnnotationStore<Type>;
}
export { AnnotationOptions }
export { AnnotationOptions as AnnotationOptions_alias_1 }

export declare class AnnotationState<Type extends Annotation = Annotation> {
    private readonly getStyle;
    private readonly store;
    /**
     * Cache of annotations being currently shown
     */
    annotations: Array<OmitText<Type>>;
    /**
     * Decorations are computed based on the annotations. The state contains a
     * copy of the decoration for performance optimization.
     */
    decorationSet: DecorationSet;
    constructor(getStyle: GetStyle<Type>, store: AnnotationStore<Type>);
    addAnnotation(addAction: AddAnnotationAction<Type>): void;
    updateAnnotation(updateAction: UpdateAnnotationAction<Type>): void;
    removeAnnotations(removeAction: RemoveAnnotationsAction): void;
    setAnnotations(setAction: SetAnnotationsAction<Type>): void;
    formatAnnotations(): Array<OmitText<Type>>;
    createDecorations(tr: Transaction, annotations?: Array<OmitText<Type>>): DecorationSet;
    apply({ tr, action }: ApplyProps): this;
}

declare interface AnnotationStore<Type extends Annotation> {
    addAnnotation: (data: OmitText<Type>) => void;
    updateAnnotation: (id: string, updateData: OmitTextAndPosition<Type>) => void;
    removeAnnotations: (ids: string[]) => void;
    setAnnotations: (annotations: Array<OmitText<Type>>) => void;
    formatAnnotations: () => Array<OmitText<Type>>;
}
export { AnnotationStore }
export { AnnotationStore as AnnotationStore_alias_1 }

declare interface ApplyProps extends TransactionProps {
    action: any;
}

/**
 * Render a positioner which captures the selected annotation.
 *
 * @remarks
 *
 * This extends the selection positioner. The difference is that the from and to
 * coordinates are picked from shortest annotation selected.
 */
declare function createCenteredAnnotationPositioner(getAnnotationsAt: GetAnnotationsAt): Positioner<{
    from: Coords;
    to: Coords;
}>;
export { createCenteredAnnotationPositioner }
export { createCenteredAnnotationPositioner as createCenteredAnnotationPositioner_alias_1 }

/**
 * Options related to configuring another {@link MapLike} structure to store annotations.
 *
 * @deprecated
 */
declare interface ExternalMapOptions<Type extends Annotation> {
    /**
     * Allows a custom map-like object for storing internal annotations
     *
     * @remarks
     *
     * This can be used to pass something like a Yjs Y.Map for shared annotations
     */
    getMap?: () => MapLike<string, TransformedAnnotation<OmitText<Type>>>;
    /**
     * Allows a custom transform function that modifies how positions are stored
     * internally
     *
     * @remarks
     *
     * This can be used to transform positions to other representations, like a
     * Yjs Relative Position
     *
     * @see ExternalMapOptions.transformPositionBeforeRender
     */
    transformPosition?: (pos: number) => any;
    /**
     * Allows a custom transform function that modifies how internal positions
     * representations are returned externally
     *
     * @remarks
     *
     * This can be used to transform positions from other representations, like a
     * Yjs Relative Position to a ProseMirror integer (absolute) position
     *
     * @see ExternalMapOptions.transformPosition
     */
    transformPositionBeforeRender?: (rpos: any) => number | null;
}

/**
 * You can pass `helpers.getAnnotationsAt`, which implements the required
 * behavior.
 *
 * @returns the annotations at a specific position
 */
declare type GetAnnotationsAt = (pos: number) => MinimalAnnotation[];

export declare type GetStyle<Type extends Annotation> = (annotations: Array<OmitText<Type>>) => string | undefined;

export declare interface MapLike<K extends string, V> {
    clear?: () => void;
    delete: (key: K) => any;
    forEach: (callbackfn: (value: V, key: K, map: MapLike<K, V>) => void, thisArg?: any) => void;
    get: (key: K) => V | undefined;
    has: (key: K) => boolean;
    set: (key: K, value: V) => any;
    readonly size: number;
}

export declare class MapLikeAnnotationStore<Type extends Annotation> implements AnnotationStore<Type> {
    protected readonly map: MapLike<string, TransformedAnnotation<OmitText<Type>>>;
    private readonly positionToStored;
    private readonly positionFromStored;
    /**
     * @param map a custom map-like object for storing internal annotations
     */
    constructor(map?: MapLike<string, TransformedAnnotation<OmitText<Type>>>, positionToStored?: (pos: number) => any, positionFromStored?: (storedPos: any) => number | null);
    addAnnotation({ from, to, ...annotation }: OmitText<Type>): void;
    updateAnnotation(id: string, data: OmitTextAndPosition<Type>): void;
    removeAnnotations(ids: string[]): void;
    setAnnotations(annotations: Array<OmitText<Type>>): void;
    formatAnnotations(): Array<OmitText<Type>>;
}

declare type MinimalAnnotation = Pick<Annotation, 'from' | 'to'> & {
    text: string | undefined;
};

/** Translate all options in T to use {@link AcceptUndefined} */
declare type ObsoleteOptions<T> = {
    [K in keyof T]: AcceptUndefined<T[K]>;
};

/**
 * Remove the text field from an annotation.
 */
declare type OmitText<Type extends Annotation> = Omit<Type, 'text'>;
export { OmitText }
export { OmitText as OmitText_alias_1 }

/**
 * Get the data of the annotation without the fields managed by ProseMirror.
 */
declare type OmitTextAndPosition<Type extends Annotation> = Omit<Type, 'text' | 'from' | 'to'>;
export { OmitTextAndPosition }
export { OmitTextAndPosition as OmitTextAndPosition_alias_1 }

export declare interface RemoveAnnotationsAction {
    type: ActionType.REMOVE_ANNOTATIONS;
    annotationIds: string[];
}

/**
 * Reflects one non-overlapping segment
 */
export declare interface Segment<Type extends Annotation> extends FromToProps {
    annotations: Array<OmitText<Type>>;
}

export declare interface SetAnnotationsAction<Type extends Annotation> {
    type: ActionType.SET_ANNOTATIONS;
    annotations: Array<OmitText<Type>>;
}

/**
 * Creates non-overlapping segments based on overlapping annotations.
 *
 * Prosemirror combines overlapping inline decorations by creating segments in
 * which the props of each overlapping decoration are merged.
 *
 * The Prosemirror approach doesn't allow to calculate styles based on multiple
 * annotations, e.g. a darker background shade if there are multiple
 * annotations.
 *
 * To overcome this limitations, this method calculates non-overlapping segments
 * with overlapping annotations. These segments can be used to create
 * ProseMirror decorations with a style that reflects all all annotations within
 * the segment.
 *
 * Approach was confirmed by Marijn:
 * https://discuss.prosemirror.net/t/how-to-style-overlapping-inline-decorations/3162
 */
export declare function toSegments<A extends Annotation>(annotations: Array<OmitText<A>>): Array<Segment<A>>;

export declare type TransformedAnnotation<T extends object> = Omit<T, 'from' | 'to'> & {
    /**
     * Document transformed position where the annotation starts.
     */
    from: any;
    /**
     * Document transformed position where the annotation ends.
     */
    to: any;
};

export declare interface UpdateAnnotationAction<Type extends Annotation> {
    type: ActionType.UPDATE_ANNOTATION;
    annotationId: string;
    annotationData: OmitTextAndPosition<Type>;
}

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      annotation: AnnotationExtension;
    }
  }
}
