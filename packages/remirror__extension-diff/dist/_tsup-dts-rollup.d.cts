import { CommandFunction } from '@remirror/core';
import { CreateExtensionPlugin } from '@remirror/core';
import { DecorationSet } from '@remirror/pm/view';
import { FromToProps } from '@remirror/core';
import { Handler } from '@remirror/core';
import { Helper } from '@remirror/core';
import { PlainExtension } from '@remirror/core';
import { Static } from '@remirror/core';
import type { Step } from '@remirror/pm/transform';
import type { StepMap } from '@remirror/pm/transform';
import type { Transform } from '@remirror/pm/transform';

export declare class Commit {
    message: string;
    time: number;
    steps: Step[];
    maps: StepMap[];
    hidden?: boolean;
    constructor(props: CommitConstructorProps);
}

declare interface CommitConstructorProps {
    message: string;
    time: number;
    steps: Step[];
    maps: StepMap[];
    hidden?: boolean;
}

declare type CommitId = number | 'first' | 'last';

/**
 * An extension for the remirror editor. CHANGE ME.
 */
declare class DiffExtension extends PlainExtension<DiffOptions> {
    get name(): "diff";
    private hovered?;
    private selections?;
    /**
     * Create the custom change tracking plugin.
     *
     * This has been adapted from the prosemirror website demo.
     * https://github.com/ProseMirror/website/blob/master/example/track/index.js
     */
    createPlugin(): CreateExtensionPlugin;
    /**
     * Highlight the provided commit.
     */
    highlightCommit(commit: Commit | CommitId): CommandFunction;
    /**
     * Remove the highlight from the commit.
     */
    removeHighlightedCommit(commit: Commit | CommitId): CommandFunction;
    /**
     * Add a commit to the transaction history.
     */
    commitChange(message: string): CommandFunction;
    /**
     * Revert a commit which was added to the transaction history.
     */
    revertCommit(commit?: Commit): CommandFunction;
    /**
     * Get the full list of tracked commit changes
     */
    getCommits(): Helper<Commit[]>;
    private getIndexByName;
    /**
     * Get the commit by it's index
     */
    getCommit(id: CommitId): Helper<Commit>;
    private getCommitId;
    /**
     * Get the meta data for this custom plugin.
     */
    private getMeta;
    /**
     * Set the meta data for the plugin.
     */
    private setMeta;
    /**
     * Calls the selection handlers when the selection changes the number of
     * commit spans covered.
     */
    private handleSelection;
    /**
     * Transform the view and event into a commit and span.
     */
    private getHandlerPropsFromEvent;
    /**
     * Capture the mouseover event and trigger the `onMouseOverCommit` handler
     * when it is captured.
     */
    private handlerMouseOver;
    /**
     * Capture the mouseleave event and trigger the `onMouseLeaveCommit` handler.
     */
    private handleMouseLeave;
    /**
     * Create the initial plugin state for the custom plugin.
     */
    private createInitialState;
    /**
     * Apply state updates in response to document changes.
     */
    private applyStateUpdates;
    private createDecorationSet;
    /**
     * Apply updates to the highlight decorations.
     */
    private updateHighlights;
    /**
     * Apply updates for the commit tracker.
     *
     * Please note this isn't able to track marks and diffs. It can only
     * track changes to content.
     */
    private updateTracked;
}
export { DiffExtension }
export { DiffExtension as DiffExtension_alias_1 }

declare interface DiffOptions {
    /**
     * @defaultValue 'blame-marker';
     */
    blameMarkerClass?: Static<string>;
    /**
     * @defaultValue `(message: string) => "Revert: '" + message + "'"`
     */
    revertMessage?: (message: string) => string;
    /**
     * A handler that is called whenever a tracked change is hovered over in the
     * editor.
     */
    onMouseOverCommit?: Handler<(props: HandlerProps) => void>;
    /**
     * A handler that is called whenever a tracked change was being hovered is no
     * longer hovered.
     */
    onMouseLeaveCommit?: Handler<(props: HandlerProps) => void>;
    /**
     * Called when the commit is part of the current text selection. Called with
     * an array of possible selection.
     */
    onSelectCommits?: Handler<(selections: HandlerProps[], previousSelections?: HandlerProps[]) => void>;
    /**
     * Called when commits are deselected.
     */
    onDeselectCommits?: Handler<(selections: HandlerProps[]) => void>;
}
export { DiffOptions }
export { DiffOptions as DiffOptions_alias_1 }

declare interface DiffPluginState extends TrackedStateProps, HighlightStateProps {
}
export { DiffPluginState }
export { DiffPluginState as DiffPluginState_alias_1 }

declare interface HandlerProps extends FromToProps {
    /**
     * The commit.
     */
    commit: Commit;
}
export { HandlerProps }
export { HandlerProps as HandlerProps_alias_1 }

declare interface HighlightStateProps {
    /**
     * The decorations for highlighted commits.
     */
    decorations: DecorationSet;
    /**
     * The id's of the commits to be highlighted.
     */
    commits?: number[];
}

export declare class Span {
    from: number;
    to: number;
    commit: number | undefined;
    constructor(props: SpanConstructorProps);
}

declare interface SpanConstructorProps {
    from: number;
    to: number;
    commit: number | undefined;
}

declare interface TrackedStateProps {
    /**
     * The tracked state.
     */
    tracked: TrackState;
}

export declare class TrackState {
    blameMap: Span[];
    commits: Commit[];
    uncommittedSteps: Step[];
    uncommittedMaps: StepMap[];
    constructor(props: TrackStateConstructorProps);
    /**
     * Apply a transform to this state.
     */
    applyTransform(transform: Transform): TrackState;
    /**
     * When a transaction is marked as a commit, this is used to put any
     * uncommitted steps into a new commit.
     */
    applyCommit(message: string, time: number): TrackState;
}

declare interface TrackStateConstructorProps {
    blameMap: Span[];
    commits: Commit[];
    uncommittedSteps: Step[];
    uncommittedMaps: StepMap[];
}

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      diff: DiffExtension;
    }
  }
}
