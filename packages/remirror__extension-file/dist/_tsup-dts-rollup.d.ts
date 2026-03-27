import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { ComponentType } from 'react';
import { FileUploader } from '@remirror/core';
import { Handler } from '@remirror/core';
import { KeyBindingProps } from '@remirror/core';
import { NodeExtension } from '@remirror/core';
import { NodeExtensionSpec } from '@remirror/core';
import { NodeSpecOverride } from '@remirror/core';
import { NodeViewComponentProps } from '@remirror/extension-react-component';
import { PasteRule } from '@remirror/pm/paste-rules';
import { PrimitiveSelection } from '@remirror/core';
import { ProsemirrorNode } from '@remirror/core';
import { default as React_2 } from 'react';
import { Transaction } from '@remirror/core';
import { UploadContext } from '@remirror/core';
import { UploadFileHandler } from '@remirror/core';

declare function createBaseuploadFileUploader(): FileUploader<FileAttributes>;
export { createBaseuploadFileUploader }
export { createBaseuploadFileUploader as createBaseuploadFileUploader_alias_1 }
export { createBaseuploadFileUploader as createBaseuploadFileUploader_alias_2 }

declare function createDataUrlFileUploader(): DataUrlFileUploader;
export { createDataUrlFileUploader }
export { createDataUrlFileUploader as createDataUrlFileUploader_alias_1 }
export { createDataUrlFileUploader as createDataUrlFileUploader_alias_2 }

declare function createObjectUrlFileUploader(): FileUploader<FileAttributes>;
export { createObjectUrlFileUploader }
export { createObjectUrlFileUploader as createObjectUrlFileUploader_alias_1 }
export { createObjectUrlFileUploader as createObjectUrlFileUploader_alias_2 }

/**
 * Mock implementation of a FileUploader to test slow file uploads
 */
declare function createSlowFileUploader(): FileUploader<FileAttributes>;
export { createSlowFileUploader }
export { createSlowFileUploader as createSlowFileUploader_alias_1 }
export { createSlowFileUploader as createSlowFileUploader_alias_2 }

declare class DataUrlFileUploader implements FileUploader<FileAttributes> {
    private file;
    private readonly fileReader;
    constructor();
    insert(file: File): FileAttributes;
    upload(): Promise<FileAttributes>;
    abort(): void;
    private getBaseAttrs;
}
export { DataUrlFileUploader }
export { DataUrlFileUploader as DataUrlFileUploader_alias_1 }
export { DataUrlFileUploader as DataUrlFileUploader_alias_2 }

export declare const DeleteIcon: React_2.FC;

export declare const DownloadIcon: React_2.FC;

declare interface FileAttributes {
    /**
     * Unique identifier for a file
     * During the file uploading process, this is a temporary unique ID
     */
    id?: unknown;
    /**
     * URL where the file is stored
     */
    url?: string;
    /**
     * Name of the file
     */
    fileName?: string;
    /**
     * Mime type of the file, e.g. "image/jpeg"
     */
    fileType?: string;
    /**
     * File size in bytes
     */
    fileSize?: number;
    /**
     * Error state for the file, e.g. upload failed
     */
    error?: string | null;
}
export { FileAttributes }
export { FileAttributes as FileAttributes_alias_1 }

export declare const FileComponent: React_2.FC<FileComponentProps>;

export declare type FileComponentProps = NodeViewComponentProps & {
    context?: UploadContext;
    abort: () => void;
};

/**
 * Add a `file` node to the editor.
 */
declare class FileExtension extends NodeExtension<FileOptions> {
    get name(): "file";
    ReactComponent: ComponentType<NodeViewComponentProps>;
    createTags(): "block"[];
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec;
    createPasteRules(): PasteRule[];
    uploadFiles(files: File[]): CommandFunction;
    updateFile(pos: number, attrs: FileAttributes): CommandFunction;
    insertFile(attributes: FileAttributes, selection?: PrimitiveSelection): CommandFunction;
    deleteFile(pos: number): CommandFunction;
    renameFile(pos: number, fileName: string): CommandFunction;
    backspaceShortcut(props: KeyBindingProps): boolean;
    private uploadFile;
}
export { FileExtension }
export { FileExtension as FileExtension_alias_1 }

export declare const FileIcon: React_2.FC;

declare interface FileOptions {
    /**
     * A function returns a `FileUploader` which will handle the upload process.
     */
    uploadFileHandler?: UploadFileHandler<FileAttributes>;
    render?: (props: FileComponentProps) => React.ReactElement<HTMLElement> | null;
    /**
     * A regex test for the file type when users paste files.
     *
     * @defaultValue /^((?!image).)*$/i - Only match non-image files, as image files
     * will be handled by the `ImageExtension`.
     */
    pasteRuleRegexp?: RegExp;
    /**
     * Called after the `commands.deleteFile` has been called.
     */
    onDeleteFile?: Handler<(props: {
        tr: Transaction;
        pos: number;
        node: ProsemirrorNode;
    }) => void>;
}
export { FileOptions }
export { FileOptions as FileOptions_alias_1 }

declare function getDefaultFileAttrs(file: File): FileAttributes;
export { getDefaultFileAttrs }
export { getDefaultFileAttrs as getDefaultFileAttrs_alias_1 }
export { getDefaultFileAttrs as getDefaultFileAttrs_alias_2 }

export declare const StopIcon: React_2.FC;

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      file: FileExtension;
    }
  }
}
