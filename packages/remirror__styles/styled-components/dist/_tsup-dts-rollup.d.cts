/// <reference types="react" />

import { DetailedHTMLProps } from 'react';
import { ElementType } from 'react';
import { FastOmit } from 'styled-components';
import { HTMLAttributes } from 'react';
import { IStyledComponentBase } from 'styled-components/dist/types';
import { RuleSet } from 'styled-components';
import { SerializedStyles } from '@emotion/react';
import { StyledComponent } from '@emotion/styled';
import { Theme } from '@emotion/react';

/**
 * Add styles to the provided element.
 *
 * This is useful when using the pure dom to control styles.
 *
 * ```ts
 * import { createDomManager, createDomEditor } from 'remirror/dom';
 * import { BoldExtension } from 'remirror/extensions';
 * import { addStylesToElement, allStyles } from 'remirror/styles/dom';
 *
 * const manager = createDomManager(() => [new BoldExtension()]);
 * const wrapperElement = document.createElement('div');
 * const editor = createDomEditor({ manager, element: wrapperElement });
 *
 * addStylesToElement(wrapperElement, allStyles); // Styles added to element.
 * ```
 *
 * The above snippet will add all styles to the element and all elements it
 * contains.
 */
declare function addStylesToElement(element: Element, css: string): void;
export { addStylesToElement }
export { addStylesToElement as addStylesToElement_alias_1 }

export declare const AllStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const AllStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const allStyledCss: string;

export declare const allStyledCss_alias_1: SerializedStyles;

export declare const allStyledCss_alias_2: RuleSet<object>;

export declare const ComponentsStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const ComponentsStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const componentsStyledCss: string;

/**
 * AUTO GENERATED FILE - TO UPDATE RUN: `pnpm -w run fix:css`
 */
export declare const componentsStyledCss_alias_1: SerializedStyles;

/**
 * AUTO GENERATED FILE - TO UPDATE RUN: `pnpm -w run fix:css`
 */
export declare const componentsStyledCss_alias_2: RuleSet<object>;

export declare const CoreStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const CoreStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const coreStyledCss: string;

export declare const coreStyledCss_alias_1: SerializedStyles;

export declare const coreStyledCss_alias_2: RuleSet<object>;

export declare const ExtensionBlockquoteStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const ExtensionBlockquoteStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const extensionBlockquoteStyledCss: string;

export declare const extensionBlockquoteStyledCss_alias_1: SerializedStyles;

export declare const extensionBlockquoteStyledCss_alias_2: RuleSet<object>;

export declare const ExtensionCalloutStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const ExtensionCalloutStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const extensionCalloutStyledCss: string;

export declare const extensionCalloutStyledCss_alias_1: SerializedStyles;

export declare const extensionCalloutStyledCss_alias_2: RuleSet<object>;

export declare const ExtensionCodeBlockStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const ExtensionCodeBlockStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const extensionCodeBlockStyledCss: string;

export declare const extensionCodeBlockStyledCss_alias_1: SerializedStyles;

export declare const extensionCodeBlockStyledCss_alias_2: RuleSet<object>;

export declare const ExtensionCountStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const ExtensionCountStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const extensionCountStyledCss: string;

export declare const extensionCountStyledCss_alias_1: SerializedStyles;

export declare const extensionCountStyledCss_alias_2: RuleSet<object>;

export declare const ExtensionEmojiStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const ExtensionEmojiStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const extensionEmojiStyledCss: string;

export declare const extensionEmojiStyledCss_alias_1: SerializedStyles;

export declare const extensionEmojiStyledCss_alias_2: RuleSet<object>;

export declare const ExtensionFileStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const ExtensionFileStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const extensionFileStyledCss: string;

export declare const extensionFileStyledCss_alias_1: SerializedStyles;

export declare const extensionFileStyledCss_alias_2: RuleSet<object>;

export declare const ExtensionGapCursorStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const ExtensionGapCursorStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const extensionGapCursorStyledCss: string;

export declare const extensionGapCursorStyledCss_alias_1: SerializedStyles;

export declare const extensionGapCursorStyledCss_alias_2: RuleSet<object>;

export declare const ExtensionImageStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const ExtensionImageStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const extensionImageStyledCss: string;

export declare const extensionImageStyledCss_alias_1: SerializedStyles;

export declare const extensionImageStyledCss_alias_2: RuleSet<object>;

export declare const ExtensionListStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const ExtensionListStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const extensionListStyledCss: string;

export declare const extensionListStyledCss_alias_1: SerializedStyles;

export declare const extensionListStyledCss_alias_2: RuleSet<object>;

export declare const ExtensionMentionAtomStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const ExtensionMentionAtomStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const extensionMentionAtomStyledCss: string;

export declare const extensionMentionAtomStyledCss_alias_1: SerializedStyles;

export declare const extensionMentionAtomStyledCss_alias_2: RuleSet<object>;

export declare const ExtensionNodeFormattingStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const ExtensionNodeFormattingStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const extensionNodeFormattingStyledCss: string;

export declare const extensionNodeFormattingStyledCss_alias_1: SerializedStyles;

export declare const extensionNodeFormattingStyledCss_alias_2: RuleSet<object>;

export declare const ExtensionPlaceholderStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const ExtensionPlaceholderStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const extensionPlaceholderStyledCss: string;

export declare const extensionPlaceholderStyledCss_alias_1: SerializedStyles;

export declare const extensionPlaceholderStyledCss_alias_2: RuleSet<object>;

export declare const ExtensionPositionerStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const ExtensionPositionerStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const extensionPositionerStyledCss: string;

export declare const extensionPositionerStyledCss_alias_1: SerializedStyles;

export declare const extensionPositionerStyledCss_alias_2: RuleSet<object>;

export declare const ExtensionTablesStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const ExtensionTablesStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const extensionTablesStyledCss: string;

export declare const extensionTablesStyledCss_alias_1: SerializedStyles;

export declare const extensionTablesStyledCss_alias_2: RuleSet<object>;

export declare const ExtensionWhitespaceStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const ExtensionWhitespaceStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const extensionWhitespaceStyledCss: string;

export declare const extensionWhitespaceStyledCss_alias_1: SerializedStyles;

export declare const extensionWhitespaceStyledCss_alias_2: RuleSet<object>;

export declare const ExtensionYjsStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const ExtensionYjsStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const extensionYjsStyledCss: string;

export declare const extensionYjsStyledCss_alias_1: SerializedStyles;

export declare const extensionYjsStyledCss_alias_2: RuleSet<object>;

export declare const ThemeStyledComponent: StyledComponent<    {
theme?: Theme | undefined;
as?: ElementType<any> | undefined;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export declare const ThemeStyledComponent_alias_1: IStyledComponentBase<"web", FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

export declare const themeStyledCss: string;

export declare const themeStyledCss_alias_1: SerializedStyles;

export declare const themeStyledCss_alias_2: RuleSet<object>;

export { }
