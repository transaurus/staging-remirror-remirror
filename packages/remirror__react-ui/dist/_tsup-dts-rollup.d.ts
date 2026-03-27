import { AnyExtensionConstructor } from '@remirror/core';
import { BoxProps } from '@mui/material';
import { CalloutExtensionAttributes } from '@remirror/extension-callout';
import { CodeBlockAttributes } from '@remirror/extension-code-block';
import { ColumnAttributes } from '@remirror/extension-columns';
import { CommandDecoratorMessageProps } from '@remirror/core';
import { CommandDecoratorShortcut } from '@remirror/core';
import { CommandDecoratorValue } from '@remirror/core';
import { CommandUiIcon } from '@remirror/core';
import { CoreIcon } from '@remirror/core';
import type { CoreIcon as CoreIcon_2 } from '@remirror/icons';
import { DividerProps } from '@mui/material';
import { FC } from 'react';
import { HeadingExtensionAttributes } from '@remirror/extension-heading';
import { I18nFormatter } from '@remirror/core';
import { MenuItemProps } from '@mui/material';
import { MenuProps } from '@mui/material';
import { MouseEvent as MouseEvent_2 } from 'react';
import { PointerEvent as PointerEvent_2 } from 'react';
import { PopperProps } from '@mui/material';
import type { PositionerParam } from '@remirror/extension-positioner';
import { ProsemirrorAttributes } from '@remirror/core';
import { default as React_2 } from 'react';
import { ReactElement } from 'react';
import { ReactNode } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { StackProps } from '@mui/material';
import { Theme } from '@mui/material';
import { ToggleButtonProps } from '@mui/material';

declare const BaselineButtonGroup: FC<BaselineButtonGroupProps>;
export { BaselineButtonGroup }
export { BaselineButtonGroup as BaselineButtonGroup_alias_1 }
export { BaselineButtonGroup as BaselineButtonGroup_alias_2 }

declare interface BaselineButtonGroupProps {
    children?: ReactNode | ReactNode[];
}
export { BaselineButtonGroupProps }
export { BaselineButtonGroupProps as BaselineButtonGroupProps_alias_1 }
export { BaselineButtonGroupProps as BaselineButtonGroupProps_alias_2 }

declare const BasicFormattingButtonGroup: FC<BasicFormattingButtonGroupProps>;
export { BasicFormattingButtonGroup }
export { BasicFormattingButtonGroup as BasicFormattingButtonGroup_alias_1 }
export { BasicFormattingButtonGroup as BasicFormattingButtonGroup_alias_2 }

declare interface BasicFormattingButtonGroupProps {
    children?: ReactNode | ReactNode[];
}
export { BasicFormattingButtonGroupProps }
export { BasicFormattingButtonGroupProps as BasicFormattingButtonGroupProps_alias_1 }
export { BasicFormattingButtonGroupProps as BasicFormattingButtonGroupProps_alias_2 }

declare const CalloutTypeButtonGroup: FC<CalloutTypeButtonGroupProps>;
export { CalloutTypeButtonGroup }
export { CalloutTypeButtonGroup as CalloutTypeButtonGroup_alias_1 }
export { CalloutTypeButtonGroup as CalloutTypeButtonGroup_alias_2 }

declare interface CalloutTypeButtonGroupProps {
    children?: ReactNode | ReactNode[];
}
export { CalloutTypeButtonGroupProps }
export { CalloutTypeButtonGroupProps as CalloutTypeButtonGroupProps_alias_1 }
export { CalloutTypeButtonGroupProps as CalloutTypeButtonGroupProps_alias_2 }

declare const CASINGS: {
    title: (value: string) => string;
    upper: (value: string) => string;
    lower: (value: string) => string;
};

declare const CenterAlignButton: FC<CenterAlignButtonProps>;
export { CenterAlignButton }
export { CenterAlignButton as CenterAlignButton_alias_1 }
export { CenterAlignButton as CenterAlignButton_alias_2 }

declare interface CenterAlignButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { CenterAlignButtonProps }
export { CenterAlignButtonProps as CenterAlignButtonProps_alias_1 }
export { CenterAlignButtonProps as CenterAlignButtonProps_alias_2 }

declare const CodeBlockFormatButton: ({ text, className, onClick, }: CodeBlockFormatButtonProps) => JSX.Element | null;
export { CodeBlockFormatButton }
export { CodeBlockFormatButton as CodeBlockFormatButton_alias_1 }
export { CodeBlockFormatButton as CodeBlockFormatButton_alias_2 }
export { CodeBlockFormatButton as CodeBlockFormatButton_alias_3 }

