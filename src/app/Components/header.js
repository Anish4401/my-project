"use client";

import { useEffect, useState } from "react";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
  
} from "@kinde-oss/kinde-auth-nextjs/components";
import { GlobeAltIcon, MenuIcon, SearchIcon } from "@heroicons/react/solid";
import { Link } from "next/link";
function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/session");
        const data = await response.json();
        console.log("Fetched user data:", data.user);
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    }
    fetchUser();
  }, []);

  // const handleLogout = async () => {
  //     await fetch('/api/logout', { method: 'POST' });
  //     setUser(null); // Clear user state after logout
  // };
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });

      if (response.ok) {
        console.log("Logged out successfully");
        setUser(null); // Clear user state
        console.log("user details", user);
      } else {
        console.error("Logout failed:", await response.json());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  useEffect(() => {
    console.log("user state is cleared");
  }, [user]);

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/* Left - Logo */}
      <div className="relative flex items-center h-12 cursor-pointer my-auto justify-self-start">
        <img
          className="w-12 h-12 md:w-20 md:h-20 object-cover rounded-full"
          src="https://avatars.githubusercontent.com/u/698437?s=280&v=4"
          alt="Company Logo"
        />
      </div>

      {/* Middle - Search Bar */}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          className="flex-grow pl-5 bg-transparent outline-none text-sm placeholder-gray-400 text-gray-600"
          type="text"
          placeholder="Start Searching"
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-3" />
      </div>

      {/* Right - Navigation and Auth Links */}
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer">Become A Host
        
        </p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6" />
          {user ? (
            <>
          
            
              <span className="hidden md:inline-flex w-full text-sm md:text-lg lg:text-xl">
                Welcome, {user.name || user.email}!
              </span>

              <button className="text-red-500" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <LoginLink className="w-full">Login</LoginLink>
              <RegisterLink className="w-full">Register</RegisterLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
