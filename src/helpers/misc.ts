import { inject } from "vue";
import type { IEtModalProvide } from "../components/etProvider/EtModalProviderInterfaces";

export const needleFixer = (
    val: bigint | number | boolean | string | Date | null
): string => {
    let innerVal = val;

    if (typeof val === "bigint" || typeof val === "number") {
        innerVal = (val || 0).toString();
    } else if (typeof val === "boolean") {
        innerVal = innerVal ? "true" : "false";
    } else if (typeof val === "string") {
        innerVal = val;
    } else if (val instanceof Date) {
        const year = val.getFullYear();
        const month = val.getMonth();
        const date = val.getDate();
        innerVal = `${year}-${month + 1}-${date}`;
    } else {
        innerVal = "";
    }

    return (innerVal || "").toLowerCase().trim();
};

export const addLeadingZero = (input: string | number): string => {
    let inputAsNumber;
    if (typeof input === "string") {
        inputAsNumber = parseInt(input, 10);
    } else {
        inputAsNumber = input;
    }

    // Parse the input as an integer
    if (!isNaN(inputAsNumber) && inputAsNumber < 10) {
        return "0" + inputAsNumber; // Add a leading zero if the number meets the condition
    }

    if (isNaN(inputAsNumber)) {
        return "00";
    }

    return String(inputAsNumber); // Otherwise, return the input as a string
};

export const makeSlug = (text: string) => {
    if (!text) {
        return text;
    }

    return (
        (text || "")
            .toString()
            .trim()
            // Use the Unicode normalization method to ensure consistent treatment of accented characters
            .normalize("NFKD")
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "")
    );
};

export const makeCode = (text: string) => {
    if (!text) {
        return text;
    }

    const slug = makeSlug(text);
    return slug.replace(/-/g, "_").toUpperCase();
};

export function formatCurrency(
    amount: number,
    currencyCode: string | undefined | null
) {
    return new Intl.NumberFormat([...navigator.languages, "en-US"], {
        style: "currency",
        currency: currencyCode || "EUR"
    }).format(amount);
}

export async function pleaseWait<T>(
    callback: (
        modalGuid: string | null | undefined
    ) => Promise<T> | (() => Promise<T>)
) {
    const modalProvide = inject<IEtModalProvide>("SDKModalProvide");
    const guid = modalProvide?.openModal("SDKPleaseWait");
    const result = await callback(guid);

    if (guid) {
        modalProvide?.closeModal(guid);
    }

    return result;
}
