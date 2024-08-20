import React, { useEffect, useState } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";
import InputError from "@/Components/InputError";
import { BackgroundBeams } from "@/Components/ui/background-beams";
import { Skeleton } from "primereact/skeleton";
import { Head, Link, useForm } from "@inertiajs/react";
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
        <div className="relative flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <BackgroundBeams className="z-0 opacity-100" />
            <div className="relative z-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-2 md:p-4 shadow-input bg-white dark:bg-black">
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

                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    {loading ? (
                        <Skeleton width="14rem" height="2rem" />
                    ) : (
                        <span>
                          Selamat datang kembali
                        </span>
                    )}
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    {loading ? (
                        <Skeleton width="14rem" height="2rem" />
                    ) : (
                        <span>
                            Silahkan masukan kredensial login dan email anda untuk memasuki
                            dashboard rapid respon
                        </span>
                    )}
                </p>


                <form className="my-4" onSubmit={submit}>
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
                            <LabelInputContainer className="mb-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="Email address"
                                    className="w-full"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                            </LabelInputContainer>
                            <InputError message={errors.email} className="" />
                            <LabelInputContainer className="mb-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    className="w-full"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                            </LabelInputContainer>
                            <InputError message={errors.password} className="" />
                            <button
                                className="bg-gradient-to-br relative group from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                type="submit"
                            >
                                Log in &rarr;
                                <BottomGradient />
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-1 w-full", className)}>
            {children}
        </div>
    );
};
