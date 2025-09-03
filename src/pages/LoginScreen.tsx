import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingInput from "@/components/ui/floating-input";
import SocialLoginButton from "@/components/ui/social-login-button";
import { useToast } from "@/hooks/use-toast";

const LoginScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      // toast({
      //   title: "Required Fields",
      //   description: "Please fill in all required fields",
      //   variant: "destructive",
      // });
      return;
    }

    // toast({
    //   title: "Welcome!",
    //   description: "Login successful",
    // });

    navigate("/app");
  };

  const handleSocialLogin = (provider: string) => {
    // toast({
    //   title: `${provider} Login`,
    //   description: "Redirecting to social login...",
    // });
    // Simulate social login
    setTimeout(() => navigate("/app"), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-800 relative overflow-hidden flex flex-col justify-center px-8 py-12">
      {/* Main Content */}
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Main Content */}
        <div className="relative z-10 text-center px-8">
          <motion.div
            className="mb-8"
          >
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-floating">
                <RefreshCw className="w-12 h-12 text-primary" />
              </div>

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Relax Refresh
            </h1>
            <h2 className="text-2xl font-semibold text-white/90">
              Partner
            </h2>

          </motion.div>


        </div>
        {/* Form Inputs */}
        <div className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-transparent border-2 border-white/30 rounded-full text-white placeholder-white/70 focus:border-white/70 focus:outline-none transition-colors"
              placeholder="Username or Email"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-transparent border-2 border-white/30 rounded-full text-white placeholder-white/70 focus:border-white/70 focus:outline-none transition-colors"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-white text-purple-700 hover:bg-gray-100 font-bold py-4 rounded-full text-lg transition-colors"
        >
          LOGIN
        </Button>

        {/* Forgot Password */}
        <div className="text-center">
          <button className="text-white/80 hover:text-white text-sm transition-colors">
            Forgot Password?
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <span className="text-white/80 text-sm">Don't have an account? </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white font-semibold text-sm underline"
          >
            Sign Up
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/30" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-purple-700 px-4 text-white/80">OR</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="text-center space-y-4">
          <p className="text-white/80 text-sm">Sign up with Social Networks</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleSocialLogin("Facebook")}
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button
              onClick={() => handleSocialLogin("Google")}
              className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
            <button
              onClick={() => handleSocialLogin("Apple")}
              className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{marginRight: '4px'}}>
                <path d="M16.365 1.43c0 1.14-.423 2.03-1.27 2.68-.847.64-1.792.97-2.836.97-.067-1.09.348-1.986 1.248-2.693.9-.707 1.876-1.067 2.926-1.07.02.04.027.07.027.113zm4.41 17.62c-.31.7-.675 1.34-1.1 1.92-.586.84-1.064 1.423-1.44 1.75-.57.52-1.18.787-1.822.8-.465 0-1.026-.132-1.684-.394-.66-.26-1.267-.39-1.822-.39-.575 0-1.2.13-1.876.39-.675.262-1.216.398-1.62.41-.62.027-1.244-.253-1.87-.84-.4-.36-.895-.973-1.482-1.84-.635-.923-1.157-1.994-1.566-3.215-.435-1.3-.652-2.55-.652-3.747 0-1.387.3-2.586.9-3.6a5.7 5.7 0 012.093-2.157c.88-.523 1.82-.793 2.82-.807.555 0 1.284.15 2.182.45.897.3 1.474.45 1.727.45.192 0 .84-.202 1.95-.607 1.046-.375 1.93-.53 2.655-.468 1.962.157 3.437.93 4.42 2.317-1.75 1.057-2.62 2.557-2.61 4.5.01 1.5.565 2.75 1.667 3.75-.2.58-.408 1.077-.618 1.49z" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;