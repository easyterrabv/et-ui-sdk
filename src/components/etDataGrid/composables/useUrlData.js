import { reactive } from "vue";
const makeUrlString = (data) => {
    const jsonString = JSON.stringify(data);
    if (!jsonString || jsonString === "{}") {
        return "";
    }
    return btoa(jsonString);
};
export function useUrlData(key, route, router) {
    return reactive({
        currentBase64String: (route.query[key] || ''),
        makeUrlString,
        async setDataToUrl(data) {
            const base64 = makeUrlString(data);
            const usePush = !!this.currentBase64String;
            if (base64 === this.currentBase64String) {
                return;
            }
            const newQuery = { ...route.query };
            if (!base64 || base64 === "{}") {
                this.currentBase64String = "";
                delete newQuery[key];
            }
            else {
                this.currentBase64String = base64;
                newQuery[key] = base64;
            }
            if (usePush) {
                await router.push({ query: newQuery });
            }
            else {
                await router.replace({ query: newQuery });
            }
        },
        getDataFromUrl() {
            const base64 = route.query[key];
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
