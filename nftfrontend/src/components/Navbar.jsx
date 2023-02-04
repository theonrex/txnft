import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  return (
    <div>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="/" className="flex items-center">
           
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Theon-X NFTS
            </span>
          </a>
          <div className="flex md:order-2">
            <ConnectButton />
            <div className="relative hidden md:block">
              {/* <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." /> */}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
