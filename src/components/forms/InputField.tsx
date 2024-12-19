import React from 'react';

interface InputFieldProps {
    type: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    type,
    id,
    name,
    value,
    onChange,
    label,
    placeholder,
    required = false,
}) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                placeholder={placeholder}
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
            />
        </div>
    );
};

export default InputField;