declare interface CodeBlockFormatButtonProps {
    text?: string;
    className?: string;
    onClick?: (event: MouseEvent_2<HTMLButtonElement>) => boolean;
}
export { CodeBlockFormatButtonProps }
export { CodeBlockFormatButtonProps as CodeBlockFormatButtonProps_alias_1 }
export { CodeBlockFormatButtonProps as CodeBlockFormatButtonProps_alias_2 }
export { CodeBlockFormatButtonProps as CodeBlockFormatButtonProps_alias_3 }

declare const CodeBlockLanguageSelect: ({ languages, className, onLanguageChange, onPointerDownSelect, onSelectChange, }: CodeBlockLanguageSelectProps) => JSX.Element | null;
export { CodeBlockLanguageSelect }
export { CodeBlockLanguageSelect as CodeBlockLanguageSelect_alias_1 }
export { CodeBlockLanguageSelect as CodeBlockLanguageSelect_alias_2 }
export { CodeBlockLanguageSelect as CodeBlockLanguageSelect_alias_3 }

declare interface CodeBlockLanguageSelectProps {
    languages?: Array<{
        displayName: string;
        value?: string;
    }>;
    className?: string;
    onLanguageChange?: (language: string, element: HTMLElement | undefined) => boolean;
    onPointerDownSelect?: (event: PointerEvent_2<HTMLDivElement>) => boolean;
    onSelectChange?: (event: SelectChangeEvent) => boolean;
}
export { CodeBlockLanguageSelectProps }
export { CodeBlockLanguageSelectProps as CodeBlockLanguageSelectProps_alias_1 }
export { CodeBlockLanguageSelectProps as CodeBlockLanguageSelectProps_alias_2 }
export { CodeBlockLanguageSelectProps as CodeBlockLanguageSelectProps_alias_3 }

declare const CodeBlockTools: ({ position, offset, className, children, }: CodeBlockToolsProps) => JSX.Element | null;
export { CodeBlockTools }
export { CodeBlockTools as CodeBlockTools_alias_1 }
export { CodeBlockTools as CodeBlockTools_alias_2 }
export { CodeBlockTools as CodeBlockTools_alias_3 }

declare interface CodeBlockToolsProps {
    position?: 'left' | 'right';
    offset?: {
        x: number;
        y: number;
    };
    className?: string;
    children: React_2.ReactNode | React_2.ReactNode[];
}
export { CodeBlockToolsProps }
export { CodeBlockToolsProps as CodeBlockToolsProps_alias_1 }
export { CodeBlockToolsProps as CodeBlockToolsProps_alias_2 }
export { CodeBlockToolsProps as CodeBlockToolsProps_alias_3 }

declare const CommandButton: FC<CommandButtonProps>;
export { CommandButton }
export { CommandButton as CommandButton_alias_1 }
export { CommandButton as CommandButton_alias_2 }

export declare const CommandButtonBadge: FC<CommandButtonBadgeProps>;

export declare interface CommandButtonBadgeProps {
    icon?: CommandUiIcon | CoreIcon | JSX.Element | null;
    children: ReactNode;
}

declare const CommandButtonGroup: FC<CommandButtonGroupProps>;
export { CommandButtonGroup }
export { CommandButtonGroup as CommandButtonGroup_alias_1 }
export { CommandButtonGroup as CommandButtonGroup_alias_2 }

declare interface CommandButtonGroupProps extends Omit<BoxProps, 'children'> {
    children: ReactNode | ReactNode[];
}
export { CommandButtonGroupProps }
export { CommandButtonGroupProps as CommandButtonGroupProps_alias_1 }
export { CommandButtonGroupProps as CommandButtonGroupProps_alias_2 }

export declare const CommandButtonIcon: FC<CommandButtonIconProps>;

export declare interface CommandButtonIconProps {
    icon: CoreIcon | JSX.Element | null;
}

declare interface CommandButtonProps extends Omit<ToggleButtonProps, 'value' | 'aria-label'>, Omit<UseCommandOptionValuesParams, 'active' | 'attrs'> {
    active?: UseCommandOptionValuesParams['active'];
    'aria-label'?: string;
    label?: NonNullable<ReactNode>;
    commandName: string;
    displayShortcut?: boolean;
    onSelect: () => void;
    icon?: CoreIcon | JSX.Element;
    attrs?: UseCommandOptionValuesParams['attrs'];
}
export { CommandButtonProps }
export { CommandButtonProps as CommandButtonProps_alias_1 }
export { CommandButtonProps as CommandButtonProps_alias_2 }

declare const CommandMenuItem: FC<CommandMenuItemProps>;
export { CommandMenuItem }
export { CommandMenuItem as CommandMenuItem_alias_1 }
export { CommandMenuItem as CommandMenuItem_alias_2 }

