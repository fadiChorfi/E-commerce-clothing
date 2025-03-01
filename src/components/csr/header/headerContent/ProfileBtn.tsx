"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, Settings, User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Providers/SupabaseProvider";

const ProfileBtn = () => {
  const { session, signOut , user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      router.push("/auth");
    } catch (err) {
      console.error("Error signing out:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          disabled={isLoading}
        >
          <User2Icon className="w-5 h-5" />
          {session && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        {session ? (
          <div className="flex flex-col">
            {/* User Profile Section */}
            <div className="px-6 py-4 border-b">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <User2Icon className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <h2 className="font-medium">
                    {user?.user_metadata.full_name || session.user.email}
                  </h2>
                  <p className="text-sm text-gray-500">Welcome back!</p>
                </div>
              </div>
            </div>

            {/* Actions Section */}
            <div className="p-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                asChild
              >
                <Link href="/profile">
                  <Settings className="w-4 h-4" />
                  Edit Profile
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleSignOut}
                disabled={isLoading}
              >
                <LogOut className="w-4 h-4" />
                {isLoading ? "Signing out..." : "Sign Out"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User2Icon className="w-6 h-6 text-gray-500" />
            </div>
            <h2 className="text-sm text-gray-600 mb-4">
              Sign in to access your account
            </h2>
            <Button variant="default" className="w-full" asChild>
              <Link href="/auth">Sign In</Link>
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ProfileBtn;