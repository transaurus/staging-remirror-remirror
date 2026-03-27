import type { CreateEditorStateProps } from 'remirror';
import { FC } from 'react';
import { MentionAtomNodeAttributes } from 'remirror/extensions';
import { PropsWithChildren } from 'react';
import type { RemirrorProps } from '@remirror/react';
import type { UseThemeProps } from '@remirror/react';

/**
 * Bubble menu for the pre-packaged editors
 */
export declare const BubbleMenu: FC;

export declare const default_alias: {
    title: string;
};

/**
 * The editor which is used to create the annotation. Supports formatting.
 */
declare const MarkdownEditor: FC<PropsWithChildren<MarkdownEditorProps>>;
export { MarkdownEditor }
export { MarkdownEditor as MarkdownEditor_alias_1 }

declare interface MarkdownEditorProps extends Partial<Omit<ReactEditorProps, 'stringHandler'>> {
}
export { MarkdownEditorProps }
export { MarkdownEditorProps as MarkdownEditorProps_alias_1 }

declare interface MentionComponentProps<UserData extends MentionAtomNodeAttributes = MentionAtomNodeAttributes> {
    users?: UserData[];
    tags?: string[];
}

export declare interface ReactEditorProps extends Pick<CreateEditorStateProps, 'stringHandler'>, Pick<RemirrorProps, 'initialContent' | 'editable' | 'autoFocus' | 'hooks' | 'i18nFormat' | 'locale' | 'supportedLocales'> {
    placeholder?: string;
    theme?: UseThemeProps['theme'];
}

declare const SocialEditor: FC<PropsWithChildren<SocialEditorProps>>;
export { SocialEditor }
export { SocialEditor as SocialEditor_alias_1 }

declare interface SocialEditorProps extends Partial<ReactEditorProps>, Pick<MentionComponentProps, 'users' | 'tags'> {
}
export { SocialEditorProps }
export { SocialEditorProps as SocialEditorProps_alias_1 }

export declare const TopToolbar: FC;

declare const WysiwygEditor: FC<PropsWithChildren<WysiwygEditorProps>>;
export { WysiwygEditor }
export { WysiwygEditor as WysiwygEditor_alias_1 }

declare interface WysiwygEditorProps extends Partial<ReactEditorProps> {
}
export { WysiwygEditorProps }
export { WysiwygEditorProps as WysiwygEditorProps_alias_1 }

export { }
