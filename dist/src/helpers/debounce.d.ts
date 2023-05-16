export declare class Debounce {
    private readonly callback;
    private readonly args;
    private readonly wait;
    private timeOutID?;
    constructor(callback: (...args: unknown[]) => void, wait: number, ...args: unknown[]);
    debounce(...args: unknown[]): void;
}
