import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const servicesLinks = [
    { name: "X-Ray Scan", path: "/xray-scan" },
    { name: "CT Scan", path: "/ct-scan" },
    { name: "MRI Scan", path: "/mri-scan" },
    
  ];

  return (
    <nav className=" bg-white shadow-md w-full h-[100px] flex  justify-center rounded-b-lg relative ">
      <div className="w-full mx-auto flex flex items-center justify-between px-0 lg:px-8 h-full">

        {/* Logo */}
        <Link to="/" className="flex items-start gap-10">
          <Logo />
          <div className="hidden md:flex flex-col leading-tight">
            <span className="font-bold text-5xl text-green-700">
              TriScan
            </span>
            <span className="text-2xl text-gray-900">
              Automated Medical Imaging Classification
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 relative">

          <Link to="/" className="font-semibold hover:text-green-600">
            Home
          </Link>

          {/* Services Dropdown */}
          <div className="relative group">
            <button className="font-semibold hover:text-green-600">
              Services
            </button>

            <div
              className="absolute right-0 top-full mt-3 w-[300px]
              bg-white shadow-xl rounded-xl p-4
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-300
              z-50 border"
            >
              <div className="flex flex-col">
                {servicesLinks.map((service, index) => (
                  <Link
                    key={index}
                    to={service.path}
                    className="px-4 py-2 text-sm font-medium
                    hover:bg-gray-200 rounded-md transition"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/about" className="font-semibold hover:text-green-600">
            About
          </Link>
        </div>

        {/* Mobile Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white border px-3 py-1 rounded-lg shadow"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-[90px] left-0 w-full bg-white px-6 py-6 flex flex-col gap-4 border-t shadow-xl z-50">

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="font-semibold"
          >
            Home
          </Link>

          {/* Mobile Services */}
          <div>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="w-full text-left font-semibold flex justify-between"
            >
              Services
              <span>{servicesOpen ? "▲" : "▼"}</span>
            </button>

            {servicesOpen && (
              <div className="mt-3 border rounded-lg divide-y">
                {servicesLinks.map((service, index) => (
                  <Link
                    key={index}
                    to={service.path}
                    onClick={() => {
                      setIsOpen(false);
                      setServicesOpen(false);
                    }}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="font-semibold"
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
}