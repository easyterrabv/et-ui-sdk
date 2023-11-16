import { reactive } from "vue";
import type { RouteLocationNormalizedLoaded, Router } from "vue-router";

export type urlDataObject = { [key: string]: unknown };

export interface IUseUrlData<T extends object = urlDataObject> {
    currentJsonString: string;
    setDataToUrl: (data: urlDataObject) => Promise<void>;
    getDataFromUrl: () => T | null;
}

export function useUrlData<T extends object = urlDataObject>(
    key: string,
    route: RouteLocationNormalizedLoaded,
    router: Router
) {
    return reactive<IUseUrlData<T>>({
        currentJsonString: "",
        async setDataToUrl(data: urlDataObject) {
            const jsonString = JSON.stringify(data);
            const base64 = btoa(jsonString);

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

            await router.push({ query: newQuery });
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
