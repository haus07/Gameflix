'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff, ArrowRight, Mail, Phone, User } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

type SignupFormData = {
  username: string;
  password: string;
  email: string;
  phone: string;
};

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>({
    username: '',
    password: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginRedirect = () => {
    console.log('Navigate to login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Signup data:', formData);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-black">
      {/* Background Image */}
     <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-black">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
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
            <h2 className="text-3xl font-bold text-white mb-2">Đăng ký</h2>
            <p className="text-gray-400 text-sm mb-8">
              Tạo tài khoản để truy cập hàng ngàn nội dung giải trí hấp dẫn.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div className="relative group">
                <div className="absolute left-4 top-4 text-gray-400 pointer-events-none z-10">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField('')}
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-transparent focus:outline-none focus:border-red-600 focus:bg-gray-900/70 transition-all duration-300 peer"
                  placeholder="Tên đăng nhập"
                  required
                />
                <label
                  className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                    formData.username || focusedField === 'username'
                      ? '-top-2.5 left-4 text-xs text-red-600 bg-black px-1'
                      : 'top-4 text-gray-400'
                  }`}
                >
                  Tên đăng nhập
                </label>
              </div>

              {/* Email */}
              <div className="relative group">
                <div className="absolute left-4 top-4 text-gray-400 pointer-events-none z-10">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-transparent focus:outline-none focus:border-red-600 focus:bg-gray-900/70 transition-all duration-300 peer"
                  placeholder="Email"
                  required
                />
                <label
                  className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                    formData.email || focusedField === 'email'
                      ? '-top-2.5 left-4 text-xs text-red-600 bg-black px-1'
                      : 'top-4 text-gray-400'
                  }`}
                >
                  Email
                </label>
              </div>

              {/* Phone */}
              <div className="relative group">
                <div className="absolute left-4 top-4 text-gray-400 pointer-events-none z-10">
                  <Phone className="h-5 w-5" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField('')}
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-transparent focus:outline-none focus:border-red-600 focus:bg-gray-900/70 transition-all duration-300 peer"
                  placeholder="Số điện thoại"
                  required
                />
                <label
                  className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                    formData.phone || focusedField === 'phone'
                      ? '-top-2.5 left-4 text-xs text-red-600 bg-black px-1'
                      : 'top-4 text-gray-400'
                  }`}
                >
                  Số điện thoại
                </label>
              </div>

              {/* Password */}
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-4 pr-12 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-transparent focus:outline-none focus:border-red-600 focus:bg-gray-900/70 transition-all duration-300 peer"
                  placeholder="Mật khẩu"
                  required
                />
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    formData.password || focusedField === 'password'
                      ? '-top-2.5 text-xs text-red-600 bg-black px-1'
                      : 'top-4 text-gray-400'
                  }`}
                >
                  Mật khẩu
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-red-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Strength bar */}
              {formData.password && (
                <div className="space-y-2 animate-fade-in">
                  <div className="flex gap-1">
                    <div className={`h-1 flex-1 rounded-full ${formData.password.length >= 8 ? 'bg-red-600' : 'bg-gray-700'}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${formData.password.length >= 10 ? 'bg-red-600' : 'bg-gray-700'}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${formData.password.length >= 12 ? 'bg-red-600' : 'bg-gray-700'}`}></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Độ mạnh mật khẩu:{' '}
                    {formData.password.length >= 12
                      ? 'Mạnh'
                      : formData.password.length >= 10
                      ? 'Trung bình'
                      : 'Yếu'}
                  </p>
                </div>
              )}

              {/* Submit */}
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
                    <span>Tạo tài khoản</span>
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

            {/* Login link */}
             <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Bạn đã có tài khoản?{' '}
                <button
                  type="button"
                  className="text-green-500 font-semibold hover:text-green-400 transition-colors hover:underline"
                >
                  Đăng nhập 
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default SignUpForm;
