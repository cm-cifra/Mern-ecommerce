import React from "react";

const FooterPage = () => {
  return (
    <footer className="bg-gray-600 text-white py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2">Contact Me: ccifra@umindanao.edu.ph</p>
        <a
          href="https://github.com/cm-cifra"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          GitHub: github.com/cm-cifra
        </a>
        <p className="mt-2">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterPage;
