import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleGoogleLogin = () => {
        window.location.href = route('auth.redirect');
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>

            <div className="mt-6 flex justify-center">
                <button
                    onClick={handleGoogleLogin}
                    className="flex w-full items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <path
                            fill="#EA4335"
                            d="M24 9.5c3.04 0 5.79 1.07 7.93 2.83l5.93-5.93C34.67 3.34 29.63 1.5 24 1.5 14.98 1.5 7.18 7.13 4.18 14.78l6.9 5.36C12.54 14.58 17.8 9.5 24 9.5z"
                        />
                        <path
                            fill="#34A853"
                            d="M9.1 20.14C8.5 22.14 8.5 24 8.5 24s0 1.86.6 3.86l-6.9 5.36C2.12 27.88 1.5 26 1.5 24c0-2 .62-3.88 1.6-5.5l6.9 5.36z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M8.5 24s0 1.86.6 3.86l6.9 5.36C15.9 29.42 15.22 26.72 15.22 24c0-2.72.68-5.42 1.6-7.22l-6.9 5.36z"
                        />
                        <path
                            fill="#4285F4"
                            d="M44.5 24c0 2-.62 3.88-1.6 5.5l-6.9-5.36c.92-1.8 1.6-4.5 1.6-7.22s-.68-5.42-1.6-7.22l6.9 5.36c.98 1.62 1.6 3.5 1.6 5.5z"
                        />
                    </svg>
                    Login with Google
                </button>
            </div>
        </GuestLayout>
    );
}
