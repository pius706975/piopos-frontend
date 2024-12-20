import React from 'react';

interface ButtonProps {
    text: string;
    onClick?: (e: React.FormEvent) => void;
    bgColor?: string;
    color?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    bgColor = 'bg-purple-400',
    color = 'text-white',
    type = 'button',
    disabled = false,
}) => {
    const handleClick = async (e: React.FormEvent) => {
        if (typeof onClick === 'function') {
            onClick(e);
        }
    };
    
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={handleClick}
            className={`w-full py-2 px-4 ${bgColor} font-bold ${color} rounded-md hover:${bgColor.replace(
                '400',
                '500',
            )} focus:outline-none focus:ring-2 focus:ring-gray-500`}>
            {text}
        </button>
    );
};

export default Button;
