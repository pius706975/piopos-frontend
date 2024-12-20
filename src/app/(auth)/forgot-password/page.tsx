'use client';
import Button from '@/components/button/Button';
import InputField from '@/components/forms/InputField';
import { useErrorToast } from '@/components/ui/ErrorMessage';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ForgotPassword = () => {
    const API_URL = process.env.NEXT_PUBLIC_USER_SERVICE_BASE_URL;
    const [loading, setLoading] = useState<Boolean>(false);
    const [timer, setTimer] = useState<number | null>(null);

    const [formEmail, setFormEmail] = useState({
        email: '',
    });

    const [formOTP, setFormOTP] = useState({
        otp: '',
    });

    const { showError, ErrorToastComponent } = useErrorToast();

    useEffect(() => {
        const savedTimer = localStorage.getItem('timer');
        if (savedTimer) {
            setTimer(parseInt(savedTimer));
        }
    }, []);

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormEmail({
            ...formEmail,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitEmail = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();

        if (!formEmail.email) {
            showError(`Email isn't filled out`);
            return;
        }

        try {
            const response = await axios.put(`${API_URL}/send-otp`, {
                email: formEmail.email,
            });

            setLoading(false);

            console.log('OTP sent successfully', response.data);

            setTimer(60);
            localStorage.setItem('timer', '60');
        } catch (error: any) {
            if (
                error.response.data.message == 'User not found' ||
                error.response.data.status == 404
            ) {
                showError('Email not found');
            }
            setLoading(false);
        }
    };

    const handleChangeOTP = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormOTP({
            ...formOTP,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitOTP = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formOTP.otp) {
            showError(`OTP isn't filled out`);
            return;
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (timer !== null && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev && prev > 0) {
                        const newTimer = prev - 1;
                        // Store updated timer in localStorage
                        localStorage.setItem('timer', newTimer.toString());
                        return newTimer;
                    }
                    clearInterval(interval!);
                    localStorage.removeItem('timer'); // Remove timer when it reaches 0
                    return 0;
                });
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [timer]);

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-[#007395]"
            style={{ backgroundImage: 'url("/assets/authbg.png")' }}>
            <div>
                <h1 className="text-3xl font-bold text-white text-center">{`Don't worry, we got your back!`}</h1>

                <div className="w-full max-w-lg p-6 rounded-xl shadow-xl">
                    <p className="mt-4 mb-4 text-white text-center">
                        Enter your email to get an OTP code.
                    </p>

                    {ErrorToastComponent}

                    <InputField
                        type="email"
                        id="email"
                        name="email"
                        value={formEmail.email}
                        onChange={handleChangeEmail}
                        placeholder="Enter your email"
                    />

                    <Button
                        text={loading ? 'Sending OTP...' : timer !== null ? `Resend OTP in ${timer}s` : 'Send OTP'}
                        type="submit"
                        bgColor={timer !== null ? 'bg-gray-300' : `bg-cyan-600`}
                        color={timer !== null ? 'text-gray-400' : `text-white`}
                        onClick={handleSubmitEmail}
                        disabled={timer !== null ? true : false}
                    />

                    <p className="mt-4 mb-4 text-white text-center">
                        {`Just click send OTP button again if you didn't receive an email.`}
                    </p>

                    <p className="mt-10 text-white text-center">Verify now</p>

                    <InputField
                        type="text"
                        id="otp"
                        name="otp"
                        value={formOTP.otp}
                        onChange={handleChangeOTP}
                        placeholder="Enter your OTP"
                        textPosition="text-center"
                    />

                    <Button
                        text="Verify OTP"
                        type="submit"
                        bgColor="bg-cyan-600"
                        onClick={handleSubmitOTP}
                    />
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
