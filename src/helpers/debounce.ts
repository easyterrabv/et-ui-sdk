export class Debounce {
    private readonly callback: (...args: unknown[]) => void;
    private readonly args: unknown[];
    private readonly wait: number;
    private timeOutID?: number;

    constructor(callback: (...args: unknown[]) => void, wait: number, ...args: unknown[]) {
        this.callback = callback;
        this.wait = wait;
        this.args = args;
    }

    debounce(...args: unknown[]) {
        if (this.timeOutID) {
            window.clearTimeout(this.timeOutID);
        }

        this.timeOutID = window.setTimeout(() => {
            this.callback.apply(null, [...this.args, ...args]);
        }, this.wait);
    }
}
