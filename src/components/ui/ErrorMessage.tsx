import React, { useEffect, useState } from 'react';

interface ErrorMessageProps {
    message: string;
    timeout?: number;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
    message,
    timeout = 5000,
}) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, timeout);

        return () => clearTimeout(timer);
    }, [timeout]);

    if (!visible) return null;

    return <div className="text-red-500 text-sm mt-1">{message}</div>;
};

export default ErrorMessage;
