import { Element, type ElementAttributes } from '@lume/element';
import { CodeMirrorContentchangedEvent } from 'code-mirror-el';
import type { EditorView } from 'codemirror';
export declare class LiveCodeContentchangedEvent extends CodeMirrorContentchangedEvent {
    constructor(view: EditorView);
}
type LiveCodeAttributes = 'content' | 'src' | 'stripIndent' | 'trim' | 'autorun' | 'mode' | 'debounce';
declare const LiveCode_base: (new (...a: any[]) => {
    "__#1@#effects": Set<import("classy-solid").Effect>;
    createEffect(fn: () => void): void;
    stopEffects(): void;
    "__#1@#createEffect1"(fn: () => void): void;
    "__#1@#stopEffects1"(): void;
    "__#1@#owner": import("solid-js").Owner | null;
    /**
     * Only useful when `autorun` is true. When `autorun` is true, then if this
     * is true, the preview will only autorun if it is visible on screen (f.e.
     * not scrolled outside of the view). If this is false, then the preview
     * will autorun regardless if it is visible or not. If there are a lot of
     * examples on the page, running them all even if they are not visible could
     * be costly, and you may want to run only the ones that are in view.
     *
     * When true, any live code previews that go off screen will be discarded,
     * and automatically re-ran when they come back into view.
     */
    "__#1@#dispose": (() => void) | null;
    "__#1@#createEffect2"(fn: () => void): void;
    "__#1@#stopEffects2"(): void;
}) & typeof Element;
export declare class LiveCode extends LiveCode_base {
    #private;
    /** The text to put in the editor. */
    content: string;
    /**
     * A file from which to get code for the editor from. If given, takes
     * priority over the `code` value.
     */
    src: string;
    /**
     * When true (default) common indentation will be removed. Useful for
     * example if the `content` property is being set with a template string and
     * the content is indented to make the outer code more readable but the
     * indentation is undersired in the result. Set the attribute
     * `strip-indent="false"` to disable.
     */
    stripIndent: boolean;
    /**
     * When true (default) leading and trailing whitespace will be trimmed. Set
     * the attribute `trim="false"` to disable.
     */
    trim: boolean;
    /**
     * By default the live preview will update automatically (debounced) when
     * code in the editor is modified. Set to false to prevent automatic
     * running, and run only when the rerun button is clicked.
     */
    autorun: boolean;
    /**
     * Only useful when `autorun` is true. When `autorun` is true, then if this
     * is true, the preview will only autorun if it is visible on screen (f.e.
     * not scrolled outside of the view). If this is false, then the preview
     * will autorun regardless if it is visible or not. If there are a lot of
     * examples on the page, running them all even if they are not visible could
     * be costly, and you may want to run only the ones that are in view.
     *
     * When true, any live code previews that go off screen will be discarded,
     * and automatically re-ran when they come back into view.
     */
    autorunInView: boolean;
    /**
     * Specify the editor mode:
     * - script
     * - script>iframe
     * - html>iframe
     */
    mode: 'script>iframe' | 'html>iframe';
    /**
     * If `autorun` is true, then autorun is debounced by this amount in
     * milliseconds after a user types into the code editor. Defaults to `1000`.
     */
    debounce: number;
    connectedCallback(): void;
    disconnectedCallback(): void;
    rerun: () => void;
    reset: () => void;
    copy: () => void;
    toggleFullscreen: () => void;
    get syntax(): "html" | "js";
    template: () => Node | Node[];
    css: string;
}
declare module 'solid-js' {
    namespace JSX {
        interface IntrinsicElements {
            'live-code': ElementAttributes<LiveCode, LiveCodeAttributes>;
        }
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'live-code': LiveCode;
    }
}
export {};
//# sourceMappingURL=LiveCode.d.ts.map