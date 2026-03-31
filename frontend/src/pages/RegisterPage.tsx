import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'sonner'

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const { register } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await register(name, email, password)
            toast.success('Account created successfully!')
            navigate('/dashboard')
        } catch (err) {
            toast.error(err.response?.data?.error || 'Registration failed.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-surface">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm shadow-primary/5 h-16 flex justify-between items-center px-6 lg:px-8">
                <div className="text-xl font-extrabold text-primary font-headline tracking-tight">
                    The Editorial Estate
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-on-surface-variant text-sm hidden sm:block">Already have an account?</span>
                    <Link
                        to="/login"
                        className="text-primary font-headline font-bold text-sm hover:underline underline-offset-4 transition-all"
                    >
                        Login
                    </Link>
                </div>
            </header>

            {/* Main */}
            <main className="flex-grow flex items-center justify-center pt-20 pb-12 px-6 relative overflow-hidden">
                {/* Background blurs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
                </div>

                {/* Registration Card */}
                <div className="relative w-full max-w-lg">
                    <div className="bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-2xl shadow-on-surface/5 border border-outline-variant/15">
                        <div className="mb-8 text-center md:text-left">
                            <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight leading-tight mb-3">
                                Find New Homes.
                            </h1>
                            <p className="text-on-surface-variant leading-relaxed">
                                Join our exclusive portal to discover property listings and architectural features.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name */}
                            <div className="space-y-1.5">
                                <label htmlFor="full_name" className="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <input
                                        id="full_name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="E.g. Julian Montgomery"
                                        required
                                        className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-surface-tint/20 focus:bg-surface-container-lowest transition-all placeholder:text-on-surface-variant/40 text-on-surface text-sm"
                                    />
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-lg">person</span>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5">
                                <label htmlFor="email" className="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@editorial.com"
                                        required
                                        className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-surface-tint/20 focus:bg-surface-container-lowest transition-all placeholder:text-on-surface-variant/40 text-on-surface text-sm"
                                    />
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-lg">mail</span>
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label htmlFor="password" className="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                        className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-surface-tint/20 focus:bg-surface-container-lowest transition-all placeholder:text-on-surface-variant/40 text-on-surface text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-on-surface-variant cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-lg">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
        
                            </div>

                            {/* Submit */}
                            <div className="pt-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full hero-gradient text-on-primary font-headline font-bold py-3.5 rounded-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Create Account
                                            <span className="material-symbols-outlined text-xl">arrow_forward</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                       
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-surface-container-low w-full py-8 px-6 border-t border-surface-variant/50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="font-headline text-primary font-bold text-xs uppercase tracking-tighter">
                        The Editorial Estate
                    </div>
                    <div className="text-on-surface-variant/60 text-xs">
                        © 2024 The Editorial Estate. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}
