export declare class Debounce {
    private readonly callback;
    private readonly args;
    private readonly wait;
    private timeOutID?;
    constructor(callback: (...args: any[]) => void, wait: number, ...args: any[]);
    debounce(...args: any[]): void;
}
