import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Home';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Eye, EyeOff, Mail, Lock, Github, Chrome } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login
    console.log('Logging in with:', email, password);
    navigate('/');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center items-center">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Login to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wide ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </div>
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-12 py-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Password</label>
                <Link to="#" className="text-xs font-bold text-[#00aaff] hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </div>
                <Input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  className="pl-12 pr-12 py-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-[#00aaff] focus:ring-[#00aaff]" />
              <label htmlFor="remember" className="text-sm text-gray-600">Remember me for 30 days</label>
            </div>

            <Button variant="primary" className="w-full py-4 font-bold tracking-wider text-lg shadow-lg shadow-blue-100">
              LOG IN
            </Button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-400 font-medium">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700">
              <Chrome size={18} /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700">
              <Github size={18} /> GitHub
            </button>
          </div>

          <p className="text-center mt-10 text-gray-600">
            Don't have an account? <Link to="#" className="font-bold text-[#00aaff] hover:underline">Sign up for free</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
