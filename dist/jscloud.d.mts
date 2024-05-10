declare class jSCloud {
    $element: any;
    options: any;
    word_array: any;
    data: any;
    sizeGenerator: any;
    colorGenerator: any;
    constructor(element: any, word_array: any, options?: {});
    initialize(): void;
    createTimeout(callback: any, time: any): void;
    clearTimeouts(): void;
    overlapping(a: any, b: any): boolean;
    hitTest(elem: any): boolean;
    drawWordCloud(): void;
    drawOneWord(index: any, word: any): void;
    drawOneWordDelayed(index?: number): void;
    destroy(): void;
    update(word_array: any): void;
    resize(): void;
}
declare function jscloud(element: any, word_array: any, options?: {}): jSCloud;

export { jscloud as default };
