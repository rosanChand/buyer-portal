import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'sonner'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await login(email, password)
            toast.success('Welcome back!')
            navigate('/dashboard')
        } catch (err) {
            toast.error(err.response?.data?.error || 'Login failed.')
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
                    <span className="text-on-surface-variant text-sm hidden sm:block">New to the portal?</span>
                    <Link
                        to="/register"
                        className="px-5 py-2 rounded-lg border border-outline-variant/30 text-primary font-headline font-bold text-sm hover:bg-surface-container-low transition-all"
                    >
                        Register
                    </Link>
                </div>
            </header>

            {/* Main */}
            <main className="min-h-screen flex items-center justify-center pt-16 px-4 relative overflow-hidden">
                {/* Background */}
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />

                <div className="w-full max-w-[1100px] grid md:grid-cols-2 gap-12 items-center relative z-10">
                   
                    <div className="hidden md:block">
                        <div className="relative group">
                           
                            <div className="overflow-hidden rounded-xl shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
                                    alt="Luxury Property"
                                    className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="absolute bottom-8 left-8 right-8 glass-panel p-5 rounded-lg shadow-xl">
                                <p className="font-headline font-bold text-lg text-primary mb-1">Architectural Integrity</p>
                                <p className="text-on-surface-variant text-sm leading-relaxed">
                                    Experience a curated journey through exceptional residences. Your vision, expertly filtered.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Login Form */}
                    <div className="flex justify-center md:justify-start">
                        <div className="w-full max-w-md">
                            <div className="mb-8">
                                <h1 className="font-headline font-extrabold text-3xl md:text-4xl text-primary tracking-tight mb-2">
                                    Welcome Home
                                </h1>
                                <p className="text-on-surface-variant text-base">The Digital Curator awaits your return.</p>
                            </div>

                            <div className="bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-sm">
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block font-label font-semibold text-on-surface-variant text-sm mb-1.5">
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@example.com"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-surface-container-high border-0 focus:ring-2 focus:ring-surface-tint/20 focus:bg-surface-container-lowest transition-all text-on-surface text-sm"
                                        />
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label htmlFor="password" className="block font-label font-semibold text-on-surface-variant text-sm mb-1.5">
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
                                                className="w-full px-4 py-3 rounded-lg bg-surface-container-high border-0 focus:ring-2 focus:ring-surface-tint/20 focus:bg-surface-container-lowest transition-all text-on-surface text-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary cursor-pointer"
                                            >
                                                <span className="material-symbols-outlined text-xl">
                                                    {showPassword ? 'visibility_off' : 'visibility'}
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full hero-gradient text-on-primary font-headline font-bold py-3.5 rounded-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                                        ) : (
                                            'Sign In to Portal'
                                        )}
                                    </button>
                                </form>
                            </div>

                
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
