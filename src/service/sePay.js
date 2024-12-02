export const SePay = async () => {
    const response = await fetch(import.meta.env.VITE_SEPAY_API);
    const data = await response.json();
    return data;
}