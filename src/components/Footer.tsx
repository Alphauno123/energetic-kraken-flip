"use client";

import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container px-4 md:px-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; {currentYear} AI Photo Generator. All rights reserved.</p>
        {/* You can add more links here, e.g., Privacy Policy, Terms of Service */}
      </div>
    </footer>
  );
};

export default Footer;