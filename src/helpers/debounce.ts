export class Debounce<T = any> {
    private readonly callback: ((...args: any[]) => T) | undefined;
    private readonly args: any[];
    private readonly wait: number;
    private timeOutID?: number;

    constructor(
        callback: ((...args: any[]) => T) | undefined,
        wait: number,
        ...args: any[]
    ) {
        this.callback = callback;
        this.wait = wait;
        this.args = args;
    }

    debounce(...args: any[]): Promise<T | undefined> {
        return new Promise((resolve) => {
            if (this.timeOutID) {
                window.clearTimeout(this.timeOutID);
            }

            this.timeOutID = window.setTimeout(async () => {
                const result = await this.callback?.apply(null, [
                    ...this.args,
                    ...args
                ]);
                resolve(result);
            }, this.wait);
        });
    }
}
