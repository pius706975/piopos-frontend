'use client';
import Button from '@/components/button/Button';
import InputField from '@/components/forms/InputField';
import PasswordInput from '@/components/forms/PasswordInputField';
import React, { useState } from 'react';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Sign Up
                </h2>

                <InputField
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    label="Full Name"
                    placeholder="John Doe"
                    required
                />

                <InputField
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    label="Email Address"
                    placeholder="johndoe@example.com"
                    required
                />

                <PasswordInput
                    value={formData.password}
                    onChange={handleChange}
                    showPassword={showPassword}
                    placeholder="Type your password"
                    toggleShowPassword={() => setShowPassword(!showPassword)}
                />

                <Button
                    text="Sign Up"
                    type="submit"
                    color="bg-cyan-600"
                />
            </form>
        </div>
    );
};

export default SignUp;
