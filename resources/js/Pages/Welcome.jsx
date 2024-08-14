import React, { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { InputText } from "primereact/inputtext";
import { Skeleton } from "primereact/skeleton";

export default function Login({ status, canResetPassword, auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000); // Simulate a loading delay

        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <div className="flex align-items-center justify-content-center flex-column">
                {loading ? (
                    <Skeleton shape="circle" size="150px" className="mb-3" />
                ) : (
                    <img
                        src="/images/srs/Logo-SSS.png"
                        alt="hyper"
                        height={150}
                        className="mb-3"
                    />
                )}

                <div className="surface-card p-6 sm:p-4 shadow-2 border-round w-full lg:w-4">
                    <div className="text-center mb-5">
                        <div className="text-900 text-3xl font-medium mb-3">
                            {loading ? (
                                <Skeleton width="14rem" height="2rem" />
                            ) : (
                                "Selamat datang kembali"
                            )}
                        </div>
                        <div className="text-gray-500">
                            {loading ? (
                                <Skeleton width="10rem" height="1.5rem" />
                            ) : (
                                "Di portal web Rapid Response"
                            )}
                        </div>
                    </div>

                    <form onSubmit={submit}>
                        {loading ? (
                            <>
                                <Skeleton width="10rem" className="mb-3" />
                                <Skeleton height="2.5rem" className="mb-3" />
                                <Skeleton width="10rem" className="mb-3" />
                                <Skeleton height="2.5rem" className="mb-3" />
                                <Skeleton width="10rem" height="3rem" />
                            </>
                        ) : (
                            <>
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="block text-900 font-medium mb-2"
                                    >
                                        Email
                                    </label>
                                    <InputText
                                        id="email"
                                        type="text"
                                        placeholder="Email address"
                                        className="w-full"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.email}
                                        className=""
                                    />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="block text-900 font-medium mb-2"
                                    >
                                        Password
                                    </label>
                                    <InputText
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        className="w-full"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.password}
                                        className=""
                                    />
                                </div>

                                <PrimaryButton
                                    label="Sign In"
                                    className="w-full"
                                    disabled={processing}
                                />
                            </>
                        )}
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
