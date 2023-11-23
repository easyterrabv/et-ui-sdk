import { cancelable, type CancelablePromise } from "cancelable-promise";

export const wait = (ms: number): CancelablePromise<void> => {
    return cancelable(
        new Promise((resolve) => {
            setTimeout(resolve, ms);
        })
    );
};