declare interface CommandMenuItemProps extends MenuItemProps, Omit<UseCommandOptionValuesParams, 'active' | 'attrs'> {
    active?: UseCommandOptionValuesParams['active'];
    commandName: string;
    displayShortcut?: boolean;
    onSelect: () => void;
    icon?: CoreIcon | JSX.Element | null;
    attrs?: UseCommandOptionValuesParams['attrs'];
    label?: NonNullable<ReactNode>;
    description?: NonNullable<ReactNode>;
    displayDescription?: boolean;
}
export { CommandMenuItemProps }
export { CommandMenuItemProps as CommandMenuItemProps_alias_1 }
export { CommandMenuItemProps as CommandMenuItemProps_alias_2 }

declare const CopyButton: FC<CopyButtonProps>;
export { CopyButton }
export { CopyButton as CopyButton_alias_1 }
export { CopyButton as CopyButton_alias_2 }

declare interface CopyButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { CopyButtonProps }
export { CopyButtonProps as CopyButtonProps_alias_1 }
export { CopyButtonProps as CopyButtonProps_alias_2 }

declare const CreateTableButton: FC<CreateTableButtonProps>;
export { CreateTableButton }
export { CreateTableButton as CreateTableButton_alias_1 }
export { CreateTableButton as CreateTableButton_alias_2 }

declare interface CreateTableButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { CreateTableButtonProps }
export { CreateTableButtonProps as CreateTableButtonProps_alias_1 }
export { CreateTableButtonProps as CreateTableButtonProps_alias_2 }

declare const CutButton: FC<CutButtonProps>;
export { CutButton }
export { CutButton as CutButton_alias_1 }
export { CutButton as CutButton_alias_2 }

declare interface CutButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { CutButtonProps }
export { CutButtonProps as CutButtonProps_alias_1 }
export { CutButtonProps as CutButtonProps_alias_2 }

declare const DataTransferButtonGroup: FC<DataTransferButtonGroupProps>;
export { DataTransferButtonGroup }
export { DataTransferButtonGroup as DataTransferButtonGroup_alias_1 }
export { DataTransferButtonGroup as DataTransferButtonGroup_alias_2 }

declare interface DataTransferButtonGroupProps {
    children?: ReactNode | ReactNode[];
}
export { DataTransferButtonGroupProps }
export { DataTransferButtonGroupProps as DataTransferButtonGroupProps_alias_1 }
export { DataTransferButtonGroupProps as DataTransferButtonGroupProps_alias_2 }

declare const DecreaseFontSizeButton: FC<DecreaseFontSizeButtonProps>;
export { DecreaseFontSizeButton }
export { DecreaseFontSizeButton as DecreaseFontSizeButton_alias_1 }
export { DecreaseFontSizeButton as DecreaseFontSizeButton_alias_2 }

declare interface DecreaseFontSizeButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { DecreaseFontSizeButtonProps }
export { DecreaseFontSizeButtonProps as DecreaseFontSizeButtonProps_alias_1 }
export { DecreaseFontSizeButtonProps as DecreaseFontSizeButtonProps_alias_2 }

declare const DecreaseIndentButton: FC<DecreaseIndentButtonProps>;
export { DecreaseIndentButton }
export { DecreaseIndentButton as DecreaseIndentButton_alias_1 }
export { DecreaseIndentButton as DecreaseIndentButton_alias_2 }

declare interface DecreaseIndentButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { DecreaseIndentButtonProps }
export { DecreaseIndentButtonProps as DecreaseIndentButtonProps_alias_1 }
export { DecreaseIndentButtonProps as DecreaseIndentButtonProps_alias_2 }

declare const DropdownButton: FC<DropdownButtonProps>;
export { DropdownButton }
export { DropdownButton as DropdownButton_alias_1 }
export { DropdownButton as DropdownButton_alias_2 }

declare interface DropdownButtonProps extends Omit<MenuProps, 'open' | 'anchorEl' | 'id'> {
    'aria-label': string;
    label?: NonNullable<ReactNode>;
    icon?: CoreIcon | JSX.Element;
}
export { DropdownButtonProps }
export { DropdownButtonProps as DropdownButtonProps_alias_1 }
export { DropdownButtonProps as DropdownButtonProps_alias_2 }

declare const FindButton: FC<FindButtonProps>;
export { FindButton }
export { FindButton as FindButton_alias_1 }
export { FindButton as FindButton_alias_2 }

declare interface FindButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { FindButtonProps }
export { FindButtonProps as FindButtonProps_alias_1 }
export { FindButtonProps as FindButtonProps_alias_2 }

export declare const FindController: FC<{
    findPrev: () => void;
    findNext: () => void;
    stopFind: () => void;
    caseSensitive: boolean;
    toggleCaseSensitive: () => void;
    onDismiss?: () => void;
}>;

export declare const FindInput: FC<{
    query: string;
    setQuery: (query: string) => void;
    total: number;
    activeIndex?: number | null;
}>;

declare const FindReplaceComponent: FC<FindReplaceComponentProps>;
export { FindReplaceComponent }
export { FindReplaceComponent as FindReplaceComponent_alias_1 }
export { FindReplaceComponent as FindReplaceComponent_alias_2 }

