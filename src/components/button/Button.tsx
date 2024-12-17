import React from 'react';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    color?: string;
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    color = 'bg-purple-400',
    type = 'button',
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`w-full py-2 px-4 ${color} font-bold text-white rounded-md hover:${color.replace(
                '400',
                '500',
            )} focus:outline-none focus:ring-2 focus:ring-gray-500`}>
            {text}
        </button>
    );
};

export default Button;
