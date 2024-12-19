'use client';
import Button from '@/components/button/Button';
import InputField from '@/components/forms/InputField';
import PasswordInput from '@/components/forms/PasswordInputField';
import LinkText from '@/components/ui/LinkText';
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
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-[#007395]"
            style={{
                backgroundImage: "url('/assets/authbg.png')",
            }}>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-6 rounded-xl shadow-xl ">
                <h2 className="text-2xl font-semibold text-center mb-6 text-white">
                    Sign In
                </h2>

                <InputField
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />

                <PasswordInput
                    value={formData.password}
                    onChange={handleChange}
                    showPassword={showPassword}
                    placeholder="Enter your password"
                    toggleShowPassword={() => setShowPassword(!showPassword)}
                    toggleShowPasswordColor="text-white"
                />

                <Button text="Sign Up" type="submit" color="bg-cyan-600" />

                <p className="text-center mt-4">
                    <LinkText href="#" target="_self">
                        Forgot password?
                    </LinkText>
                </p>

                <p className="text-white text-center mt-10">
                    Don't have an account?{' '}
                    <LinkText href="/sign-up" target="_self">
                        Sign Up
                    </LinkText>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
