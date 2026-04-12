import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-10">

      {/* Title Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-700 mb-3">
          TriScan
        </h1>
        <p className="text-gray-900 text-sm sm:text-base md:text-lg mb-8">
          Automated Medical Imaging Classification System
        </p>
        <p className="text-gray-900 text-xs sm:text-sm md:text-base mb-8">
          TriScan is an advanced Automated Medical Imaging Classification System designed to assist healthcare professionals in analyzing medical images quickly and accurately. Using cutting-edge AI, TriScan helps detect patterns in CT scans, MRI scans, and X-ray images to support faster diagnosis and better decision-making.
        </p>
      </div>

      {/* Cards Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

         {/* X-Ray Scan */}
        <Link
          to="/xray-scan"
          className="bg-white shadow-md rounded-xl p-5 sm:p-6 text-center
          hover:shadow-xl hover:scale-105 active:scale-95
          transition duration-300"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-green-600">
            X-Ray Scan
          </h2>
          <p className="text-gray-800 mt-2 text-xs sm:text-sm">
            Classify X-ray images instantly
          </p>
        </Link>

        {/* CT Scan */}
        <Link
          to="/ct-scan"
          className="bg-white shadow-md rounded-xl p-5 sm:p-6 text-center
          hover:shadow-xl hover:scale-105 active:scale-95
          transition duration-300"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-green-600">
            CT Scan
          </h2>
          <p className="text-gray-800 mt-2 text-xs sm:text-sm">
            Analyze CT scan images with AI
          </p>
        </Link>

        {/* MRI Scan */}
        <Link
          to="/mri-scan"
          className="bg-white shadow-md rounded-xl p-5 sm:p-6 text-center
          hover:shadow-xl hover:scale-105 active:scale-95
          transition duration-300"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-green-600">
            MRI Scan
          </h2>
          <p className="text-gray-800 mt-2 text-xs sm:text-sm">
            Detect patterns in MRI images
          </p>
        </Link>

       

      </div>
    </div>
  );
}

export default Home;