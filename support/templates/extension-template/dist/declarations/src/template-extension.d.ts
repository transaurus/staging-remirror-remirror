import { PlainExtension } from '@remirror/core';
export interface TemplateOptions {
}
/**
 * TEMPLATE_DESCRIPTION
 */
export declare class TemplateExtension extends PlainExtension<TemplateOptions> {
    get name(): "template";
}
declare global {
    namespace Remirror {
        interface AllExtensions {
            template: TemplateExtension;
        }
    }
}