declare interface FindReplaceComponentProps {
    canToggleReplace?: boolean;
    onDismiss?: () => void;
}
export { FindReplaceComponentProps }
export { FindReplaceComponentProps as FindReplaceComponentProps_alias_1 }
export { FindReplaceComponentProps as FindReplaceComponentProps_alias_2 }

declare interface FindReplaceState {
    query: string;
    replacement: string;
    activeIndex: number | null;
    total: number;
    caseSensitive: boolean;
}

declare const FloatingToolbar: FC<FloatingToolbarProps>;
export { FloatingToolbar }
export { FloatingToolbar as FloatingToolbar_alias_1 }
export { FloatingToolbar as FloatingToolbar_alias_2 }

declare interface FloatingToolbarProps extends Omit<PopperProps, 'open' | 'anchorEl'> {
    positioner?: PositionerParam;
}
export { FloatingToolbarProps }
export { FloatingToolbarProps as FloatingToolbarProps_alias_1 }
export { FloatingToolbarProps as FloatingToolbarProps_alias_2 }

declare const FormattingButtonGroup: FC<FormattingButtonGroupProps>;
export { FormattingButtonGroup }
export { FormattingButtonGroup as FormattingButtonGroup_alias_1 }
export { FormattingButtonGroup as FormattingButtonGroup_alias_2 }

declare interface FormattingButtonGroupProps {
    children?: ReactNode | ReactNode[];
}
export { FormattingButtonGroupProps }
export { FormattingButtonGroupProps as FormattingButtonGroupProps_alias_1 }
export { FormattingButtonGroupProps as FormattingButtonGroupProps_alias_2 }

/**
 * Get the value from the option passed into the command.
 */
export declare function getCommandOptionValue<Type>(value: CommandDecoratorValue<Type> | undefined, commandProps: CommandDecoratorMessageProps): Type | undefined;

/**
 * Get a normalized shortcut as a string.
 */
export declare function getShortcutString(shortcut: string, options: ShortcutStringOptions): string;

/**
 * Get the string value from the available UI Shortcut.
 */
export declare function getUiShortcutString(uiShortcut: CommandDecoratorShortcut, attrs: ProsemirrorAttributes): string;

declare const HeadingLevelButtonGroup: FC<HeadingLevelButtonGroupProps>;
export { HeadingLevelButtonGroup }
export { HeadingLevelButtonGroup as HeadingLevelButtonGroup_alias_1 }
export { HeadingLevelButtonGroup as HeadingLevelButtonGroup_alias_2 }

declare interface HeadingLevelButtonGroupProps {
    showAll?: boolean;
    children?: ReactNode | ReactNode[];
}
export { HeadingLevelButtonGroupProps }
export { HeadingLevelButtonGroupProps as HeadingLevelButtonGroupProps_alias_1 }
export { HeadingLevelButtonGroupProps as HeadingLevelButtonGroupProps_alias_2 }

declare const HistoryButtonGroup: FC<HistoryButtonGroupProps>;
export { HistoryButtonGroup }
export { HistoryButtonGroup as HistoryButtonGroup_alias_1 }
export { HistoryButtonGroup as HistoryButtonGroup_alias_2 }

declare interface HistoryButtonGroupProps {
    children?: ReactNode | ReactNode[];
}
export { HistoryButtonGroupProps }
export { HistoryButtonGroupProps as HistoryButtonGroupProps_alias_1 }
export { HistoryButtonGroupProps as HistoryButtonGroupProps_alias_2 }

export declare const IfExtensionPresent: FC<IfExtensionPresentProps>;

export declare interface IfExtensionPresentProps {
    extension: AnyExtensionConstructor;
    children?: ReactNode;
}

declare const IncreaseFontSizeButton: FC<IncreaseFontSizeButtonProps>;
export { IncreaseFontSizeButton }
export { IncreaseFontSizeButton as IncreaseFontSizeButton_alias_1 }
export { IncreaseFontSizeButton as IncreaseFontSizeButton_alias_2 }

declare interface IncreaseFontSizeButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { IncreaseFontSizeButtonProps }
export { IncreaseFontSizeButtonProps as IncreaseFontSizeButtonProps_alias_1 }
export { IncreaseFontSizeButtonProps as IncreaseFontSizeButtonProps_alias_2 }

declare const IncreaseIndentButton: FC<IncreaseIndentButtonProps>;
export { IncreaseIndentButton }
export { IncreaseIndentButton as IncreaseIndentButton_alias_1 }
export { IncreaseIndentButton as IncreaseIndentButton_alias_2 }

declare interface IncreaseIndentButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { IncreaseIndentButtonProps }
export { IncreaseIndentButtonProps as IncreaseIndentButtonProps_alias_1 }
export { IncreaseIndentButtonProps as IncreaseIndentButtonProps_alias_2 }

