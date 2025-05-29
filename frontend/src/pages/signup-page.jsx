import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/authImagePattern";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });

    const { signup, isSigningUp } = useAuthStore();

    const validateMyForm = () => {
        if (!formData.fullName.trim()) {
            return toast.error("Full name is required");
        }
        if (!formData.email.trim()) {
            return toast.error("Email is required");
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const successs = validateMyForm();
        if (successs === true) {
            signup(formData);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-base-100">
            {/* Left side - Form */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-base-100 relative overflow-hidden">
                <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-primary/10 blur-xl"></div>
                <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-secondary/10 blur-xl"></div>

                <div className="w-full max-w-md space-y-8 relative z-10">
                    <div className="text-center mb-10">
                        <div className="flex flex-col items-center gap-3 group">
                            <div className="size-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                                <MessageSquare className="size-7 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold mt-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Create Account
                            </h1>
                            <p className="text-base-content/70 text-lg">Get started with your free account</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 bg-base-100 p-8 rounded-2xl shadow-xl border border-base-200">
                        {/* Full Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-base-content/80">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-primary" />
                                </div>
                                <input
                                    type="text"
                                    className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Priyansh Narang"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-base-content/80">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-primary" />
                                </div>
                                <input
                                    type="email"
                                    className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="priyansh@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-base-content/80">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-primary" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-primary transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5" />
                                    ) : (
                                        <Eye className="size-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-8 h-12 text-lg font-medium shadow-lg hover:shadow-primary/30 transition-all"
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    <span className="ml-2">Creating Account...</span>
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    {/* Sign in link */}
                    <div className="text-center">
                        <p className="text-base-content/70">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="link link-primary font-medium hover:underline underline-offset-4"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <AuthImagePattern
                title="Join our community"
                subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
            />
        </div>
    );
};

export default SignUpPage;