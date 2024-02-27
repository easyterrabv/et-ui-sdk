import { reactive } from "vue";
import type { RouteLocationNormalizedLoaded, Router } from "vue-router";

export type urlDataObject = { [key: string]: unknown };

export interface IUseUrlData<T extends object = urlDataObject> {
    currentJsonString: string;
    makeUrlString: (data: urlDataObject) => string;
    setDataToUrl: (data: urlDataObject) => Promise<void>;
    getDataFromUrl: () => T | null;
}

const makeUrlString = (data: urlDataObject) => {
    const jsonString = JSON.stringify(data);
    return btoa(jsonString);
};

export function useUrlData<T extends object = urlDataObject>(
    key: string,
    route: RouteLocationNormalizedLoaded,
    router: Router
) {
    return reactive<IUseUrlData<T>>({
        currentJsonString: "",
        makeUrlString,
        async setDataToUrl(data: urlDataObject) {
            const base64 = makeUrlString(data);

            const usePush = !!this.currentJsonString;

            if (base64 === this.currentJsonString) {
                return;
            }

            const newQuery = { ...route.query };

            if (!base64 || base64 === "{}") {
                this.currentJsonString = "";
                delete newQuery[key];
            } else {
                this.currentJsonString = base64;
                newQuery[key] = base64;
            }

            if (usePush) {
                await router.push({ query: newQuery });
            } else {
                await router.replace({ query: newQuery });
            }
        },
        getDataFromUrl(): T | null {
            const base64 = route.query[key] as string;
            if (!base64) {
                return null;
            }

            const jsonString = atob(base64);
            if (!jsonString) {
                return null;
            }

            return JSON.parse(jsonString);
        }
    });
}
