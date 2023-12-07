import { reactive } from "vue";
export function useUrlData(key, route, router) {
    return reactive({
        currentJsonString: "",
        async setDataToUrl(data) {
            const jsonString = JSON.stringify(data);
            const base64 = btoa(jsonString);
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
            await router.push({ query: newQuery });
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
