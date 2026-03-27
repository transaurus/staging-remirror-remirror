import { ApplyStateLifecycleProps } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { DecorationSet } from '@remirror/pm/view';
import { EditorState } from '@remirror/core';
import { FromToProps } from '@remirror/core';
import { Helper } from '@remirror/core';
import { OnSetOptionsProps } from '@remirror/core';
import { PlainExtension } from '@remirror/core';
import { ProsemirrorNode } from '@remirror/core';
import { Static } from '@remirror/core';

declare interface CharacterBuilderProps {
    key: string;
    /**
     * Check the provided character to see if it is an invisible character.
     */
    predicate: (character: string) => boolean;
}

/**
 * Build a hidden character creator which responds to certain characters in the
 * document.
 */
export declare function createCharacterBuilder(builderOptions: CharacterBuilderProps): (details: WhitespaceRange) => DecorationSet;

export declare function createDefaultWhitespaceDecorators(settings: WhitespaceDecoratorSettings): {
    hardBreak: (details: WhitespaceRange) => DecorationSet;
    paragraph: (details: WhitespaceRange) => DecorationSet;
    space: (details: WhitespaceRange) => DecorationSet;
};

/**
 * The built in whitespace decorations.
 */
export declare type DefaultDecorator = 'hardBreak' | 'paragraph' | 'space';

/**
 * Generate a decoration set of whitespace characters for the provided range.
 */
export declare function generateDecorations(props: GenerateDecorationsProps): DecorationSet;

declare interface GenerateDecorationsProps extends FromToProps {
    /**
     * The starting decoration set.
     *
     * @defaultValue DecorationSet.empty
     */
    decorationSet?: DecorationSet;
    /**
     * The document which is being acted on.
     */
    doc: ProsemirrorNode;
    /**
     * A list of the whitespace decorators which are used to create decorations
     * from the provided ranges.
     */
    decorators: WhitespaceDecorator[];
}

export declare const toggleWhitespaceOptions: Remirror.CommandDecoratorOptions;

/**
 * The whitespace decorator function
 */
export declare type WhitespaceDecorator = (details: WhitespaceRange) => DecorationSet;

export declare interface WhitespaceDecoratorSettings {
    /**
     * The nodes that are interpreted as break nodes.
     *
     * @defaultValue ['hardBreak']
     */
    breakNodes?: string[];
    /**
     * The nodes that are interpreted as paragraph nodes.
     *
     * @defaultValue ['paragraph']
     */
    paragraphNodes?: string[];
    /**
     * The text which should be interpreted as space characters.
     *
     * @defaultValue [' ']
     */
    spaceCharacters?: string[];
}

/**
 * Manage whitespace characters within your editor.
 *
 * This adds decorators to the editor to represent the whitespace characters and
 * can be useful for increasing the accessibility of your editor.
 */
declare class WhitespaceExtension extends PlainExtension<WhitespaceOptions> {
    private active;
    /**
     * Set this to true to force updates to the decorationSet even if the editor
     * doc hasn't been changed. This is set to true when running commands.
     */
    private forcedUpdate;
    /**
     * The white space decorations to be applied.
     */
    private decorationSet;
    /**
     * The decorator methods which are used to produce the whitespace characters
     * in for the provided ranges.
     */
    private decorators;
    get name(): "whitespace";
    onCreate(): void;
    /**
     * Create the initial decoration state.
     */
    onInitState(state: EditorState): void;
    /**
     * Update the whitespace decorations for each state update.
     */
    onApplyState(props: ApplyStateLifecycleProps): void;
    createDecorations(): DecorationSet;
    /**
     * When the decorators are updated we should update trigger an update to the
     * editor state.
     */
    protected onSetOptions(props: OnSetOptionsProps<WhitespaceOptions>): void;
    /**
     * Generate the whitespace decorations for the full .
     */
    private createFullDecorationSet;
    /**
     * Create the decorators array.
     */
    private updateDecorators;
    /**
     * Toggle the visibility of whitespace characters.
     */
    toggleWhitespace(): CommandFunction;
    /**
     * Force the white space characters to be shown.
     */
    showWhitespace(): CommandFunction;
    /**
     * Force the white space characters to be shown.
     */
    hideWhitespace(): CommandFunction;
    /**
     * Determine if whitespace characters are currently shown.
     */
    isWhitespaceVisible(): Helper<boolean>;
}
export { WhitespaceExtension }
export { WhitespaceExtension as WhitespaceExtension_alias_1 }

export declare interface WhitespaceOptions extends WhitespaceDecoratorSettings {
    /**
     * The initial whitespace visibility.
     *
     * @defaultValue false
     */
    initialVisibility?: Static<boolean>;
    /**
     * The list of default decorators that are used.
     */
    decorators?: Array<DefaultDecorator | WhitespaceDecorator>;
}

export declare interface WhitespaceRange extends FromToProps {
    doc: ProsemirrorNode;
    decorationSet: DecorationSet;
}

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      whitespace: WhitespaceExtension;
    }
  }
}