declare const IndentationButtonGroup: FC<IndentationButtonGroupProps>;
export { IndentationButtonGroup }
export { IndentationButtonGroup as IndentationButtonGroup_alias_1 }
export { IndentationButtonGroup as IndentationButtonGroup_alias_2 }

declare interface IndentationButtonGroupProps {
    children?: ReactNode | ReactNode[];
}
export { IndentationButtonGroupProps }
export { IndentationButtonGroupProps as IndentationButtonGroupProps_alias_1 }
export { IndentationButtonGroupProps as IndentationButtonGroupProps_alias_2 }

declare const InsertHorizontalRuleButton: FC<InsertHorizontalRuleButtonProps>;
export { InsertHorizontalRuleButton }
export { InsertHorizontalRuleButton as InsertHorizontalRuleButton_alias_1 }
export { InsertHorizontalRuleButton as InsertHorizontalRuleButton_alias_2 }

declare interface InsertHorizontalRuleButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { InsertHorizontalRuleButtonProps }
export { InsertHorizontalRuleButtonProps as InsertHorizontalRuleButtonProps_alias_1 }
export { InsertHorizontalRuleButtonProps as InsertHorizontalRuleButtonProps_alias_2 }

declare const JustifyAlignButton: FC<JustifyAlignButtonProps>;
export { JustifyAlignButton }
export { JustifyAlignButton as JustifyAlignButton_alias_1 }
export { JustifyAlignButton as JustifyAlignButton_alias_2 }

declare interface JustifyAlignButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { JustifyAlignButtonProps }
export { JustifyAlignButtonProps as JustifyAlignButtonProps_alias_1 }
export { JustifyAlignButtonProps as JustifyAlignButtonProps_alias_2 }

declare const LeftAlignButton: FC<LeftAlignButtonProps>;
export { LeftAlignButton }
export { LeftAlignButton as LeftAlignButton_alias_1 }
export { LeftAlignButton as LeftAlignButton_alias_2 }

declare interface LeftAlignButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { LeftAlignButtonProps }
export { LeftAlignButtonProps as LeftAlignButtonProps_alias_1 }
export { LeftAlignButtonProps as LeftAlignButtonProps_alias_2 }

declare const ListButtonGroup: FC<ListButtonGroupProps>;
export { ListButtonGroup }
export { ListButtonGroup as ListButtonGroup_alias_1 }
export { ListButtonGroup as ListButtonGroup_alias_2 }

declare interface ListButtonGroupProps {
    children?: ReactNode | ReactNode[];
}
export { ListButtonGroupProps }
export { ListButtonGroupProps as ListButtonGroupProps_alias_1 }
export { ListButtonGroupProps as ListButtonGroupProps_alias_2 }

declare const MarkdownToolbar: FC;
export { MarkdownToolbar }
export { MarkdownToolbar as MarkdownToolbar_alias_1 }
export { MarkdownToolbar as MarkdownToolbar_alias_2 }

export declare const MdiFormatLetterCase: React_2.FC<React_2.SVGProps<SVGSVGElement>>;

/**
 * How to display the symbols.
 */
declare type Modifiers = 'shift' | 'command' | 'control' | 'alt';

declare const PasteButton: FC<PasteButtonProps>;
export { PasteButton }
export { PasteButton as PasteButton_alias_1 }
export { PasteButton as PasteButton_alias_2 }

declare interface PasteButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { PasteButtonProps }
export { PasteButtonProps as PasteButtonProps_alias_1 }
export { PasteButtonProps as PasteButtonProps_alias_2 }

declare const RedoButton: FC<RedoButtonProps>;
export { RedoButton }
export { RedoButton as RedoButton_alias_1 }
export { RedoButton as RedoButton_alias_2 }

declare interface RedoButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { RedoButtonProps }
export { RedoButtonProps as RedoButtonProps_alias_1 }
export { RedoButtonProps as RedoButtonProps_alias_2 }

export declare const ReplaceController: FC<{
    replace: () => void;
    replaceAll: () => void;
}>;

export declare const ReplaceInput: FC<{
    replacement: string;
    setReplacement: (query: string) => void;
}>;

declare const RightAlignButton: FC<RightAlignButtonProps>;
export { RightAlignButton }
export { RightAlignButton as RightAlignButton_alias_1 }
export { RightAlignButton as RightAlignButton_alias_2 }

declare interface RightAlignButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { RightAlignButtonProps }
export { RightAlignButtonProps as RightAlignButtonProps_alias_1 }
export { RightAlignButtonProps as RightAlignButtonProps_alias_2 }

