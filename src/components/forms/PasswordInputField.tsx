// components/PasswordInput.tsx
import React from 'react';

interface PasswordInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showPassword: boolean;
    placeholder?: string;
    toggleShowPassword: () => void;
    toggleShowPasswordColor?: string;
    label?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    value,
    onChange,
    showPassword,
    placeholder,
    toggleShowPassword,
    toggleShowPasswordColor,
    label
}) => {
    return (
        <div className="mb-6">
            <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                // required
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center mt-2">
                <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={toggleShowPassword}
                    className="mr-2"
                />
                <label htmlFor="showPassword" className={`text-sm ${toggleShowPasswordColor}`}>
                    Show Password
                </label>
            </div>
        </div>
    );
};

export default PasswordInput;
