import { Element, type ElementAttributes } from '@lume/element';
export declare class OutputViewErrorEvent extends ErrorEvent {
    error: unknown;
    constructor(error: unknown);
}
type OutputViewAttributes = 'value' | 'mode';
export declare class OutputView extends Element {
    #private;
    hasShadow: boolean;
    value: string;
    mode: 'script>iframe' | 'html>iframe';
    connectedCallback(): void;
    template: () => Node | Node[];
    css: string;
}
declare module 'solid-js' {
    namespace JSX {
        interface IntrinsicElements {
            'output-view': ElementAttributes<OutputView, OutputViewAttributes>;
        }
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'output-view': OutputView;
    }
}
export {};
//# sourceMappingURL=OutputView.d.ts.map