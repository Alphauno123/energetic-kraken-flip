"use client";

import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container px-4 md:px-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; {currentYear} AI Photo Generator. All rights reserved.</p>
        <div className="mt-2">
          <a
            href="https://www.dyad.sh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Made with Dyad
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;