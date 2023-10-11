export class Debounce {
    callback;
    args;
    wait;
    timeOutID;
    constructor(callback, wait, ...args) {
        this.callback = callback;
        this.wait = wait;
        this.args = args;
    }
    debounce(...args) {
        if (this.timeOutID) {
            window.clearTimeout(this.timeOutID);
        }
        this.timeOutID = window.setTimeout(() => {
            this.callback?.apply(null, [...this.args, ...args]);
        }, this.wait);
    }
}