declare interface ShortcutStringOptions {
    /**
     * True to display all named values as symbols (where possible, otherwise
     * display the translated string).
     *
     * @defaultValue false
     */
    namedAsSymbol?: boolean | string[];
    /**
     * `true` to display modifiers as symbols. `false` to display as translated strings.
     *
     * An array to only set the provided array values as symbols.
     *
     * @defaultValue true
     */
    modifierAsSymbol?: boolean | Modifiers[];
    /**
     * How the values should be cased.
     *
     * @defaultValue 'title'
     */
    casing?: keyof typeof CASINGS;
    /**
     * The separator to use between symbols.
     *
     * @defaultValue ' '
     */
    separator?: string;
    /**
     * A translation utility for translating a predefined string / or message
     * descriptor.
     */
    t: I18nFormatter;
}

declare const TextAlignmentButtonGroup: FC<TextAlignmentButtonGroupProps>;
export { TextAlignmentButtonGroup }
export { TextAlignmentButtonGroup as TextAlignmentButtonGroup_alias_1 }
export { TextAlignmentButtonGroup as TextAlignmentButtonGroup_alias_2 }

declare interface TextAlignmentButtonGroupProps {
    showAll?: boolean;
    children?: ReactNode | ReactNode[];
}
export { TextAlignmentButtonGroupProps }
export { TextAlignmentButtonGroupProps as TextAlignmentButtonGroupProps_alias_1 }
export { TextAlignmentButtonGroupProps as TextAlignmentButtonGroupProps_alias_2 }

declare const ToggleBlockquoteButton: FC<ToggleBlockquoteButtonProps>;
export { ToggleBlockquoteButton }
export { ToggleBlockquoteButton as ToggleBlockquoteButton_alias_1 }
export { ToggleBlockquoteButton as ToggleBlockquoteButton_alias_2 }

declare interface ToggleBlockquoteButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { ToggleBlockquoteButtonProps }
export { ToggleBlockquoteButtonProps as ToggleBlockquoteButtonProps_alias_1 }
export { ToggleBlockquoteButtonProps as ToggleBlockquoteButtonProps_alias_2 }

declare const ToggleBoldButton: FC<ToggleBoldButtonProps>;
export { ToggleBoldButton }
export { ToggleBoldButton as ToggleBoldButton_alias_1 }
export { ToggleBoldButton as ToggleBoldButton_alias_2 }

declare interface ToggleBoldButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { ToggleBoldButtonProps }
export { ToggleBoldButtonProps as ToggleBoldButtonProps_alias_1 }
export { ToggleBoldButtonProps as ToggleBoldButtonProps_alias_2 }

declare const ToggleBulletListButton: FC<ToggleBulletListButtonProps>;
export { ToggleBulletListButton }
export { ToggleBulletListButton as ToggleBulletListButton_alias_1 }
export { ToggleBulletListButton as ToggleBulletListButton_alias_2 }

declare interface ToggleBulletListButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { ToggleBulletListButtonProps }
export { ToggleBulletListButtonProps as ToggleBulletListButtonProps_alias_1 }
export { ToggleBulletListButtonProps as ToggleBulletListButtonProps_alias_2 }

declare const ToggleCalloutButton: FC<ToggleCalloutButtonProps>;
export { ToggleCalloutButton }
export { ToggleCalloutButton as ToggleCalloutButton_alias_1 }
export { ToggleCalloutButton as ToggleCalloutButton_alias_2 }

declare interface ToggleCalloutButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
    attrs?: Partial<CalloutExtensionAttributes>;
}
export { ToggleCalloutButtonProps }
export { ToggleCalloutButtonProps as ToggleCalloutButtonProps_alias_1 }
export { ToggleCalloutButtonProps as ToggleCalloutButtonProps_alias_2 }

declare const ToggleCalloutMenuItem: FC<ToggleCalloutMenuItemProps>;
export { ToggleCalloutMenuItem }
export { ToggleCalloutMenuItem as ToggleCalloutMenuItem_alias_1 }
export { ToggleCalloutMenuItem as ToggleCalloutMenuItem_alias_2 }

declare interface ToggleCalloutMenuItemProps extends Omit<CommandMenuItemProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
    attrs?: Partial<CalloutExtensionAttributes>;
}
export { ToggleCalloutMenuItemProps }
export { ToggleCalloutMenuItemProps as ToggleCalloutMenuItemProps_alias_1 }
export { ToggleCalloutMenuItemProps as ToggleCalloutMenuItemProps_alias_2 }

declare const ToggleCodeBlockButton: FC<ToggleCodeBlockButtonProps>;
export { ToggleCodeBlockButton }
export { ToggleCodeBlockButton as ToggleCodeBlockButton_alias_1 }
export { ToggleCodeBlockButton as ToggleCodeBlockButton_alias_2 }

declare interface ToggleCodeBlockButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
    attrs?: Partial<CodeBlockAttributes>;
}
export { ToggleCodeBlockButtonProps }
export { ToggleCodeBlockButtonProps as ToggleCodeBlockButtonProps_alias_1 }
export { ToggleCodeBlockButtonProps as ToggleCodeBlockButtonProps_alias_2 }

