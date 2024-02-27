import { reactive } from "vue";
const makeUrlString = (data) => {
    const jsonString = JSON.stringify(data);
    return btoa(jsonString);
};
export function useUrlData(key, route, router) {
    return reactive({
        currentJsonString: "",
        makeUrlString,
        async setDataToUrl(data) {
            const base64 = makeUrlString(data);
            const usePush = !!this.currentJsonString;
            if (base64 === this.currentJsonString) {
                return;
            }
            const newQuery = { ...route.query };
            if (!base64 || base64 === "{}") {
                this.currentJsonString = "";
                delete newQuery[key];
            }
            else {
                this.currentJsonString = base64;
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
