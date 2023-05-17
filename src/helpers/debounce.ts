export class Debounce {
    private readonly callback: ((...args: any[]) => void) | undefined;
    private readonly args: any[];
    private readonly wait: number;
    private timeOutID?: number;

    constructor(
        callback: ((...args: any[]) => void) | undefined,
        wait: number,
        ...args: any[]
    ) {
        this.callback = callback;
        this.wait = wait;
        this.args = args;
    }

    debounce(...args: any[]) {
        if (this.timeOutID) {
            window.clearTimeout(this.timeOutID);
        }

        this.timeOutID = window.setTimeout(() => {
            this.callback?.apply(null, [...this.args, ...args]);
        }, this.wait);
    }
}
