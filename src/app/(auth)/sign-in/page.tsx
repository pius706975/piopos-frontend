'use client';
import Button from '@/components/button/Button';
import InputField from '@/components/forms/InputField';
import PasswordInput from '@/components/forms/PasswordInputField';
import { useErrorToast } from '@/components/ui/ErrorMessage';
import LinkText from '@/components/ui/LinkText';
import { signIn } from '@/services/api';
import React, { useState } from 'react';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const { showError, ErrorToastComponent } = useErrorToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email) {
            showError(`Email isn't filled out`);
            return;
        }
    
        if (!formData.password) {
            showError(`Password isn't filled out`);
            return;
        }

        try {
            const data = await signIn(formData.email, formData.password);
            console.log('Successfully signed in', data);

            // window.location.href = '/';
        } catch (error: any) {
            if (
                error.response.data.status === 401 ||
                error.response.data.message === 'Email or password is incorrect'
            ) {
                showError('Email or password is incorrect');
            }
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-[#007395]"
            style={{
                backgroundImage: "url('/assets/authbg.png')",
            }}>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-6 rounded-xl shadow-xl">
                <h2 className="text-2xl font-semibold text-center mb-6 text-white">
                    Sign In
                </h2>

                {ErrorToastComponent}

                <InputField
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />

                <PasswordInput
                    value={formData.password}
                    onChange={handleChange}
                    showPassword={showPassword}
                    placeholder="Enter your password"
                    toggleShowPassword={() => setShowPassword(!showPassword)}
                    toggleShowPasswordColor="text-white"
                />

                <Button text="Sign In" type="submit" bgColor="bg-cyan-600" />

                <p className="text-center mt-4">
                    <LinkText href="./forgot-password" target="_self">
                        Forgot password?
                    </LinkText>
                </p>

                <p
                    className="text-white text-center mt-10 rounded-xl shadow-md bg-[#006892] p-3 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/assets/authbg.png')",
                    }}>
                    Don't have an account?{' '}
                    <LinkText href="/sign-up" target="_self">
                        Sign Up
                    </LinkText>
                </p>
            </form>
        </div>
    );
};

export default SignIn;
