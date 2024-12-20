import React, { useState } from 'react';

interface ErrorToastProps {
    message: string;
    onClose: () => void;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ message, onClose }) => {
    return (
        <div className="flex items-center justify-between text-red-600 bg-red-100/80 shadow-white-lg text-md px-4 py-2 rounded shadow-lg border border-red-600">
            <p>{message}</p>
            <button
                onClick={onClose}
                className="text-red-600 hover:text-red-800 font-bold text-xl">
                &times;
            </button>
        </div>
    );
};

export const useErrorToast = () => {
    const [error, setError] = useState<string | null>(null);

    const showError = (message: string) => {
        setError(message);
        setTimeout(() => {
            setError(null);
        }, 4000);
    };

    const ErrorToastComponent = error ? (
        <ErrorToast message={error} onClose={() => setError(null)} />
    ) : null;

    return { showError, ErrorToastComponent };
};
