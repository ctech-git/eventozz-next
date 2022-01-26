import { toast } from "react-toastify";

export const copyToClipboard = (string) => {
    try {
        navigator.clipboard.writeText(string);
        return toast.success("O link foi copiado")
    } catch (error) {
        return toast.error("Não foi possível copiar o link");
    }
}