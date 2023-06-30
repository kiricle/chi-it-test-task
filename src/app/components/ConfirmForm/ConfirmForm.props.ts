import { FormEvent } from "react";

export default interface ConfirmFormProps {
    message: string;
    onConfirm: (e: FormEvent) => void;
    onCancel: () => void;
}

