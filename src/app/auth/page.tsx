"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Github,
  User,
  AlertCircle,
  LockKeyhole,
  ArrowRight,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Providers/SupabaseProvider";
import Link from "next/link";
import supabase from "@/supabase/client";

const AuthTabs = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const { signUpNewUser, signIn, signInWithGitHub } = useAuth();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signUpNewUser(signUpName, signUpEmail, signUpPassword);

      if (res.success) {
        router.push("/");
      }
    } catch (err) {
      setError("an error occured");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn(loginEmail, loginPassword);

      if (res.success) {
        router.push("/");
      }
    } catch {
      setError("an error occured");
    } finally {
      setIsLoading(false);
    }
  };

  const SocialAuth = () => (
    <div className="space-y-4">
      <Button
        type="button"
        variant="outline"
        className="w-full py-6 relative"
        onClick={() =>
          supabase.auth.signInWithOAuth({
            provider: "google",
          })
        }
        disabled={isLoading}
      >
        <FcGoogle />
        <span className="mx-auto">Continue with Google</span>
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full py-6 relative"
        onClick={()=>signInWithGitHub()}
        disabled={isLoading}
      >
        <Github className="absolute left-4 w-5 h-5" />
        <span className="mx-auto">Continue with GitHub</span>
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome back
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Please sign in to your account
                </p>
              </div>

              <SocialAuth />

              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label
                    htmlFor="login-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="login-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockKeyhole className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="login-password"
                      name="password"
                      type={showLoginPassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      aria-label={
                        showLoginPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showLoginPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full py-6"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
              <Link
                href="/"
                className="w-full flex items-center justify-end  hover:cursor-pointer hover:text-blue-700"
              >
                <p className="text-sm">continue without loggin in</p>
                <ArrowRight />
              </Link>
            </div>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Create an account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Sign up to get started
                </p>
              </div>

              <SocialAuth />

              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label
                    htmlFor="sign-up-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="sign-up-name"
                      name="name"
                      type="text"
                      required
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="sign-up-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="sign-up-email"
                      name="email"
                      type="email"
                      required
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="sign-up-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockKeyhole className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="sign-up-password"
                      name="password"
                      type={showSignUpPassword ? "text" : "password"}
                      required
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                       {showSignUpPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )} 
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full py-6"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>

        {/* Error Message */}
        {error && (
          <div className="mt-4 rounded-md bg-red-50 p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="ml-3 text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthTabs;