declare const ToggleCodeButton: FC<ToggleCodeButtonProps>;
export { ToggleCodeButton }
export { ToggleCodeButton as ToggleCodeButton_alias_1 }
export { ToggleCodeButton as ToggleCodeButton_alias_2 }

declare interface ToggleCodeButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { ToggleCodeButtonProps }
export { ToggleCodeButtonProps as ToggleCodeButtonProps_alias_1 }
export { ToggleCodeButtonProps as ToggleCodeButtonProps_alias_2 }

declare const ToggleColumnsButton: FC<ToggleColumnsButtonProps>;
export { ToggleColumnsButton }
export { ToggleColumnsButton as ToggleColumnsButton_alias_1 }
export { ToggleColumnsButton as ToggleColumnsButton_alias_2 }

declare interface ToggleColumnsButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
    attrs?: Partial<ColumnAttributes>;
}
export { ToggleColumnsButtonProps }
export { ToggleColumnsButtonProps as ToggleColumnsButtonProps_alias_1 }
export { ToggleColumnsButtonProps as ToggleColumnsButtonProps_alias_2 }

declare const ToggleHeadingButton: FC<ToggleHeadingButtonProps>;
export { ToggleHeadingButton }
export { ToggleHeadingButton as ToggleHeadingButton_alias_1 }
export { ToggleHeadingButton as ToggleHeadingButton_alias_2 }

declare interface ToggleHeadingButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
    attrs?: Partial<HeadingExtensionAttributes>;
}
export { ToggleHeadingButtonProps }
export { ToggleHeadingButtonProps as ToggleHeadingButtonProps_alias_1 }
export { ToggleHeadingButtonProps as ToggleHeadingButtonProps_alias_2 }

declare const ToggleHeadingMenuItem: FC<ToggleHeadingMenuItemProps>;
export { ToggleHeadingMenuItem }
export { ToggleHeadingMenuItem as ToggleHeadingMenuItem_alias_1 }
export { ToggleHeadingMenuItem as ToggleHeadingMenuItem_alias_2 }

declare interface ToggleHeadingMenuItemProps extends Omit<CommandMenuItemProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
    attrs?: Partial<HeadingExtensionAttributes>;
}
export { ToggleHeadingMenuItemProps }
export { ToggleHeadingMenuItemProps as ToggleHeadingMenuItemProps_alias_1 }
export { ToggleHeadingMenuItemProps as ToggleHeadingMenuItemProps_alias_2 }

declare const ToggleItalicButton: FC<ToggleItalicButtonProps>;
export { ToggleItalicButton }
export { ToggleItalicButton as ToggleItalicButton_alias_1 }
export { ToggleItalicButton as ToggleItalicButton_alias_2 }

declare interface ToggleItalicButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { ToggleItalicButtonProps }
export { ToggleItalicButtonProps as ToggleItalicButtonProps_alias_1 }
export { ToggleItalicButtonProps as ToggleItalicButtonProps_alias_2 }

declare const ToggleOrderedListButton: FC<ToggleOrderedListButtonProps>;
export { ToggleOrderedListButton }
export { ToggleOrderedListButton as ToggleOrderedListButton_alias_1 }
export { ToggleOrderedListButton as ToggleOrderedListButton_alias_2 }

declare interface ToggleOrderedListButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { ToggleOrderedListButtonProps }
export { ToggleOrderedListButtonProps as ToggleOrderedListButtonProps_alias_1 }
export { ToggleOrderedListButtonProps as ToggleOrderedListButtonProps_alias_2 }

declare const ToggleStrikeButton: FC<ToggleStrikeButtonProps>;
export { ToggleStrikeButton }
export { ToggleStrikeButton as ToggleStrikeButton_alias_1 }
export { ToggleStrikeButton as ToggleStrikeButton_alias_2 }

declare interface ToggleStrikeButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { ToggleStrikeButtonProps }
export { ToggleStrikeButtonProps as ToggleStrikeButtonProps_alias_1 }
export { ToggleStrikeButtonProps as ToggleStrikeButtonProps_alias_2 }

declare const ToggleSubscriptButton: FC<ToggleSubscriptButtonProps>;
export { ToggleSubscriptButton }
export { ToggleSubscriptButton as ToggleSubscriptButton_alias_1 }
export { ToggleSubscriptButton as ToggleSubscriptButton_alias_2 }

declare interface ToggleSubscriptButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { ToggleSubscriptButtonProps }
export { ToggleSubscriptButtonProps as ToggleSubscriptButtonProps_alias_1 }
export { ToggleSubscriptButtonProps as ToggleSubscriptButtonProps_alias_2 }

