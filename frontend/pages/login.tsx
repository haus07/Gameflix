'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      console.log('Login data:', formData);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-black">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-black">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex justify-center mb-2">
              <div className="relative w-40 h-16">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-black/70 backdrop-blur-xl border border-gray-800 rounded-lg p-8 shadow-2xl animate-slide-up">
            <h2 className="text-3xl font-bold text-white mb-2">Đăng nhập</h2>
            <p className="text-gray-400 text-sm mb-8">
              Chào mừng trở lại! Sẵn sàng cho trải nghiệm giải trí tuyệt vời.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg backdrop-blur-sm animate-shake">
                <p className="text-green-400 text-sm text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username field */}
              <div className="relative group">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-4 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-transparent focus:outline-none focus:border-green-500 focus:bg-gray-900/70 transition-all duration-300 peer"
                  placeholder="Tên đăng nhập"
                  required
                />
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    formData.username || focusedField === 'username'
                      ? '-top-2.5 text-xs text-green-500 bg-black px-1'
                      : 'top-4 text-gray-400'
                  }`}
                >
                  Tên đăng nhập
                </label>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-green-400 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
              </div>

              {/* Password field */}
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-4 pr-12 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-transparent focus:outline-none focus:border-green-500 focus:bg-gray-900/70 transition-all duration-300 peer"
                  placeholder="Mật khẩu"
                  required
                />
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    formData.password || focusedField === 'password'
                      ? '-top-2.5 text-xs text-green-500 bg-black px-1'
                      : 'top-4 text-gray-400'
                  }`}
                >
                  Mật khẩu
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-green-500 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-green-400 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Đang xử lý...</span>
                  </div>
                ) : (
                  <>
                    <span>Đăng nhập</span>
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 h-px bg-gray-800"></div>
              <span className="px-4 text-gray-500 text-sm">hoặc</span>
              <div className="flex-1 h-px bg-gray-800"></div>
            </div>

            {/* OAuth buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 bg-gray-900/50 hover:bg-gray-800/70 border border-gray-700 text-white py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 group hover:border-gray-600"
              >
                <FcGoogle size={24} />
                <span className="text-sm font-medium">Google</span>
              </button>
              <button
                type="button"
                className="flex-1 bg-gray-900/50 hover:bg-gray-800/70 border border-gray-700 text-white py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 group hover:border-gray-600"
              >
                <FaGithub size={24} />
                <span className="text-sm font-medium">GitHub</span>
              </button>
            </div>

            {/* Sign up link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Bạn chưa có tài khoản?{' '}
                <button
                  type="button"
                  className="text-green-500 font-semibold hover:text-green-400 transition-colors hover:underline"
                >
                  Đăng ký ngay
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
         
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        .animate-shake { animation: shake 0.4s ease-out; }
      `}</style>
    </div>
  );
};

export default LoginForm;