declare const ToggleSuperscriptButton: FC<ToggleSuperscriptButtonProps>;
export { ToggleSuperscriptButton }
export { ToggleSuperscriptButton as ToggleSuperscriptButton_alias_1 }
export { ToggleSuperscriptButton as ToggleSuperscriptButton_alias_2 }

declare interface ToggleSuperscriptButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { ToggleSuperscriptButtonProps }
export { ToggleSuperscriptButtonProps as ToggleSuperscriptButtonProps_alias_1 }
export { ToggleSuperscriptButtonProps as ToggleSuperscriptButtonProps_alias_2 }

declare const ToggleTaskListButton: FC<ToggleTaskListButtonProps>;
export { ToggleTaskListButton }
export { ToggleTaskListButton as ToggleTaskListButton_alias_1 }
export { ToggleTaskListButton as ToggleTaskListButton_alias_2 }

declare interface ToggleTaskListButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { ToggleTaskListButtonProps }
export { ToggleTaskListButtonProps as ToggleTaskListButtonProps_alias_1 }
export { ToggleTaskListButtonProps as ToggleTaskListButtonProps_alias_2 }

declare const ToggleUnderlineButton: FC<ToggleUnderlineButtonProps>;
export { ToggleUnderlineButton }
export { ToggleUnderlineButton as ToggleUnderlineButton_alias_1 }
export { ToggleUnderlineButton as ToggleUnderlineButton_alias_2 }

declare interface ToggleUnderlineButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { ToggleUnderlineButtonProps }
export { ToggleUnderlineButtonProps as ToggleUnderlineButtonProps_alias_1 }
export { ToggleUnderlineButtonProps as ToggleUnderlineButtonProps_alias_2 }

declare const ToggleWhitespaceButton: FC<ToggleWhitespaceButtonProps>;
export { ToggleWhitespaceButton }
export { ToggleWhitespaceButton as ToggleWhitespaceButton_alias_1 }
export { ToggleWhitespaceButton as ToggleWhitespaceButton_alias_2 }

declare interface ToggleWhitespaceButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { ToggleWhitespaceButtonProps }
export { ToggleWhitespaceButtonProps as ToggleWhitespaceButtonProps_alias_1 }
export { ToggleWhitespaceButtonProps as ToggleWhitespaceButtonProps_alias_2 }

declare const Toolbar: FC<StackProps>;
export { Toolbar }
export { Toolbar as Toolbar_alias_1 }
export { Toolbar as Toolbar_alias_2 }

/**
 * `UIThemeProvider` uses the parent app's MUI theme, or applies Remirror's default
 */
export declare const UiThemeProvider: (props: UiThemeProviderProps) => ReactElement<UiThemeProviderProps>;

export declare interface UiThemeProviderProps {
    children: ReactNode;
}

declare const UndoButton: FC<UndoButtonProps>;
export { UndoButton }
export { UndoButton as UndoButton_alias_1 }
export { UndoButton as UndoButton_alias_2 }

declare interface UndoButtonProps extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
}
export { UndoButtonProps }
export { UndoButtonProps as UndoButtonProps_alias_1 }
export { UndoButtonProps as UndoButtonProps_alias_2 }

export declare const useCommandOptionValues: ({ commandName, active, enabled, attrs, }: UseCommandOptionValuesParams) => UseCommandOptionValuesResult;

export declare interface UseCommandOptionValuesParams extends Omit<CommandDecoratorMessageProps, 't'> {
    commandName: string;
}

export declare interface UseCommandOptionValuesResult {
    description?: string;
    label?: string;
    icon?: CoreIcon_2 | CommandUiIcon;
    shortcut?: string;
}

export declare function useFindReplace(): UseFindReplaceReturn;

declare type UseFindReplaceReturn = FindReplaceState & {
    findNext: () => void;
    findPrev: () => void;
    stopFind: () => void;
    replace: () => void;
    replaceAll: () => void;
    toggleCaseSensitive: () => void;
    setQuery: (query: string) => void;
    setReplacement: (replacement: string) => void;
};

declare function useRemirrorDefaultMuiTheme(): Theme;
export { useRemirrorDefaultMuiTheme }
export { useRemirrorDefaultMuiTheme as useRemirrorDefaultMuiTheme_alias_1 }

declare const VerticalDivider: FC<VerticalDividerProps>;
export { VerticalDivider }
export { VerticalDivider as VerticalDivider_alias_1 }
export { VerticalDivider as VerticalDivider_alias_2 }

declare type VerticalDividerProps = Omit<DividerProps, 'orientation'>;
export { VerticalDividerProps }
export { VerticalDividerProps as VerticalDividerProps_alias_1 }
export { VerticalDividerProps as VerticalDividerProps_alias_2 }

declare const WysiwygToolbar: FC;
export { WysiwygToolbar }
export { WysiwygToolbar as WysiwygToolbar_alias_1 }
export { WysiwygToolbar as WysiwygToolbar_alias_2 }

export { }
